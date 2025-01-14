import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fileUploadManager } from '@/lib/utils/upload';
import { Image, FileText, Search } from 'lucide-react';

interface MediaSelectorProps {
  onSelect: (url: string) => void;
  type?: 'image' | 'document' | 'all';
  title?: string;
}

export function MediaSelector({ onSelect, type = 'all', title = 'Seleccionar Archivo' }: MediaSelectorProps) {
  const [files, setFiles] = useState(fileUploadManager.getFiles());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(type === 'document' ? 'documents' : 'images');

  const filteredFiles = files.filter(file => {
    const matchesType = 
      activeTab === 'images' ? file.type.startsWith('image/') :
      activeTab === 'documents' ? !file.type.startsWith('image/') :
      true;

    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleSelect = (url: string) => {
    onSelect(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {type === 'image' ? (
            <Image className="h-4 w-4 mr-2" />
          ) : (
            <FileText className="h-4 w-4 mr-2" />
          )}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar archivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {type === 'all' && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="images">Imágenes</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="relative group cursor-pointer"
                onClick={() => handleSelect(file.url)}
              >
                {file.type.startsWith('image/') ? (
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg border bg-gray-50 flex items-center justify-center group-hover:bg-gray-100">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="mt-2 text-sm truncate">{file.name}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}