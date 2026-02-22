import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-6">
      <div
        className="
          border border-border
          rounded-2xl
          flex flex-col items-center justify-center
          text-center
          py-24 px-8
          bg-muted/50
          relative overflow-hidden
        "
      >
        {/* Glow subtil */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-32 bg-foreground/5 rounded-full blur-[80px]" />
        </div>

        <h2 className="relative z-10 text-foreground font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-10">
          Prêt à publier plus vite ?
        </h2>

        <Button
          size="lg"
          asChild
          className="relative z-10 bg-foreground hover:bg-foreground/90 text-background font-semibold text-base px-10 py-4 rounded-2xl"
        >
          <a href="#">Commencer gratuitement</a>
        </Button>
      </div>
    </section>
  );
}
