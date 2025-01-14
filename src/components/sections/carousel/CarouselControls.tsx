import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  current: number;
  total: number;
  onSelect: (index: number) => void;
}

export function CarouselControls({
  onPrevious,
  onNext,
  current,
  total,
  onSelect
}: CarouselControlsProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={onPrevious}
        aria-label="Anterior diapositiva"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
        onClick={onNext}
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="flex gap-2 justify-center">
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
              onClick={() => onSelect(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
              aria-current={current === index}
            />
          ))}
        </div>
      </div>
    </>
  );
}