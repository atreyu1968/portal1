import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, UserCog, Shield, Mail } from 'lucide-react';
import type { Admin } from '@/lib/types/auth';

export function AdminsManager() {
  const { admins, user, addAdmin, updateAdmin, deleteAdmin, updateAdminStatus } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const adminData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as Admin['role'],
      status: 'active' as const
    };

    try {
      if (editingAdmin) {
        updateAdmin(editingAdmin.id, adminData);
        toast({
          title: 'Administrador actualizado',
          description: 'Los cambios han sido guardados correctamente.'
        });
      } else {
        addAdmin(adminData);
        toast({
          title: 'Administrador añadido',
          description: 'El nuevo administrador ha sido creado correctamente.'
        });
      }
      setIsDialogOpen(false);
      setEditingAdmin(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar los cambios.',
        variant: 'destructive'
      });
    }
  };

  const handleStatusChange = (id: string, status: Admin['status']) => {
    try {
      updateAdminStatus(id, status);
      toast({
        title: 'Estado actualizado',
        description: 'El estado del administrador ha sido actualizado.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Administradores</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAdmin(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Administrador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAdmin ? 'Editar' : 'Nuevo'} Administrador
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  defaultValue={editingAdmin?.username}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {editingAdmin ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required={!editingAdmin}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  defaultValue={editingAdmin?.name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={editingAdmin?.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select
                  name="role"
                  defaultValue={editingAdmin?.role || 'admin'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    {user?.role === 'superadmin' && (
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingAdmin ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {admins.map((admin) => (
          <Card key={admin.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserCog className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{admin.name}</h3>
                    {admin.role === 'superadmin' && (
                      <Shield className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{admin.username}</span>
                    <span>•</span>
                    <Mail className="h-4 w-4" />
                    <span>{admin.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={admin.status}
                  onValueChange={(value) => 
                    handleStatusChange(admin.id, value as Admin['status'])
                  }
                  disabled={admin.role === 'superadmin' && user?.id !== admin.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingAdmin(admin);
                    setIsDialogOpen(true);
                  }}
                  disabled={admin.role === 'superadmin' && user?.id !== admin.id}
                >
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}