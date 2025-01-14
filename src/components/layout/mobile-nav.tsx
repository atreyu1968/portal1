import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
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
        <Button variant="ghost" className="h-9 w-9 px-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-4">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}