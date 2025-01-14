import { Card } from "@/components/ui/card";
import { useContentStore } from "@/lib/store/content";
import * as Icons from "lucide-react";

interface ServiceGridStyles {
  columns?: 2 | 3 | 4 | 6;
  gap?: string;
  maxWidth?: string;
  padding?: string;
  itemHeight?: string;
  iconSize?: string;
  backgroundColor?: string;
}

export function ServicesGrid() {
  const { services, settings } = useContentStore();

  if (!services || services.length === 0) {
    return null;
  }

  // Get grid styles from settings or use defaults
  const gridStyles: ServiceGridStyles = settings?.servicesGrid || {
    columns: 3,
    gap: '2rem',
    maxWidth: '1200px',
    padding: '4rem 2rem',
    itemHeight: 'auto',
    iconSize: '4rem',
    backgroundColor: '#f8fafc'
  };

  // Sort services by order property
  const sortedServices = [...services].sort((a, b) => 
    (a.order || 0) - (b.order || 0)
  );

  const getColumnClass = (columns: number = 3) => {
    const columnMap = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
      6: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    return columnMap[columns as keyof typeof columnMap] || columnMap[3];
  };

  return (
    <div 
      className="w-full"
      style={{ 
        backgroundColor: gridStyles.backgroundColor,
        padding: gridStyles.padding 
      }}
    >
      <div 
        className="container"
        style={{ maxWidth: gridStyles.maxWidth }}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-12 text-center uppercase">
          Servicios
        </h2>
        <div 
          className={`grid grid-cols-1 ${getColumnClass(gridStyles.columns)} gap-8`}
          style={{ gap: gridStyles.gap }}
        >
          {sortedServices.map((service) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons];
            return (
              <a
                key={service.id}
                href={service.link}
                className="group block h-full no-underline transform transition-transform hover:-translate-y-1"
              >
                <Card 
                  className="h-full hover:shadow-xl transition-shadow duration-300"
                  style={{ height: gridStyles.itemHeight }}
                >
                  <div 
                    className={`${service.color || 'bg-blue-600'} text-white p-8 rounded-t-lg flex items-center justify-center`}
                  >
                    {IconComponent && (
                      <IconComponent 
                        style={{ width: gridStyles.iconSize, height: gridStyles.iconSize }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}