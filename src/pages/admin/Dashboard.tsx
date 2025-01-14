import { Card } from "@/components/ui/card";
import { useContentStore } from "@/lib/store/content";
import { FileText, Image, Menu as MenuIcon, Settings, Grid } from "lucide-react";

export function Dashboard() {
  const { pages, carousel, networks, services } = useContentStore();

  const stats = [
    {
      title: "Páginas",
      value: pages?.length || 0,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Diapositivas",
      value: carousel?.length || 0,
      icon: Image,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Redes",
      value: networks?.length || 0,
      icon: MenuIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Servicios",
      value: services?.length || 0,
      icon: Grid,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">No hay actividad reciente</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Utiliza el menú lateral para acceder a las diferentes secciones del panel de administración.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}