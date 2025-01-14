import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface CardItem {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  link?: string;
  color?: string;
}

interface CardGridProps {
  title?: string;
  description?: string;
  cards: CardItem[];
  columns?: 2 | 3 | 4;
}

export function CardGrid({ title, description, cards, columns = 4 }: CardGridProps) {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="container">
        {title && (
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8`}>
          {cards.map((card, index) => {
            const Icon = Icons[card.icon];
            return (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-all duration-300"
              >
                <div className={`${card.color || 'bg-blue-500'} text-white p-6 rounded-t-lg`}>
                  <Icon className="h-12 w-12" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">
                    {card.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}