import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useContentStore } from '@/lib/store/content';

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export function SocialLinks() {
  const { settings } = useContentStore();

  if (!settings.footer.showSocialLinks) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Síguenos</h3>
      <div className="flex space-x-4">
        {Object.entries(settings.socialLinks).map(([platform, url]) => {
          if (!url) return null;
          const Icon = socialIcons[platform as keyof typeof socialIcons];
          return (
            <a
              key={platform}
              href={url}
              className="hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}