import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageCarousel() {
  const { carousel } = useContentStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
  }, [AutoPlay({ delay: 5000, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!carousel || carousel.length === 0) {
    return null;
  }

  const sortedSlides = [...carousel].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {sortedSlides.map((slide) => (
            <div key={slide.id} className="embla__slide relative w-full h-full flex-[0_0_100%]">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
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
          ))}
        </div>
      </div>

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
    </div>
  );
}