import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QRScanner from '@/components/qr/QRScanner';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const QRCodes = () => {
  const { user } = useAuth();
  const router = useNavigate();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [estudianteEncontrado, setEstudianteEncontrado] = useState<boolean | null>(null);

  const handleQRScan = (data: string) => {
    setScannedData(data);

    // Simulamos búsqueda en la "base de datos"
    const estudiantesSimulados = ['12345678', '98765432', '11223344'];
    
    const encontrado = estudiantesSimulados.includes(data.trim());
    setEstudianteEncontrado(encontrado);
  };

  const handleCancel = () => {
    setScannedData(null);
    setEstudianteEncontrado(null);
  };

  const handleBack = () => {
    router('/dashboard');
  };

  if (!user) {
    router('/login');
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-2xl font-bold">Escáner de QR</CardTitle>
          <p className="text-gray-600">Escanea códigos QR para registrar asistencia</p>
        </CardHeader>
        <Button variant="outline" onClick={handleBack}>
          Volver
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <QRScanner 
              onScan={handleQRScan} 
              onCancel={handleCancel}
              scanningContainerStyle={{
                height: '400px',
                border: '2px solid #2563eb',
                borderRadius: '12px',
              }}
              scanningAreaStyle={{
                backgroundColor: '#f3f4f6',
              }}
            />
          </CardContent>
        </Card>

        {scannedData && estudianteEncontrado === true && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Estudiante encontrado</AlertTitle>
            <AlertDescription>
              <pre className="text-sm whitespace-pre-wrap">{scannedData}</pre>
            </AlertDescription>
          </Alert>
        )}

        {scannedData && estudianteEncontrado === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Estudiante no encontrado</AlertTitle>
            <AlertDescription>
              <pre className="text-sm whitespace-pre-wrap">{scannedData}</pre>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default QRCodes;
