import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from './RichTextEditor';
import { FormBuilder } from './FormBuilder';
import { MediaSelector } from './MediaSelector';
import { PageSection } from '@/lib/types/content';
import { Grip, X } from 'lucide-react';

interface SectionEditorProps {
  section: PageSection;
  onUpdate: (content: Record<string, any>) => void;
  onDelete: () => void;
}

export function SectionEditor({ section, onUpdate, onDelete }: SectionEditorProps) {
  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input
                value={section.content.subtitle || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, subtitle: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen de Fondo</Label>
              <MediaSelector
                type="image"
                onSelect={(url) =>
                  onUpdate({ ...section.content, backgroundImage: url })
                }
                title="Seleccionar Imagen"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-6">
            <RichTextEditor
              content={section.content.text || ''}
              onChange={(text) => onUpdate({ ...section.content, text })}
            />
          </div>
        );

      case 'video':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>URL del Video</Label>
              <Input
                value={section.content.url || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, url: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={section.content.description || ''}
                onChange={(e) =>
                  onUpdate({ ...section.content, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ancho</Label>
                <Input
                  value={section.content.width || '100%'}
                  onChange={(e) =>
                    onUpdate({ ...section.content, width: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Alto</Label>
                <Input
                  value={section.content.height || '480px'}
                  onChange={(e) =>
                    onUpdate({ ...section.content, height: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="controls"
                  checked={section.content.controls !== false}
                  onChange={(e) =>
                    onUpdate({ ...section.content, controls: e.target.checked })
                  }
                />
                <Label htmlFor="controls">Mostrar controles</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={section.content.playing === true}
                  onChange={(e) =>
                    onUpdate({ ...section.content, playing: e.target.checked })
                  }
                />
                <Label htmlFor="autoplay">Reproducción automática</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="loop"
                  checked={section.content.loop === true}
                  onChange={(e) =>
                    onUpdate({ ...section.content, loop: e.target.checked })
                  }
                />
                <Label htmlFor="loop">Repetir</Label>
              </div>
            </div>
          </div>
        );

      // Add other section types here...

      default:
        return null;
    }
  };

  return (
    <Card className="relative">
      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6 pt-12">
        {renderEditor()}
      </div>
    </Card>
  );
}