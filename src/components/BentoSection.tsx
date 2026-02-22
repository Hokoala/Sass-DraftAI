import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FileText, Zap, Share2, BookOpen, BarChart3 } from "lucide-react";
import BeamDemo from "@/components/BeamDemo";
import BlogAnimation from "@/components/bento-animations/BlogAnimation";
import MultiPlatformAnimation from "@/components/bento-animations/MultiPlatformAnimation";
import LibraryAnimation from "@/components/bento-animations/LibraryAnimation";
import AnalyticsAnimation from "@/components/bento-animations/AnalyticsAnimation";

const features = [
  {
    Icon: FileText,
    name: "Blog en un clic",
    description: "Transforme tes notes brutes en articles de blog structurés et optimisés SEO.",
    href: "#",
    cta: "En savoir plus",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
        <BlogAnimation />
      </div>
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Zap,
    name: "Génération instantanée",
    description: "L'IA analyse et structure ton contenu en quelques secondes.",
    href: "#",
    cta: "Découvrir",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
        <BeamDemo />
      </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Share2,
    name: "Multi-plateforme",
    description: "Exporte vers LinkedIn, Newsletter, Twitter et plus encore.",
    href: "#",
    cta: "Voir les formats",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
        <MultiPlatformAnimation />
      </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BookOpen,
    name: "Bibliothèque",
    description: "Retrouve tous tes contenus générés, organisés et accessibles.",
    href: "#",
    cta: "Explorer",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
        <LibraryAnimation />
      </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BarChart3,
    name: "Analytics",
    description: "Suis les performances de tes contenus avec des statistiques détaillées.",
    href: "#",
    cta: "Voir les stats",
    background: (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
        <AnalyticsAnimation />
      </div>
    ),
    className: "col-span-3 lg:col-span-1",
  },
];

export default function BentoSection() {
  return (
    <section className="py-16 px-8 sm:px-16" id="features">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
          Tout ce dont tu as besoin
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Des outils puissants pour transformer tes idées en contenu professionnel.
        </p>
      </div>
      <BentoGrid>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
