import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface MediaSectionProps {
  content: {
    title?: string;
    description?: string;
    type: 'image' | 'document';
    url: string;
    width?: string;
    height?: string;
    align?: 'left' | 'center' | 'right';
  };
}

export function MediaSection({ content }: MediaSectionProps) {
  const {
    title,
    description,
    type,
    url,
    width = '100%',
    height = 'auto',
    align = 'center'
  } = content;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <div style={{ textAlign: align }}>
        {type === 'image' ? (
          <img
            src={url}
            alt={title || ''}
            style={{ width, height, display: 'inline-block' }}
            className="rounded-lg"
            loading="lazy"
          />
        ) : (
          <Card className="inline-block p-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <FileText className="h-6 w-6" />
              <span>Descargar documento</span>
            </a>
          </Card>
        )}
      </div>
    </div>
  );
}