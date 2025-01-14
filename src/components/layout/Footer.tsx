import { useContentStore } from "@/lib/store/content";
import { LoginDialog } from '@/components/auth/LoginDialog';
import { defaultSettings } from '@/lib/db/defaults';
import { SiteLogo } from '@/components/ui/site-logo';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const { settings = defaultSettings } = useContentStore();
  const { footer = defaultSettings.footer, socialLinks = {} } = settings;

  const isDarkBackground = footer.backgroundColor?.toLowerCase().includes('000') || 
                          footer.backgroundColor?.toLowerCase().includes('dark') ||
                          footer.backgroundColor?.toLowerCase().includes('900');

  const footerStyles = {
    backgroundColor: footer.backgroundColor || '#f8fafc',
    color: footer.textColor || '#64748b',
    borderTop: `1px solid ${footer.borderColor || '#e2e8f0'}`,
    height: footer.height || '48px',
  };

  const socialIconColor = footer.socialLinksColor || (isDarkBackground ? '#ffffff' : '#64748b');

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube
  };

  return (
    <footer style={footerStyles}>
      <div className="container h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            {footer.showLogo && (
              <SiteLogo 
                size={24} 
                invertColors={isDarkBackground}
                className="flex items-center"
              />
            )}
            <p className="text-sm">
              {settings.footerText}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {footer.showSocialLinks && (
              <div className="flex items-center gap-4">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;
                  
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                      style={{ color: socialIconColor }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{platform}</span>
                    </a>
                  );
                })}
              </div>
            )}
            <LoginDialog />
          </div>
        </div>
      </div>
    </footer>
  );
}