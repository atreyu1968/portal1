import { create } from 'zustand';
import type { PageContent, CarouselSlide, Network, SiteSettings, Service } from '../types/content';
import { storage } from '../db/storage';
import { defaultSettings, defaultCarouselSlides, defaultNetworks } from '../db/defaults';

interface ContentState {
  initialized: boolean;
  pages: PageContent[];
  carousel: CarouselSlide[];
  networks: Network[];
  services: Service[];
  settings: SiteSettings;
  
  initialize: () => Promise<void>;
  addPage: (page: PageContent) => void;
  updatePage: (id: string, updates: Partial<PageContent>) => void;
  deletePage: (id: string) => void;
  updateNetwork: (id: string, network: Partial<Network>) => void;
  updateCarousel: (slides: CarouselSlide[]) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

export const useContentStore = create<ContentState>()((set, get) => ({
  initialized: false,
  pages: [],
  carousel: defaultCarouselSlides,
  networks: defaultNetworks,
  services: [],
  settings: defaultSettings,

  initialize: async () => {
    if (get().initialized) return;

    try {
      await storage.initialize();
      
      const storedSettings = storage.getSettings();
      const storedCarousel = storage.getCarousel();
      const storedNetworks = storage.getNetworks();
      
      set({
        initialized: true,
        networks: storedNetworks.length > 0 ? storedNetworks : defaultNetworks,
        carousel: storedCarousel.length > 0 ? storedCarousel : defaultCarouselSlides,
        pages: storage.getPages(),
        settings: storedSettings,
        services: storage.getServices()
      });
    } catch (error) {
      console.error('Failed to initialize content store:', error);
      set({
        initialized: true,
        networks: defaultNetworks,
        carousel: defaultCarouselSlides,
        pages: [],
        settings: defaultSettings,
        services: []
      });
    }
  },

  addPage: (page) => {
    set((state) => ({
      pages: [...state.pages, page]
    }));
    storage.updatePages(get().pages);
  },

  updatePage: (id, updates) => {
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id ? { ...page, ...updates } : page
      )
    }));
    storage.updatePages(get().pages);
  },

  deletePage: (id) => {
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id)
    }));
    storage.updatePages(get().pages);
  },

  updateNetwork: (id, updatedNetwork) => {
    storage.updateNetwork(id, updatedNetwork);
    set((state) => ({
      networks: state.networks.map((n) =>
        n.id === id ? { ...n, ...updatedNetwork } : n
      )
    }));
  },

  updateCarousel: (slides) => {
    const sortedSlides = [...slides].sort((a, b) => (a.order || 0) - (b.order || 0));
    storage.updateCarousel(sortedSlides);
    set({ carousel: sortedSlides });
  },

  updateSettings: (newSettings) => {
    const currentSettings = get().settings;
    const updatedSettings = {
      ...currentSettings,
      ...newSettings,
      header: { ...currentSettings.header, ...(newSettings.header || {}) },
      footer: { ...currentSettings.footer, ...(newSettings.footer || {}) },
      logo: { ...currentSettings.logo, ...(newSettings.logo || {}) },
      navigation: { ...currentSettings.navigation, ...(newSettings.navigation || {}) }
    };
    
    storage.updateSettings(updatedSettings);
    set({ settings: updatedSettings });
  },

  addService: (service) => {
    set((state) => ({
      services: [...state.services, service]
    }));
    storage.updateServices(get().services);
  },

  updateService: (id, updatedService) => {
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, ...updatedService } : s
      )
    }));
    storage.updateServices(get().services);
  },

  deleteService: (id) => {
    set((state) => ({
      services: state.services.filter((s) => s.id !== id)
    }));
    storage.updateServices(get().services);
  }
}));