import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  link?: string;
}

interface CarouselSectionProps {
  content: {
    slides: CarouselSlide[];
    height?: string;
    autoplay?: boolean;
    interval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    overlay?: boolean;
  };
}

export function CarouselSection({ content }: CarouselSectionProps) {
  const {
    slides,
    height = '400px',
    autoplay = true,
    interval = 5000,
    showControls = true,
    showIndicators = true,
    overlay = true
  } = content;

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  }, [AutoPlay({ delay: interval, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full" style={{ height }}>
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative w-full h-full flex-[0_0_100%]">
              <img
                src={slide.imageUrl}
                alt={slide.title || ''}
                className="w-full h-full object-cover"
              />
              {(slide.title || slide.description) && overlay && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white space-y-4 p-4">
                    {slide.title && (
                      <h3 className="text-2xl font-bold">{slide.title}</h3>
                    )}
                    {slide.description && (
                      <p className="text-lg">{slide.description}</p>
                    )}
                    {slide.link && (
                      <Button variant="outline" asChild>
                        <a href={slide.link}>Ver más</a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={scrollNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}
    </div>
  );
}