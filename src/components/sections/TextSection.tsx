import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface TextSectionProps {
  content: {
    text: string;
    align?: 'left' | 'center' | 'right' | 'justify';
    maxWidth?: string;
    padding?: string;
  };
}

export function TextSection({ content }: TextSectionProps) {
  const {
    text,
    align = 'left',
    maxWidth = '800px',
    padding = '2rem'
  } = content;

  return (
    <div 
      className="w-full"
      style={{ padding }}
    >
      <div 
        className="mx-auto prose prose-lg"
        style={{ 
          maxWidth,
          textAlign: align
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}