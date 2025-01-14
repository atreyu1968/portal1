import { useContentStore } from '@/lib/store/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { defaultSettings } from '@/lib/db/defaults';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export function SettingsEditor() {
  const { settings = defaultSettings, updateSettings } = useContentStore();
  const { toast } = useToast();

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      logo: {
        ...settings.logo,
        imageUrl: e.target.value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSettings = {
      siteName: formData.get('siteName') as string || settings.siteName,
      siteDescription: formData.get('siteDescription') as string || settings.siteDescription,
      contactEmail: formData.get('contactEmail') as string || settings.contactEmail,
      header: {
        ...settings.header,
        backgroundColor: formData.get('headerBgColor') as string || settings.header.backgroundColor,
        textColor: formData.get('headerTextColor') as string || settings.header.textColor,
        height: formData.get('headerHeight') as string || settings.header.height,
        sticky: formData.get('headerSticky') === 'on',
        glassmorphism: formData.get('headerGlass') === 'on',
        showLogo: formData.get('headerShowLogo') === 'on',
        showTitle: formData.get('headerShowTitle') === 'on'
      },
      footer: {
        ...settings.footer,
        backgroundColor: formData.get('footerBgColor') as string || settings.footer.backgroundColor,
        textColor: formData.get('footerTextColor') as string || settings.footer.textColor,
        height: formData.get('footerHeight') as string || settings.footer.height,
        showLogo: formData.get('footerShowLogo') === 'on'
      },
      footerText: formData.get('footerText') as string || settings.footerText
    };

    updateSettings(newSettings);
    toast({
      title: 'Configuración actualizada',
      description: 'Los cambios han sido guardados correctamente.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración del Sitio</h2>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="header">Cabecera</TabsTrigger>
          <TabsTrigger value="footer">Pie de Página</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    defaultValue={settings.siteName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción del Sitio</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    defaultValue={settings.siteDescription}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    defaultValue={settings.contactEmail}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL del Logo</Label>
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={settings.logo.imageUrl}
                    onChange={handleLogoUrlChange}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="header">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerBgColor">Color de Fondo</Label>
                    <Input
                      id="headerBgColor"
                      name="headerBgColor"
                      type="color"
                      defaultValue={settings.header.backgroundColor}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headerTextColor">Color del Texto</Label>
                    <Input
                      id="headerTextColor"
                      name="headerTextColor"
                      type="color"
                      defaultValue={settings.header.textColor}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headerHeight">Altura</Label>
                  <Input
                    id="headerHeight"
                    name="headerHeight"
                    defaultValue={settings.header.height}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="headerShowLogo">Mostrar Logo</Label>
                  <Switch
                    id="headerShowLogo"
                    name="headerShowLogo"
                    defaultChecked={settings.header.showLogo}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="headerShowTitle">Mostrar Título</Label>
                  <Switch
                    id="headerShowTitle"
                    name="headerShowTitle"
                    defaultChecked={settings.header.showTitle}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="headerSticky">Fijar al Tope</Label>
                  <Switch
                    id="headerSticky"
                    name="headerSticky"
                    defaultChecked={settings.header.sticky}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="headerGlass">Efecto Cristal</Label>
                  <Switch
                    id="headerGlass"
                    name="headerGlass"
                    defaultChecked={settings.header.glassmorphism}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="footer">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="footerBgColor">Color de Fondo</Label>
                    <Input
                      id="footerBgColor"
                      name="footerBgColor"
                      type="color"
                      defaultValue={settings.footer.backgroundColor}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footerTextColor">Color del Texto</Label>
                    <Input
                      id="footerTextColor"
                      name="footerTextColor"
                      type="color"
                      defaultValue={settings.footer.textColor}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerHeight">Altura</Label>
                  <Input
                    id="footerHeight"
                    name="footerHeight"
                    defaultValue={settings.footer.height}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="footerShowLogo">Mostrar Logo</Label>
                  <Switch
                    id="footerShowLogo"
                    name="footerShowLogo"
                    defaultChecked={settings.footer.showLogo}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Texto del Pie de Página</Label>
                  <Input
                    id="footerText"
                    name="footerText"
                    defaultValue={settings.footerText}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <div className="flex justify-end mt-6">
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}