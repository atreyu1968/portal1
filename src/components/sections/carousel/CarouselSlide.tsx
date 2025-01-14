import { Button } from '@/components/ui/button';
import { CarouselItem } from '@/components/ui/carousel';
import type { CarouselSlide as SlideType } from '@/lib/types/content';

interface CarouselSlideProps {
  slide: SlideType;
}

export function CarouselSlide({ slide }: CarouselSlideProps) {
  return (
    <CarouselItem className="h-full">
      <div className="relative w-full h-full">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            console.error('Error loading image:', slide.imageUrl);
            e.currentTarget.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80';
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-6 max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl">
              {slide.description}
            </p>
            {slide.buttons && slide.buttons.length > 0 && (
              <div className="flex gap-4 justify-center">
                {slide.buttons.map((button, index) => (
                  <Button
                    key={`${button.text}-${index}`}
                    variant={button.variant === 'outline' ? 'outline' : 'default'}
                    size="lg"
                    className={
                      button.variant === 'outline'
                        ? 'border-2 border-white text-white hover:bg-white/20'
                        : button.variant === 'secondary'
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }
                    asChild
                  >
                    <a href={button.link}>{button.text}</a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}