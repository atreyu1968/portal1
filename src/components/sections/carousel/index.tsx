import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { useContentStore } from '@/lib/store/content';
import { Carousel, CarouselContent } from '@/components/ui/carousel';
import { CarouselSlide } from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import { useCarousel } from './useCarousel';

export function CarouselSection() {
  const { carousel } = useContentStore();
  const sortedSlides = [...carousel].sort((a, b) => (a.order || 0) - (b.order || 0));
  const { api, setApi, current, handlePrevious, handleNext, scrollToSlide } = useCarousel(sortedSlides);

  if (!sortedSlides || sortedSlides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Carousel
        className="h-full"
        setApi={setApi}
        plugins={[
          AutoPlay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          align: 'center',
        }}
      >
        <CarouselContent className="h-full">
          {sortedSlides.map((slide) => (
            <CarouselSlide key={slide.id} slide={slide} />
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        current={current}
        total={sortedSlides.length}
        onSelect={scrollToSlide}
      />
    </div>
  );
}