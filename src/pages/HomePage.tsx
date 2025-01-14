import { ImageCarousel } from '@/components/sections/ImageCarousel';
import { NetworksGrid } from '@/components/sections/NetworksGrid';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { Footer } from '@/components/layout/Footer';

export function HomePage() {
  return (
    <>
      <main className="flex-1">
        <ImageCarousel />
        <NetworksGrid />
        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
}