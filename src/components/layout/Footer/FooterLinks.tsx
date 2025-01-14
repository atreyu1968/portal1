import { useContentStore } from '@/lib/store/content';

export function FooterLinks() {
  const { settings } = useContentStore();
  const footerItems = settings.navigation?.footer || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Enlaces</h3>
      <nav className="flex flex-col space-y-2">
        {footerItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="text-sm hover:opacity-70 transition-opacity"
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}