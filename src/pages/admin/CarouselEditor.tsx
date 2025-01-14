import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MediaSelector } from '@/components/editor/MediaSelector';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { CarouselSlide, CarouselButton } from '@/lib/types/content';

export function CarouselEditor() {
  const { carousel, updateCarousel } = useContentStore();
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const slideData: CarouselSlide = {
      id: editingSlide?.id || crypto.randomUUID(),
      imageUrl: formData.get('imageUrl') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      buttons: editingSlide?.buttons || [],
      order: editingSlide?.order || carousel.length
    };

    if (editingSlide) {
      const updatedSlides = carousel.map(slide => 
        slide.id === editingSlide.id ? slideData : slide
      );
      updateCarousel(updatedSlides);
    } else {
      updateCarousel([...carousel, slideData]);
    }

    setEditingSlide(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(carousel);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSlides = items.map((item, index) => ({
      ...item,
      order: index
    }));

    updateCarousel(reorderedSlides);
  };

  const addButton = (slideId: string) => {
    const slide = carousel.find(s => s.id === slideId);
    if (!slide) return;

    const newButton: CarouselButton = {
      text: 'Nuevo Botón',
      link: '#',
      variant: 'default'
    };

    const updatedSlide = {
      ...slide,
      buttons: [...(slide.buttons || []), newButton]
    };

    updateCarousel(
      carousel.map(s => s.id === slideId ? updatedSlide : s)
    );
  };

  const updateButton = (slideId: string, buttonIndex: number, updates: Partial<CarouselButton>) => {
    const slide = carousel.find(s => s.id === slideId);
    if (!slide) return;

    const updatedButtons = [...(slide.buttons || [])];
    updatedButtons[buttonIndex] = { ...updatedButtons[buttonIndex], ...updates };

    const updatedSlide = {
      ...slide,
      buttons: updatedButtons
    };

    updateCarousel(
      carousel.map(s => s.id === slideId ? updatedSlide : s)
    );
  };

  const deleteButton = (slideId: string, buttonIndex: number) => {
    const slide = carousel.find(s => s.id === slideId);
    if (!slide) return;

    const updatedButtons = [...(slide.buttons || [])];
    updatedButtons.splice(buttonIndex, 1);

    const updatedSlide = {
      ...slide,
      buttons: updatedButtons
    };

    updateCarousel(
      carousel.map(s => s.id === slideId ? updatedSlide : s)
    );
  };

  const deleteSlide = (id: string) => {
    updateCarousel(carousel.filter(slide => slide.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editor de Carrusel</h2>
        <Button onClick={() => setEditingSlide(null)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Diapositiva
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Imagen</Label>
              <MediaSelector
                type="image"
                onSelect={(url) => {
                  const input = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
                  if (input) input.value = url;
                }}
                title="Seleccionar Imagen"
              />
              <Input
                name="imageUrl"
                type="hidden"
                defaultValue={editingSlide?.imageUrl}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                name="title"
                defaultValue={editingSlide?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                name="description"
                defaultValue={editingSlide?.description}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {editingSlide && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingSlide(null)}
              >
                Cancelar
              </Button>
            )}
            <Button type="submit">
              {editingSlide ? 'Actualizar' : 'Crear'} Diapositiva
            </Button>
          </div>
        </form>
      </Card>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {carousel
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((slide, index) => (
                  <Draggable
                    key={slide.id}
                    draggableId={slide.id}
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
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="flex-1 flex items-center gap-4">
                              <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-32 h-20 object-cover rounded"
                              />
                              <div>
                                <h3 className="font-medium">{slide.title}</h3>
                                <p className="text-sm text-gray-500">
                                  {slide.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSlide(slide)}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteSlide(slide.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="pl-9 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Botones</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addButton(slide.id)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Añadir Botón
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {slide.buttons?.map((button, buttonIndex) => (
                                <Card key={buttonIndex} className="p-4">
                                  <div className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="space-y-2">
                                        <Label>Texto</Label>
                                        <Input
                                          value={button.text}
                                          onChange={(e) =>
                                            updateButton(slide.id, buttonIndex, {
                                              text: e.target.value,
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label>Enlace</Label>
                                        <Input
                                          value={button.link}
                                          onChange={(e) =>
                                            updateButton(slide.id, buttonIndex, {
                                              link: e.target.value,
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label>Estilo</Label>
                                        <Select
                                          value={button.variant || 'default'}
                                          onValueChange={(value) =>
                                            updateButton(slide.id, buttonIndex, {
                                              variant: value as CarouselButton['variant'],
                                            })
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="default">
                                              Principal
                                            </SelectItem>
                                            <SelectItem value="secondary">
                                              Secundario
                                            </SelectItem>
                                            <SelectItem value="outline">
                                              Contorno
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() =>
                                        deleteButton(slide.id, buttonIndex)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Eliminar Botón
                                    </Button>
                                  </div>
                                </Card>
                              ))}
                            </div>
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
    </div>
  );
}