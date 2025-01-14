import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { PageSection } from '@/lib/types/content';
import { SectionEditor } from './SectionEditor';
import { Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface PageEditorProps {
  pageId: string;
  sections: PageSection[];
  onSave: (sections: PageSection[]) => void;
}

export function PageEditor({ pageId, sections, onSave }: PageEditorProps) {
  const [pageSections, setPageSections] = useState<PageSection[]>(sections);

  const addSection = (type: PageSection['type']) => {
    const newSection: PageSection = {
      id: crypto.randomUUID(),
      type,
      content: {},
      order: pageSections.length
    };
    setPageSections([...pageSections, newSection]);
  };

  const updateSection = (sectionId: string, content: Record<string, any>) => {
    setPageSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, content }
          : section
      )
    );
  };

  const deleteSection = (sectionId: string) => {
    setPageSections(sections =>
      sections.filter(section => section.id !== sectionId)
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(pageSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSections = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setPageSections(reorderedSections);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editor de Página</h2>
        <div className="flex gap-2">
          <Button onClick={() => onSave(pageSections)}>
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 space-y-2">
          <h3 className="font-medium mb-4">Añadir Sección</h3>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('hero')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Cabecera
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('text')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Texto
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('cards')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tarjetas
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('media')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Multimedia
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('carousel')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Carrusel
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('video')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('form')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Formulario
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('accordion')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Acordeón
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('html')}
          >
            <Plus className="h-4 w-4 mr-2" />
            HTML
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => addSection('script')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Script
          </Button>
        </div>

        <div className="col-span-3">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {pageSections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SectionEditor
                            section={section}
                            onUpdate={(content) => updateSection(section.id, content)}
                            onDelete={() => deleteSection(section.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}