import { useContentStore } from '@/lib/store/content';
import { cn } from '@/lib/utils';

interface SiteTitleProps {
  color?: string;
  className?: string;
}

export function SiteTitle({ color, className }: SiteTitleProps) {
  const { settings } = useContentStore();

  return (
    <span 
      className={cn("text-lg font-semibold", className)}
      style={{ color: color || settings.logo?.textColor || 'inherit' }}
    >
      {settings.siteName}
    </span>
  );
}