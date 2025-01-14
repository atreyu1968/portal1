import { FooterSettings } from '@/lib/types/settings';

export function getFooterStyles(footer: FooterSettings) {
  return {
    backgroundColor: footer.backgroundColor,
    color: footer.textColor,
    borderTop: `1px solid ${footer.borderColor}`,
    minHeight: footer.height === 'auto' ? undefined : footer.height,
  };
}