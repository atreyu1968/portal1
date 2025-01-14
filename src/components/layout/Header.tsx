import { useContentStore } from '@/lib/store/content';
import { Navigation } from './navigation';
import { MobileNav } from './mobile-nav';
import { defaultSettings } from '@/lib/db/defaults';
import { SiteLogo } from '@/components/ui/site-logo';
import { SiteTitle } from '@/components/ui/site-title';

export function Header() {
  const { settings = defaultSettings } = useContentStore();
  const { header = defaultSettings.header } = settings;

  const isDarkBackground = header.backgroundColor?.toLowerCase().includes('000') || 
                          header.backgroundColor?.toLowerCase().includes('dark') ||
                          header.backgroundColor?.toLowerCase().includes('900');

  const headerStyles = {
    position: header.sticky ? 'sticky' : 'relative' as const,
    top: header.sticky ? '0' : undefined,
    height: header.height || '64px',
    backgroundColor: header.backgroundColor || '#1e40af',
    borderBottom: `1px solid ${header.borderColor || '#1e3a8a'}`,
    backdropFilter: header.glassmorphism ? 'blur(8px)' : undefined,
    WebkitBackdropFilter: header.glassmorphism ? 'blur(8px)' : undefined,
    zIndex: 50,
  };

  return (
    <header style={headerStyles}>
      <div className="container flex items-center justify-between" style={{ height: header.height || '64px' }}>
        <div className="flex items-center gap-3">
          {header.showLogo && (
            <SiteLogo 
              size={32} 
              invertColors={isDarkBackground}
              className="flex items-center"
            />
          )}
          {header.showTitle && (
            <SiteTitle 
              color={header.textColor || '#ffffff'} 
              className="hidden sm:block"
            />
          )}
        </div>

        <div className={`hidden md:flex ${header.menuPosition === 'right' ? 'ml-auto' : ''}`}>
          <Navigation />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}