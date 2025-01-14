import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { PageEditor } from '@/components/editor/PageEditor';
import type { PageContent } from '@/lib/types/content';
import { FileText, Plus, ArrowLeft } from 'lucide-react';

export function PagesEditor() {
  const { pages, addPage, updatePage, deletePage } = useContentStore();
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  const [editingContent, setEditingContent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pageData: PageContent = {
      id: editingPage?.id || crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      sections: editingPage?.sections || [],
      slug: formData.get('slug') as string,
      lastModified: new Date().toISOString()
    };

    if (editingPage) {
      updatePage(editingPage.id, pageData);
    } else {
      addPage(pageData);
    }

    setEditingPage(null);
    setActiveTab('list');
    (e.target as HTMLFormElement).reset();
  };

  const handleEditContent = (page: PageContent) => {
    setEditingPage(page);
    setEditingContent(true);
    setActiveTab('content');
  };

  const handleSaveContent = (sections: any[]) => {
    if (editingPage) {
      updatePage(editingPage.id, { sections });
    }
  };

  const handleBack = () => {
    setEditingPage(null);
    setEditingContent(false);
    setActiveTab('list');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {(editingContent || activeTab !== 'list') && (
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        )}
        <h2 className="text-2xl font-bold">
          {editingContent 
            ? `Editando: ${editingPage?.title}`
            : 'Gestión de Páginas'
          }
        </h2>
        {!editingContent && (
          <Button 
            onClick={() => {
              setEditingPage(null);
              setActiveTab('new');
            }} 
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nueva Página
          </Button>
        )}
      </div>

      {!editingContent ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Lista de Páginas</TabsTrigger>
            <TabsTrigger value="new">Nueva Página</TabsTrigger>
            {editingPage && (
              <TabsTrigger value="edit">Editar Página</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4">
              {pages.map((page) => (
                <Card key={page.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{page.title}</h4>
                        <p className="text-sm text-gray-500">/{page.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPage(page);
                          setActiveTab('edit');
                        }}
                      >
                        Editar Detalles
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditContent(page)}
                      >
                        Editar Contenido
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deletePage(page.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {pages.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No hay páginas creadas
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value={activeTab === 'new' ? 'new' : 'edit'}>
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      required
                      defaultValue={editingPage?.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Amigable</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">/</span>
                      <Input
                        id="slug"
                        name="slug"
                        required
                        defaultValue={editingPage?.slug}
                        placeholder="mi-pagina"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Este será el identificador único de la página en la URL
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingPage?.description}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingPage(null);
                      setActiveTab('list');
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingPage ? 'Actualizar' : 'Crear'} Página
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        editingPage && (
          <PageEditor
            pageId={editingPage.id}
            sections={editingPage.sections}
            onSave={handleSaveContent}
          />
        )
      )}
    </div>
  );
}