import { useContentStore } from '@/lib/store/content';
import { Navigation } from './Navigation';
import { MobileNav } from './MobileNav';
import { Logo } from './Logo';
import { getHeaderStyles } from './styles';
import { cn } from '@/lib/utils';

export function Header() {
  const { settings } = useContentStore();
  const { header } = settings;
  const headerStyles = getHeaderStyles(header);

  return (
    <header 
      style={headerStyles}
      role="banner"
      className={cn(
        "w-full transition-all duration-300",
        header.glassmorphism && "bg-opacity-50 backdrop-blur-md"
      )}
    >
      <div 
        className="container flex items-center justify-between"
        style={{ height: header.height }}
      >
        <div className="flex flex-1 items-center gap-6">
          {header.showLogo && <Logo />}
          <div className="hidden md:flex">
            <Navigation />
          </div>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}