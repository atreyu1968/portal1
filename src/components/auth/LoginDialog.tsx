import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/lib/store/auth';
import { useToast } from '@/components/ui/use-toast';
import { LoginForm } from './LoginForm';

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    
    if (success) {
      setOpen(false);
      navigate('/admin');
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido al panel de administración',
      });
    } else {
      toast({
        title: 'Error de inicio de sesión',
        description: 'Credenciales incorrectas',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-gray-500 hover:text-gray-900">
          Administración
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
        </DialogHeader>
        <LoginForm onSubmit={handleLogin} />
      </DialogContent>
    </Dialog>
  );
}