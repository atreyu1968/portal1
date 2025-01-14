import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  content: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    buttons?: Array<{
      text: string;
      link: string;
      variant?: 'default' | 'secondary' | 'outline';
    }>;
  };
}

export function HeroSection({ content }: HeroSectionProps) {
  const {
    title,
    subtitle,
    description,
    backgroundImage,
    buttons = []
  } = content;

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: '#1e40af',
      };

  return (
    <section
      className="relative min-h-[500px] flex items-center justify-center text-white"
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-medium mb-4 text-blue-100">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            {description}
          </p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {buttons.map((button, index) => {
              const variants = {
                default: "bg-white text-blue-600 hover:bg-gray-100",
                secondary: "bg-blue-700 text-white hover:bg-blue-800",
                outline: "border-2 border-white text-white hover:bg-white/10"
              };

              return (
                <Button
                  key={index}
                  variant={button.variant === 'outline' ? 'outline' : 'default'}
                  size="lg"
                  className={button.variant ? variants[button.variant] : variants.default}
                  asChild
                >
                  <a href={button.link}>{button.text}</a>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}