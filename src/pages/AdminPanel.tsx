import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth';
import { CarouselEditor } from './admin/CarouselEditor';
import { ServicesEditor } from './admin/ServicesEditor';
import { SettingsEditor } from './admin/SettingsEditor';
import { PagesEditor } from './admin/PagesEditor';
import { NavigationEditor } from './admin/NavigationEditor';
import { MediaLibrary } from './admin/MediaLibrary';
import { FormSubmissions } from './admin/FormSubmissions';
import { NetworksEditor } from './admin/NetworksEditor';
import { AdminsManager } from './admin/AdminsManager';
import { Dashboard } from './admin/Dashboard';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Images,
  Settings,
  FileText,
  Grid,
  LogOut,
  Menu,
  FolderOpen,
  MessageSquare,
  Network,
  Users,
  SlidersHorizontal,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    exact: true,
  },
  {
    title: 'Páginas',
    icon: FileText,
    path: '/admin/pages',
  },
  {
    title: 'Carrusel',
    icon: SlidersHorizontal,
    path: '/admin/carousel',
  },
  {
    title: 'Redes',
    icon: Network,
    path: '/admin/networks',
  },
  {
    title: 'Servicios',
    icon: Grid,
    path: '/admin/services',
  },
  {
    title: 'Medios',
    icon: FolderOpen,
    path: '/admin/media',
  },
  {
    title: 'Formularios',
    icon: MessageSquare,
    path: '/admin/forms',
  },
  {
    title: 'Navegación',
    icon: Menu,
    path: '/admin/navigation',
  },
  {
    title: 'Administradores',
    icon: Users,
    path: '/admin/admins',
  },
  {
    title: 'Configuración',
    icon: Settings,
    path: '/admin/settings',
  }
];

export function AdminPanel() {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Panel de Administración</h1>
        <Button
          variant="ghost"
          className="gap-2 text-white hover:text-white/80"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="flex">
        <div className="w-64 bg-blue-50 h-[calc(100vh-57px)] border-r">
          <nav className="p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-md mb-1 text-gray-600 hover:bg-blue-100 transition-colors',
                  isActive(item.path) && 'bg-blue-100 text-blue-600 font-medium'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/pages/*" element={<PagesEditor />} />
              <Route path="/carousel" element={<CarouselEditor />} />
              <Route path="/networks" element={<NetworksEditor />} />
              <Route path="/services" element={<ServicesEditor />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/forms" element={<FormSubmissions />} />
              <Route path="/navigation" element={<NavigationEditor />} />
              <Route path="/admins" element={<AdminsManager />} />
              <Route path="/settings" element={<SettingsEditor />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}