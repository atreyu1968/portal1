import { useContentStore } from '@/lib/store/content';
import { cn } from '@/lib/utils';

interface SiteLogoProps {
  size?: number;
  invertColors?: boolean;
  className?: string;
}

export function SiteLogo({ size = 32, invertColors = false, className }: SiteLogoProps) {
  const { settings } = useContentStore();
  const { logo } = settings;

  if (!logo?.imageUrl) return null;

  return (
    <img
      src={logo.imageUrl}
      alt=""
      style={{ 
        width: size,
        height: size,
        filter: invertColors ? 'invert(1)' : undefined
      }}
      className={cn('object-contain', className)}
      aria-hidden="true"
    />
  );
}