import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Database, Server, Shield } from "lucide-react";

interface Application {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const applications: Application[] = [
  {
    title: "Red Principal",
    description: "Acceso a la red principal y sus recursos",
    icon: Network,
    href: "#network",
  },
  {
    title: "Base de Datos",
    description: "Gestión de bases de datos centralizadas",
    icon: Database,
    href: "#database",
  },
  {
    title: "Servidores",
    description: "Administración de servidores",
    icon: Server,
    href: "#servers",
  },
  {
    title: "Seguridad",
    description: "Control de acceso y seguridad",
    icon: Shield,
    href: "#security",
  },
];

export function ApplicationGrid() {
  return (
    <section className="container py-8" id="apps">
      <h2 className="text-2xl font-bold tracking-tight mb-6">
        Nuestras Aplicaciones
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {applications.map((app) => (
          <Card key={app.title} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <app.icon className="h-8 w-8 mb-2 transition-transform group-hover:scale-110" />
              <CardTitle>{app.title}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full" asChild>
                <a href={app.href}>Acceder</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}