import { useState } from 'react';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Service } from '@/lib/types/content';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const availableIcons = {
  // Educación y Aprendizaje
  GraduationCap: "Graduación",
  BookOpen: "Libro Abierto",
  Library: "Biblioteca",
  School: "Escuela",
  PenTool: "Escritura",
  BookMarked: "Libro Marcado",
  BookText: "Libro con Texto",
  Notebook: "Cuaderno",
  
  // Tecnología y Digital
  Laptop: "Portátil",
  Monitor: "Monitor",
  Database: "Base de datos",
  Code: "Código",
  Terminal: "Terminal",
  Cpu: "Procesador",
  HardDrive: "Disco Duro",
  Wifi: "WiFi",
  Cloud: "Nube",
  
  // Gestión y Administración
  ClipboardList: "Lista",
  FileText: "Documento",
  FolderOpen: "Carpeta",
  Settings: "Configuración",
  Users: "Usuarios",
  Building2: "Edificio",
  BarChart: "Gráfico",
  PieChart: "Estadísticas",
  
  // Comunicación y Social
  MessageSquare: "Mensajes",
  Mail: "Correo",
  Phone: "Teléfono",
  Video: "Video",
  Share2: "Compartir",
  Globe: "Global",
  Network: "Red",
  Users2: "Comunidad",
  
  // Innovación y Desarrollo
  Award: "Premio",
  Target: "Objetivo",
  Lightbulb: "Idea",
  Rocket: "Cohete",
  Star: "Estrella",
  Zap: "Rayo",
  TrendingUp: "Crecimiento",
  Compass: "Brújula",
  
  // Seguridad y Protección
  Shield: "Escudo",
  Lock: "Candado",
  Key: "Llave",
  FileKey: "Archivo Seguro",
  UserCheck: "Usuario Verificado",
  
  // Soporte y Ayuda
  LifeBuoy: "Soporte",
  HelpCircle: "Ayuda",
  HeartHandshake: "Asistencia",
  Headphones: "Atención",
  
  // Otros
  Calendar: "Calendario",
  Clock: "Reloj",
  Search: "Búsqueda",
  Map: "Mapa",
  Flag: "Bandera"
};

const colorOptions = [
  { value: 'bg-blue-600', label: 'Azul' },
  { value: 'bg-blue-700', label: 'Azul Oscuro' },
  { value: 'bg-green-600', label: 'Verde' },
  { value: 'bg-green-700', label: 'Verde Oscuro' },
  { value: 'bg-purple-600', label: 'Morado' },
  { value: 'bg-purple-700', label: 'Morado Oscuro' },
  { value: 'bg-orange-600', label: 'Naranja' },
  { value: 'bg-orange-700', label: 'Naranja Oscuro' },
  { value: 'bg-red-600', label: 'Rojo' },
  { value: 'bg-red-700', label: 'Rojo Oscuro' },
  { value: 'bg-indigo-600', label: 'Índigo' },
  { value: 'bg-indigo-700', label: 'Índigo Oscuro' },
  { value: 'bg-pink-600', label: 'Rosa' },
  { value: 'bg-pink-700', label: 'Rosa Oscuro' },
  { value: 'bg-teal-600', label: 'Verde Azulado' },
  { value: 'bg-teal-700', label: 'Verde Azulado Oscuro' }
];

export function ServicesEditor() {
  const { services = [], settings, addService, updateService, deleteService, updateSettings } = useContentStore();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState('services');

  const gridStyles = settings?.servicesGrid || {
    columns: 3,
    gap: '2rem',
    maxWidth: '1200px',
    padding: '4rem 2rem',
    itemHeight: 'auto',
    iconSize: '4rem',
    backgroundColor: '#f8fafc'
  };

  const handleGridStylesUpdate = (updates: Partial<typeof gridStyles>) => {
    updateSettings({
      servicesGrid: {
        ...gridStyles,
        ...updates
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const serviceData: Service = {
      id: editingService?.id || crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      color: formData.get('color') as string,
      link: formData.get('link') as string,
      order: editingService?.order || services.length
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }

    setEditingService(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedServices = items.map((item, index) => ({
      ...item,
      order: index
    }));

    reorderedServices.forEach(service => {
      updateService(service.id, service);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Servicios</h2>
        <Button onClick={() => setEditingService(null)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Servicio
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="layout">Diseño</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingService?.title}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingService?.description}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icono</Label>
                    <Select
                      name="icon"
                      defaultValue={editingService?.icon || "GraduationCap"}
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
                      defaultValue={editingService?.color || colorOptions[0].value}
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
                  <Label htmlFor="link">Enlace</Label>
                  <Input
                    id="link"
                    name="link"
                    defaultValue={editingService?.link}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {editingService && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingService(null)}
                  >
                    Cancelar
                  </Button>
                )}
                <Button type="submit">
                  {editingService ? 'Actualizar' : 'Crear'} Servicio
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="services">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {services
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((service, index) => {
                        const IconComponent = Icons[service.icon as keyof typeof Icons];
                        return (
                          <Draggable
                            key={service.id}
                            draggableId={service.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="p-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className={`h-10 w-10 rounded-lg ${service.color} flex items-center justify-center`}>
                                      <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{service.title}</h3>
                                      <p className="text-sm text-gray-500">{service.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setEditingService(service)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteService(service.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <Card className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Columnas</Label>
                  <Select
                    value={String(gridStyles.columns)}
                    onValueChange={(value) => 
                      handleGridStylesUpdate({ columns: Number(value) as 2 | 3 | 4 | 6 })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Columnas</SelectItem>
                      <SelectItem value="3">3 Columnas</SelectItem>
                      <SelectItem value="4">4 Columnas</SelectItem>
                      <SelectItem value="6">6 Columnas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Espacio entre elementos</Label>
                  <Input
                    value={gridStyles.gap}
                    onChange={(e) => handleGridStylesUpdate({ gap: e.target.value })}
                    placeholder="2rem"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ancho máximo</Label>
                  <Input
                    value={gridStyles.maxWidth}
                    onChange={(e) => handleGridStylesUpdate({ maxWidth: e.target.value })}
                    placeholder="1200px"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Padding</Label>
                  <Input
                    value={gridStyles.padding}
                    onChange={(e) => handleGridStylesUpdate({ padding: e.target.value })}
                    placeholder="4rem 2rem"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Alto de elementos</Label>
                  <Input
                    value={gridStyles.itemHeight}
                    onChange={(e) => handleGridStylesUpdate({ itemHeight: e.target.value })}
                    placeholder="auto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tamaño de iconos</Label>
                  <Input
                    value={gridStyles.iconSize}
                    onChange={(e) => handleGridStylesUpdate({ iconSize: e.target.value })}
                    placeholder="4rem"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color de fondo</Label>
                <Input
                  type="color"
                  value={gridStyles.backgroundColor}
                  onChange={(e) => handleGridStylesUpdate({ backgroundColor: e.target.value })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}