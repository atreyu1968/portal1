import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContentStore } from "@/lib/store/content";
import { Menu } from "lucide-react";

export function MobileNav() {
  const { settings } = useContentStore();
  const menuItems = settings?.navigation?.header || [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-9 w-9 p-0 md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>
            Navegación principal del sitio
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
            >
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt=""
                  className="object-contain"
                  style={{ 
                    width: item.imageSize || '20px',
                    height: item.imageSize || '20px'
                  }}
                />
              )}
              {item.title}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}