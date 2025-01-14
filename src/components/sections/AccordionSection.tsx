import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionSectionProps {
  content: {
    title?: string;
    description?: string;
    items: AccordionItem[];
    style?: {
      layout: 'simple' | 'card';
      collapsible?: boolean;
      defaultValue?: string;
    };
  };
}

export function AccordionSection({ content }: AccordionSectionProps) {
  const {
    title,
    description,
    items,
    style = {
      layout: 'simple',
      collapsible: true
    }
  } = content;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {title && (
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}

      <Accordion
        type={style.collapsible ? 'single' : 'multiple'}
        defaultValue={style.defaultValue}
        className="w-full"
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: item.content }} 
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}