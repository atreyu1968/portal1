import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grip, Plus, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

export function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const addField = () => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'Nuevo Campo',
      placeholder: '',
      required: false
    };
    onChange([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    onChange(
      fields.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const deleteField = (id: string) => {
    onChange(fields.filter(field => field.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const addOption = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    updateField(fieldId, {
      options: [...(field.options || []), 'Nueva opción']
    });
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    const newOptions = [...(field.options || [])];
    newOptions[optionIndex] = value;

    updateField(fieldId, { options: newOptions });
  };

  const deleteOption = (fieldId: string, optionIndex: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    const newOptions = [...(field.options || [])];
    newOptions.splice(optionIndex, 1);

    updateField(fieldId, { options: newOptions });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Constructor de Formulario</h3>
        <Button onClick={addField} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Añadir Campo
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
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
                            <Grip className="h-5 w-5 text-gray-400" />
                          </div>

                          <div className="flex-1 grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Tipo de Campo</Label>
                              <Select
                                value={field.type}
                                onValueChange={(value) =>
                                  updateField(field.id, {
                                    type: value as FormField['type']
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Texto</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="textarea">Área de Texto</SelectItem>
                                  <SelectItem value="select">Selector</SelectItem>
                                  <SelectItem value="checkbox">Casilla</SelectItem>
                                  <SelectItem value="radio">Radio</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Etiqueta</Label>
                              <Input
                                value={field.label}
                                onChange={(e) =>
                                  updateField(field.id, { label: e.target.value })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Placeholder</Label>
                              <Input
                                value={field.placeholder || ''}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    placeholder: e.target.value
                                  })
                                }
                              />
                            </div>
                          </div>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {(field.type === 'select' || field.type === 'radio') && (
                          <div className="pl-9 space-y-2">
                            <Label>Opciones</Label>
                            {field.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) =>
                                    updateOption(
                                      field.id,
                                      optionIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    deleteOption(field.id, optionIndex)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(field.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Añadir Opción
                            </Button>
                          </div>
                        )}
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