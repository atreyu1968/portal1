import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center min-h-[400px] py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter">
          Portal de Educación
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Accede a todos los servicios educativos desde un solo lugar
        </p>
      </div>

      <div className="flex gap-6 mt-10">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
          Explorar Servicios
        </Button>
        <Button variant="outline" size="lg" className="h-12 px-8">
          Más Información
        </Button>
      </div>
    </section>
  );
}