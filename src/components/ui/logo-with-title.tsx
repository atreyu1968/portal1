import { useContentStore } from '@/lib/store/content';
import { SiteLogo } from './site-logo';
import { SiteTitle } from './site-title';
import { cn } from '@/lib/utils';

interface LogoWithTitleProps {
  size?: number;
  invertColors?: boolean;
  showTitle?: boolean;
  className?: string;
}

export function LogoWithTitle({ 
  size = 32, 
  invertColors = false,
  showTitle = true,
  className 
}: LogoWithTitleProps) {
  const { settings } = useContentStore();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <SiteLogo 
        size={size} 
        invertColors={invertColors || settings.logo?.invertOnDark} 
      />
      {showTitle && <SiteTitle />}
    </div>
  );
}