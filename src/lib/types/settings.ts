export interface HeaderSettings {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  height: string;
  sticky: boolean;
  glassmorphism: boolean;
  menuPosition: 'left' | 'right';
  showLogo: boolean;
  showTitle: boolean;
}

export interface FooterSettings {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  height: string;
  showLogo: boolean;
  showSocialLinks: boolean;
  socialLinksColor: string;
  columns: number;
}

export interface LogoSettings {
  imageUrl: string;
  textColor?: string;
  invertOnDark?: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  logo: LogoSettings;
  header: HeaderSettings;
  footer: FooterSettings;
  navigation: {
    header: MenuItem[];
    footer: MenuItem[];
  };
  socialLinks: Record<string, string>;
  footerText: string;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  type: 'link' | 'page' | 'network';
  targetId?: string;
  imageUrl?: string;
  imageSize?: string;
}