import type { CarouselSlide, Network, PageContent, SiteSettings, Service } from '../types/content';
import { defaultSettings, defaultCarouselSlides, defaultNetworks } from './defaults';

const STORAGE_KEYS = {
  NETWORKS: 'networks',
  CAROUSEL: 'carousel',
  PAGES: 'pages',
  SETTINGS: 'settings',
  SERVICES: 'services',
} as const;

class Storage {
  private getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  }

  async initialize(): Promise<void> {
    try {
      // Initialize settings if empty
      if (!this.getItem(STORAGE_KEYS.SETTINGS)) {
        this.setItem(STORAGE_KEYS.SETTINGS, defaultSettings);
      }

      // Initialize networks if empty
      if (!this.getItem(STORAGE_KEYS.NETWORKS)) {
        this.setItem(STORAGE_KEYS.NETWORKS, defaultNetworks);
      }

      // Initialize carousel if empty
      if (!this.getItem(STORAGE_KEYS.CAROUSEL)) {
        this.setItem(STORAGE_KEYS.CAROUSEL, defaultCarouselSlides);
      }

      // Initialize pages if empty
      if (!this.getItem(STORAGE_KEYS.PAGES)) {
        this.setItem(STORAGE_KEYS.PAGES, []);
      }

      // Initialize services if empty
      if (!this.getItem(STORAGE_KEYS.SERVICES)) {
        this.setItem(STORAGE_KEYS.SERVICES, []);
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  getNetworks(): Network[] {
    return this.getItem(STORAGE_KEYS.NETWORKS) || defaultNetworks;
  }

  getCarousel(): CarouselSlide[] {
    return this.getItem(STORAGE_KEYS.CAROUSEL) || defaultCarouselSlides;
  }

  getPages(): PageContent[] {
    return this.getItem(STORAGE_KEYS.PAGES) || [];
  }

  getSettings(): SiteSettings {
    const settings = this.getItem<SiteSettings>(STORAGE_KEYS.SETTINGS);
    if (!settings) return defaultSettings;

    return {
      ...defaultSettings,
      ...settings,
      header: { ...defaultSettings.header, ...settings.header },
      footer: { ...defaultSettings.footer, ...settings.footer },
      logo: { ...defaultSettings.logo, ...settings.logo },
      navigation: { ...defaultSettings.navigation, ...settings.navigation }
    };
  }

  getServices(): Service[] {
    return this.getItem(STORAGE_KEYS.SERVICES) || [];
  }

  updateNetwork(id: string, network: Partial<Network>): void {
    const networks = this.getNetworks();
    const index = networks.findIndex(n => n.id === id);
    if (index !== -1) {
      networks[index] = { ...networks[index], ...network };
      this.setItem(STORAGE_KEYS.NETWORKS, networks);
    }
  }

  updateCarousel(slides: CarouselSlide[]): void {
    this.setItem(STORAGE_KEYS.CAROUSEL, slides);
  }

  updatePages(pages: PageContent[]): void {
    this.setItem(STORAGE_KEYS.PAGES, pages);
  }

  updateSettings(settings: Partial<SiteSettings>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = {
      ...currentSettings,
      ...settings,
      header: { ...currentSettings.header, ...(settings.header || {}) },
      footer: { ...currentSettings.footer, ...(settings.footer || {}) },
      logo: { ...currentSettings.logo, ...(settings.logo || {}) },
      navigation: { ...currentSettings.navigation, ...(settings.navigation || {}) }
    };
    this.setItem(STORAGE_KEYS.SETTINGS, updatedSettings);
  }

  updateServices(services: Service[]): void {
    this.setItem(STORAGE_KEYS.SERVICES, services);
  }
}

export const storage = new Storage();