import { useContentStore } from "@/lib/store/content";
import { LoginDialog } from '@/components/auth/LoginDialog';
import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { getFooterStyles } from './styles';

export function Footer() {
  const { settings } = useContentStore();
  const { footer } = settings;
  const footerStyles = getFooterStyles(footer);

  return (
    <footer style={footerStyles}>
      <div className="container py-12">
        <div className={`grid grid-cols-1 md:grid-cols-${footer.columns} gap-8`}>
          {footer.showLogo && (
            <div className="flex flex-col items-start">
              {settings.logo?.imageUrl && (
                <img
                  src={settings.logo.imageUrl}
                  alt={settings.siteName}
                  className="h-8 w-auto mb-4"
                />
              )}
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: settings.logo?.textColor }}
              >
                {settings.siteName}
              </h3>
              <p className="text-sm opacity-70">
                {settings.siteDescription}
              </p>
            </div>
          )}

          <FooterLinks />
          <SocialLinks />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <p className="text-sm">
              {settings.contactEmail}
            </p>
            <LoginDialog />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t" style={{ borderColor: footer.borderColor }}>
          <p className="text-sm opacity-70 text-center">
            {settings.footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}