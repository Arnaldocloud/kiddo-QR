import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";


interface QRScannerProps {
  onScan: (data: string) => void;
  onCancel?: () => void;
  scanningAreaStyle?: React.CSSProperties;
  scanningContainerStyle?: React.CSSProperties;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onCancel,
  scanningAreaStyle,
  scanningContainerStyle
}) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
    onScan(decodedText);
    stopScanner();
  };

  const qrCodeErrorCallback = (errorMessage: string, optionalData: any) => {
    setError(errorMessage);
    toast({
      title: "Error",
      description: "Error al escanear el código QR",
      variant: "destructive",
    });
  };

  const startScanner = async () => {
    try {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1
      };

      const scanner = new Html5Qrcode("html5qr-reader");
      await scanner.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );

      scannerRef.current = scanner;
      setIsScanning(true);
      setIsCameraAvailable(true);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      toast({
        title: "Error",
        description: "No se pudo iniciar el escáner",
        variant: "destructive",
      });
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      const scanner = scannerRef.current;
      if (scanner.getState() === Html5QrcodeScannerState.SCANNING || scanner.getState() === Html5QrcodeScannerState.PAUSED) {
        scanner.stop().then(() => {
          scanner.clear();
          scannerRef.current = null;
          setIsScanning(false);
          setIsCameraAvailable(false);
        }).catch(err => {
          console.warn("No se pudo detener el escáner:", err);
        });
      } else {
        // Ya estaba detenido
        scanner.clear();
        scannerRef.current = null;
        setIsScanning(false);
        setIsCameraAvailable(false);
      }
    }
  };
  
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div
              id="html5qr-reader"
              style={{
                ...scanningContainerStyle,
                width: '100%',
                height: '300px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  ...scanningAreaStyle,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {!isCameraAvailable && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Camera className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-500">Coloca el código QR en el área de escaneo</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={startScanner}
              disabled={isScanning || isCameraAvailable}
            >
              {isScanning ? 'Escaneando...' : 'Iniciar Escáner'}
            </Button>
            {isScanning && (
              <Button
                variant="destructive"
                onClick={() => {
                  stopScanner();
                  onCancel?.();
                }}
              >
                Cancelar
              </Button>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
