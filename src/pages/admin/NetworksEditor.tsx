import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Network } from '@/lib/types/content';

const availableIcons = {
  // Educación
  Lightbulb: "Innovación",
  Rocket: "Emprendimiento",
  Compass: "Orientación",
  Award: "Calidad",
  GraduationCap: "Educación",
  BookOpen: "Aprendizaje",
  
  // Colaboración
  Users: "Comunidad",
  Network: "Red",
  Share2: "Compartir",
  Link: "Conexión",
  
  // Desarrollo
  Target: "Objetivos",
  TrendingUp: "Crecimiento",
  Star: "Excelencia",
  Zap: "Impulso",
  
  // Gestión
  Settings: "Gestión",
  FileText: "Documentos",
  ClipboardList: "Procesos",
  Shield: "Seguridad"
};

const colorOptions = [
  { value: 'bg-blue-600', label: 'Azul' },
  { value: 'bg-green-600', label: 'Verde' },
  { value: 'bg-purple-600', label: 'Morado' },
  { value: 'bg-orange-600', label: 'Naranja' },
  { value: 'bg-red-600', label: 'Rojo' },
  { value: 'bg-indigo-600', label: 'Índigo' },
  { value: 'bg-pink-600', label: 'Rosa' },
  { value: 'bg-teal-600', label: 'Verde Azulado' }
];

export function NetworksEditor() {
  const { networks = [], updateNetwork } = useContentStore();
  const [editingNetwork, setEditingNetwork] = useState<Network | null>(null);
  const [activeTab, setActiveTab] = useState('networks');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const networkData: Partial<Network> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      color: formData.get('color') as string,
      slug: formData.get('slug') as string,
      content: editingNetwork?.content || [],
      lastModified: new Date().toISOString()
    };

    if (editingNetwork) {
      updateNetwork(editingNetwork.id, networkData);
    } else {
      updateNetwork(crypto.randomUUID(), {
        id: crypto.randomUUID(),
        ...networkData
      } as Network);
    }

    setEditingNetwork(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Redes</h2>
        <Button onClick={() => setEditingNetwork(null)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Red
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="networks">Redes</TabsTrigger>
          <TabsTrigger value="layout">Diseño</TabsTrigger>
        </TabsList>

        <TabsContent value="networks">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingNetwork?.name}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingNetwork?.description}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icono</Label>
                    <Select
                      name="icon"
                      defaultValue={editingNetwork?.icon || "Network"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(availableIcons).map(([icon, label]) => {
                          const IconComponent = Icons[icon as keyof typeof Icons];
                          return (
                            <SelectItem key={icon} value={icon}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span>{label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select
                      name="color"
                      defaultValue={editingNetwork?.color || colorOptions[0].value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded ${option.value}`} />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Amigable</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">/red/</span>
                    <Input
                      id="slug"
                      name="slug"
                      defaultValue={editingNetwork?.slug}
                      required
                      placeholder="mi-red"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {editingNetwork && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingNetwork(null)}
                  >
                    Cancelar
                  </Button>
                )}
                <Button type="submit">
                  {editingNetwork ? 'Actualizar' : 'Crear'} Red
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 grid gap-4">
            {networks.map((network) => {
              const IconComponent = Icons[network.icon as keyof typeof Icons];
              return (
                <Card key={network.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg ${network.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{network.name}</h3>
                        <p className="text-sm text-gray-500">{network.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingNetwork(network)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => updateNetwork(network.id, { ...network, deleted: true })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <Card className="p-6">
            <div className="text-center text-gray-500">
              El diseño de la cuadrícula de redes se configura automáticamente
              según el tema general del sitio.
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}