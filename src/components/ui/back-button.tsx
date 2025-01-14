import { Button } from './button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      className="fixed top-20 left-4 z-10"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Volver
    </Button>
  );
}