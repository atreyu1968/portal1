import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MediaSelector } from '@/components/editor/MediaSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import type { MenuItem } from '@/lib/types/content';

export function NavigationEditor() {
  const { settings, pages, networks, updateSettings } = useContentStore();
  const [activeTab, setActiveTab] = useState('header');

  if (!settings?.navigation) {
    return <div>Cargando...</div>;
  }

  const { navigation } = settings;
  const currentMenu = navigation[activeTab as keyof typeof navigation] || [];

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: crypto.randomUUID(),
      title: 'Nuevo elemento',
      type: 'link',
      url: '',
      order: currentMenu.length
    };

    const updatedMenu = [...currentMenu, newItem];
    updateSettings({
      navigation: {
        ...navigation,
        [activeTab]: updatedMenu
      }
    });
  };

  const handleUpdateItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedMenu = currentMenu.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );

    updateSettings({
      navigation: {
        ...navigation,
        [activeTab]: updatedMenu
      }
    });
  };

  const handleDeleteItem = (id: string) => {
    const updatedMenu = currentMenu.filter(item => item.id !== id);
    updateSettings({
      navigation: {
        ...navigation,
        [activeTab]: updatedMenu
      }
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(currentMenu);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedMenu = items.map((item, index) => ({
      ...item,
      order: index
    }));

    updateSettings({
      navigation: {
        ...navigation,
        [activeTab]: reorderedMenu
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Navegación</h2>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Elemento
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="header">Menú Principal</TabsTrigger>
          <TabsTrigger value="footer">Menú Footer</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="menu-items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {currentMenu.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-4"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move"
                              >
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>

                              <div className="flex-1 grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label>Título</Label>
                                  <Input
                                    value={item.title}
                                    onChange={(e) =>
                                      handleUpdateItem(item.id, {
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Tipo</Label>
                                  <Select
                                    value={item.type}
                                    onValueChange={(value) => {
                                      handleUpdateItem(item.id, {
                                        type: value as MenuItem['type'],
                                        url: '',
                                        targetId: undefined
                                      });
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="page">Página</SelectItem>
                                      <SelectItem value="link">Enlace</SelectItem>
                                      <SelectItem value="network">Red</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label>
                                    {item.type === 'page' ? 'Página' :
                                      item.type === 'network' ? 'Red' : 'URL'}
                                  </Label>
                                  {item.type === 'page' ? (
                                    <Select
                                      value={item.targetId}
                                      onValueChange={(value) => {
                                        const page = pages.find(p => p.id === value);
                                        handleUpdateItem(item.id, {
                                          targetId: value,
                                          url: `/${page?.slug}`,
                                        });
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {pages.map((page) => (
                                          <SelectItem
                                            key={page.id}
                                            value={page.id}
                                          >
                                            {page.title}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : item.type === 'network' ? (
                                    <Select
                                      value={item.targetId}
                                      onValueChange={(value) => {
                                        const network = networks.find(n => n.id === value);
                                        handleUpdateItem(item.id, {
                                          targetId: value,
                                          url: `/red/${network?.slug}`,
                                        });
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {networks.map((network) => (
                                          <SelectItem
                                            key={network.id}
                                            value={network.id}
                                          >
                                            {network.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <Input
                                      value={item.url}
                                      onChange={(e) =>
                                        handleUpdateItem(item.id, {
                                          url: e.target.value,
                                        })
                                      }
                                      placeholder="https://"
                                    />
                                  )}
                                </div>
                              </div>

                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="pl-9 space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Label>Imagen</Label>
                                  <MediaSelector
                                    type="image"
                                    title="Seleccionar Imagen"
                                    onSelect={(url) =>
                                      handleUpdateItem(item.id, {
                                        imageUrl: url
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex-1">
                                  <Label>Tamaño de Imagen</Label>
                                  <Input
                                    value={item.imageSize || '20px'}
                                    onChange={(e) =>
                                      handleUpdateItem(item.id, {
                                        imageSize: e.target.value
                                      })
                                    }
                                    placeholder="20px"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label>Ocultar Texto</Label>
                                  <Switch
                                    checked={!item.title}
                                    onCheckedChange={(checked) =>
                                      handleUpdateItem(item.id, {
                                        title: checked ? '' : item.url
                                      })
                                    }
                                  />
                                </div>
                              </div>

                              {item.imageUrl && (
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-8 w-8 object-contain"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateItem(item.id, {
                                        imageUrl: undefined,
                                        imageSize: undefined
                                      })
                                    }
                                  >
                                    Eliminar Imagen
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
      </Tabs>
    </div>
  );
}