import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { 
  Lightbulb,
  Rocket,
  Compass,
  Award,
  type LucideIcon
} from 'lucide-react';

interface Network {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  slug: string;
}

const networks: Network[] = [
  {
    name: 'Red de Innovación',
    description: 'Descubre y participa en proyectos innovadores que transforman la educación',
    icon: Lightbulb,
    color: 'bg-blue-500',
    slug: 'innovacion'
  },
  {
    name: 'Red de Emprendimiento',
    description: 'Desarrolla tus ideas y conviértelas en proyectos exitosos',
    icon: Rocket,
    color: 'bg-green-500',
    slug: 'emprendimiento'
  },
  {
    name: 'Red de Orientación',
    description: 'Encuentra guía y apoyo en tu desarrollo profesional',
    icon: Compass,
    color: 'bg-purple-500',
    slug: 'orientacion'
  },
  {
    name: 'Red de Calidad',
    description: 'Garantizamos la excelencia en todos nuestros procesos',
    icon: Award,
    color: 'bg-orange-500',
    slug: 'calidad'
  }
];

export function NetworksGrid() {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Nuestras Redes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {networks.map((network) => (
            <Link
              key={network.slug}
              to={`/red/${network.slug}`}
              className="group block h-full no-underline transform transition-transform hover:-translate-y-1"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <div className={`${network.color} text-white p-8 rounded-t-lg flex items-center justify-center`}>
                  <network.icon className="h-16 w-16" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {network.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {network.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}