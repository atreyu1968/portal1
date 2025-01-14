import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useContentStore } from "@/lib/store/content";
import { cn } from "@/lib/utils";
import { defaultSettings } from '@/lib/db/defaults';

export function Navigation() {
  const { settings = defaultSettings } = useContentStore();
  const menuItems = settings?.navigation?.header || [];
  const { header } = settings;

  const linkStyles = {
    color: header?.textColor || '#ffffff',
    '&:hover': {
      backgroundColor: `${header?.backgroundColor || '#1e40af'}dd`,
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink
              href={item.url}
              className={cn(
                "px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2",
                "hover:bg-opacity-90"
              )}
              style={linkStyles}
            >
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="object-contain"
                  style={{ 
                    width: item.imageSize || '20px',
                    height: item.imageSize || '20px'
                  }}
                />
              ) : (
                <span>{item.title}</span>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}