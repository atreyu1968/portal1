import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './card';
import { Upload } from 'lucide-react';
import { fileUploadManager } from '@/lib/utils/upload';

interface FileUploadProps {
  onUpload: () => void;
  accept?: string;
  maxSize?: number;
}

export function FileUpload({ onUpload, accept, maxSize = 5 * 1024 * 1024 }: FileUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      for (const file of acceptedFiles) {
        await fileUploadManager.uploadFile(file);
      }
      onUpload();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      // Aquí podrías mostrar un toast con el error
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { 'image/*': [], 'application/pdf': [] } : undefined,
    maxSize,
  });

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className={`h-10 w-10 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Suelta los archivos aquí'
              : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Tamaño máximo: {Math.round(maxSize / (1024 * 1024))}MB
          </p>
        </div>
      </div>
    </Card>
  );
}