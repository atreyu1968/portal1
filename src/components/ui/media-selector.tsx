import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { fileUploadManager } from '@/lib/utils/upload';
import { Image } from 'lucide-react';

interface MediaSelectorProps {
  onSelect: (url: string) => void;
  trigger?: React.ReactNode;
}

export function MediaSelector({ onSelect, trigger }: MediaSelectorProps) {
  const [files, setFiles] = useState(fileUploadManager.getFiles());
  const [open, setOpen] = useState(false);

  const handleSelect = (url: string) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Image className="h-4 w-4 mr-2" />
            Seleccionar Medio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Biblioteca de Medios</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="aspect-video relative group cursor-pointer"
              onClick={() => handleSelect(file.url)}
            >
              {file.type.startsWith('image/') ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-lg hover:opacity-75 transition-opacity"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}