import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
// Puedes usar react-qr-reader u otro componente para el scanner
// Este ejemplo es genérico

interface Student {
  id: string;
  student_code: string;
  name: string;
  grade: string;
}

const QRCodes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [studentFound, setStudentFound] = useState<Student | null>(null);

  const handleQRScan = async (code: string) => {
    if (!code) return;

    setScannedData(code);

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_code', code.trim())
        .single();

      if (error || !data) {
        setStudentFound(null);
        toast({
          title: 'No encontrado',
          description: 'No se encontró ningún estudiante con ese código',
          variant: 'destructive',
        });
        return;
      }

      setStudentFound(data);

      toast({
        title: 'Estudiante encontrado',
        description: `${data.name} - ${data.grade}`,
      });

      console.log('Estudiante encontrado:', data);

      // Puedes redirigir o abrir un modal si quieres:
      // navigate(`/estudiantes/${data.id}`);
    } catch (error) {
      console.error('Error buscando estudiante:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al buscar el estudiante',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold mb-4">Escanear Código QR</h1>

      {/* Aquí deberías integrar tu lector */}
      {/* Este botón simula el escaneo con un código de prueba */}
      <button
        onClick={() => handleQRScan('ABC123')}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Simular escaneo de QR: ABC123
      </button>

      {scannedData && (
        <p className="mt-4 text-gray-600">Código escaneado: {scannedData}</p>
      )}

      {studentFound && (
        <div className="mt-6 bg-green-100 p-4 rounded-md text-green-800 w-full max-w-md">
          <h2 className="text-lg font-medium">Estudiante encontrado</h2>
          <p><strong>Nombre:</strong> {studentFound.name}</p>
          <p><strong>Grado:</strong> {studentFound.grade}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodes;
