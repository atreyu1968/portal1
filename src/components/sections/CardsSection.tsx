import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface CardItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
  color: string;
  link?: string;
}

interface CardsSectionProps {
  content: {
    title?: string;
    description?: string;
    cards: CardItem[];
    columns?: 2 | 3 | 4;
    gap?: string;
    maxWidth?: string;
    padding?: string;
    backgroundColor?: string;
  };
}

export function CardsSection({ content }: CardsSectionProps) {
  const {
    title,
    description,
    cards,
    columns = 3,
    gap = '2rem',
    maxWidth = '1200px',
    padding = '4rem 2rem',
    backgroundColor = '#f8fafc'
  } = content;

  const getColumnClass = (cols: number) => {
    const columnMap = {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-2 lg:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4'
    };
    return columnMap[cols as keyof typeof columnMap] || columnMap[3];
  };

  return (
    <div 
      className="w-full"
      style={{ backgroundColor, padding }}
    >
      <div 
        className="container"
        style={{ maxWidth }}
      >
        {title && (
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div 
          className={`grid grid-cols-1 ${getColumnClass(columns)}`}
          style={{ gap }}
        >
          {cards.map((card) => {
            const IconComponent = Icons[card.icon];
            return (
              <a
                key={card.id}
                href={card.link}
                className="group block h-full no-underline transform transition-transform hover:-translate-y-1"
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <div className={`${card.color} text-white p-8 rounded-t-lg flex items-center justify-center`}>
                    <IconComponent className="h-12 w-12" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
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