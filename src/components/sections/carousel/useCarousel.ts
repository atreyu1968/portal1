import { useState, useCallback, useEffect } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import type { CarouselSlide } from '@/lib/types/content';

export function useCarousel(slides: CarouselSlide[]) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  const handlePrevious = useCallback(() => {
    if (api && slides.length > 0) {
      const prevIndex = (current - 1 + slides.length) % slides.length;
      scrollToSlide(prevIndex);
    }
  }, [api, current, slides.length, scrollToSlide]);

  const handleNext = useCallback(() => {
    if (api && slides.length > 0) {
      const nextIndex = (current + 1) % slides.length;
      scrollToSlide(nextIndex);
    }
  }, [api, current, slides.length, scrollToSlide]);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [api, handleNext]);

  return {
    api,
    setApi,
    current,
    handlePrevious,
    handleNext,
    scrollToSlide
  };
}