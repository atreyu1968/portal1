export interface CarouselButton {
  text: string;
  link: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export interface CarouselSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  buttons?: CarouselButton[];
  order: number;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'gallery' | 'cards' | 'features' | 
        'cta' | 'testimonials' | 'contact' | 'html' | 'form' | 'accordion' | 
        'script' | 'carousel' | 'video' | 'markdown';
  content: Record<string, any>;
  order: number;
}

export interface PageContent {
  id: string;
  title: string;
  description?: string;
  sections: PageSection[];
  slug: string;
  lastModified: string;
}

export interface Network {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  slug: string;
  content: PageSection[];
  lastModified: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  order: number;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  status: 'pending' | 'processed' | 'archived';
  submittedAt: string;
}