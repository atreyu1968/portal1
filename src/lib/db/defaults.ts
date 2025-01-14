import type { CarouselSlide, SiteSettings, Network } from '../types/content';

export const defaultNetworks: Network[] = [
  {
    id: '1',
    name: 'Red de Innovación',
    description: 'Descubre y participa en proyectos innovadores que transforman la educación',
    icon: 'Lightbulb',
    color: 'bg-blue-600',
    slug: 'innovacion',
    content: [],
    lastModified: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Red de Emprendimiento',
    description: 'Desarrolla tus ideas y conviértelas en proyectos exitosos',
    icon: 'Rocket',
    color: 'bg-green-600',
    slug: 'emprendimiento',
    content: [],
    lastModified: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Red de Orientación',
    description: 'Encuentra guía y apoyo en tu desarrollo profesional',
    icon: 'Compass',
    color: 'bg-purple-600',
    slug: 'orientacion',
    content: [],
    lastModified: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Red de Calidad',
    description: 'Garantizamos la excelencia en todos nuestros procesos',
    icon: 'Award',
    color: 'bg-orange-600',
    slug: 'calidad',
    content: [],
    lastModified: new Date().toISOString()
  }
];

export const defaultCarouselSlides: CarouselSlide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80',
    title: 'Red de Innovación Educativa',
    description: 'Impulsando la transformación digital y metodológica en la educación',
    buttons: [
      {
        text: 'Descubrir Proyectos',
        link: '/red/innovacion',
        variant: 'default'
      },
      {
        text: 'Participar',
        link: '/red/innovacion#join',
        variant: 'outline'
      }
    ],
    order: 0
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80',
    title: 'Red de Emprendimiento',
    description: 'Convierte tus ideas en realidad con nuestro programa de emprendimiento educativo',
    buttons: [
      {
        text: 'Iniciar Proyecto',
        link: '/red/emprendimiento',
        variant: 'default'
      },
      {
        text: 'Mentorías',
        link: '/red/emprendimiento#mentoring',
        variant: 'outline'
      }
    ],
    order: 1
  }
];

export const defaultSettings: SiteSettings = {
  siteName: 'Portal de Educación',
  siteDescription: 'Accede a todos los servicios educativos desde un solo lugar',
  contactEmail: 'contacto@portaleducacion.com',
  logo: {
    imageUrl: 'https://raw.githubusercontent.com/gobiernodecanarias/marca/main/logos/gc/logo-gobierno-de-canarias-blanco.svg',
    textColor: '#ffffff',
    invertOnDark: true
  },
  header: {
    backgroundColor: '#1e40af',
    textColor: '#ffffff',
    borderColor: '#1e3a8a',
    height: '64px',
    sticky: true,
    glassmorphism: true,
    menuPosition: 'right',
    showLogo: true,
    showTitle: true
  },
  footer: {
    backgroundColor: '#1e40af',
    textColor: '#ffffff',
    borderColor: '#1e3a8a',
    height: '96px',
    showLogo: true,
    showSocialLinks: true,
    socialLinksColor: '#ffffff',
    columns: 4
  },
  navigation: {
    header: [],
    footer: []
  },
  socialLinks: {},
  footerText: '© 2024 Portal de Educación. Todos los derechos reservados.'
};