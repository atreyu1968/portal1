import { LogoWithTitle } from '@/components/ui/logo-with-title';

export function Logo() {
  return (
    <a 
      href="/" 
      className="flex items-center gap-2"
      aria-label="Ir a inicio"
    >
      <LogoWithTitle />
    </a>
  );
}