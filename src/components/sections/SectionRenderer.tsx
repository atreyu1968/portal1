import { PageSection } from '@/lib/types/content';
import { HeroSection } from './HeroSection';
import { TextSection } from './TextSection';
import { CardsSection } from './CardsSection';
import { MediaSection } from './MediaSection';
import { AccordionSection } from './AccordionSection';
import { FormSection } from './FormSection';
import { ScriptSection } from './ScriptSection';
import { CarouselSection } from './carousel';
import { MarkdownSection } from './MarkdownSection';
import { HtmlSection } from './HtmlSection';
import { VideoSection } from './VideoSection';

interface SectionRendererProps {
  section: PageSection;
  pageId: string;
}

export function SectionRenderer({ section, pageId }: SectionRendererProps) {
  const { type, content } = section;

  switch (type) {
    case 'hero':
      return <HeroSection content={content} />;

    case 'text':
      return <TextSection content={content} />;

    case 'cards':
      return <CardsSection content={content} />;

    case 'media':
      return <MediaSection content={content} />;

    case 'accordion':
      return <AccordionSection content={content} />;

    case 'form':
      return <FormSection content={content} pageId={pageId} />;

    case 'script':
      return <ScriptSection content={content} />;

    case 'carousel':
      return <CarouselSection content={content} />;

    case 'markdown':
      return <MarkdownSection content={content} />;

    case 'html':
      return <HtmlSection content={content} />;

    case 'video':
      return <VideoSection content={content} />;

    default:
      console.warn(`Unknown section type: ${type}`);
      return null;
  }
}