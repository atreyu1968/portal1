import { HeaderSettings } from '@/lib/types/settings';

export function getHeaderStyles(header: HeaderSettings) {
  return {
    position: header.sticky ? 'sticky' : 'relative' as const,
    top: header.sticky ? '0' : undefined,
    height: header.height,
    backgroundColor: header.glassmorphism 
      ? 'rgba(30, 64, 175, 0.5)' // More transparent blue-900
      : header.backgroundColor,
    color: header.textColor,
    borderBottom: `1px solid ${header.borderColor}`,
    zIndex: 50,
  };
}