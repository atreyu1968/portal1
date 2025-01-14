import { useState } from 'react';
import { fileUploadManager } from '@/lib/utils/upload';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Image, FileIcon, Trash2, Copy, Search } from 'lucide-react';

export function MediaLibrary() {
  const [files, setFiles] = useState(fileUploadManager.getFiles());
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleUpload = () => {
    setFiles(fileUploadManager.getFiles());
  };

  const handleDelete = (id: string) => {
    try {
      fileUploadManager.deleteFile(id);
      setFiles(fileUploadManager.getFiles());
      toast({
        title: 'Archivo eliminado',
        description: 'El archivo ha sido eliminado correctamente.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el archivo.',
        variant: 'destructive'
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'URL copiada',
      description: 'La URL ha sido copiada al portapapeles.'
    });
  };

  const formatFileName = (name: string): string => {
    // Remove file extension
    const baseName = name.replace(/\.[^/.]+$/, "");
    // Convert to kebab case
    return baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredFiles = files.filter(file => {
    if (activeTab === 'all') return true;
    if (activeTab === 'images') return file.type.startsWith('image/');
    if (activeTab === 'documents') return !file.type.startsWith('image/');
    return true;
  }).filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Biblioteca de Medios</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <FileUpload
            onUpload={handleUpload}
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
            maxSize={5 * 1024 * 1024}
          />
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="overflow-hidden group">
                <div className="aspect-video relative">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <FileIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => copyToClipboard(formatFileName(file.name))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar URL
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{formatDate(file.uploadedAt)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                {activeTab === 'images' ? (
                  <Image className="h-8 w-8 text-gray-400" />
                ) : (
                  <FileIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <p className="text-gray-500">
                {searchTerm
                  ? 'No se encontraron archivos que coincidan con tu búsqueda'
                  : 'No hay archivos para mostrar'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}