import { useContentStore } from '@/lib/store/content';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { settings } = useContentStore();
  const menuItems = settings?.navigation?.header || [];

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
              style={{ color: settings.header.textColor }}
            >
              {item.imageUrl ? (
                <>
                  <img 
                    src={item.imageUrl} 
                    alt=""
                    className="object-contain"
                    style={{ 
                      width: item.imageSize || '20px',
                      height: item.imageSize || '20px'
                    }}
                  />
                  <span className="sr-only">{item.title}</span>
                </>
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