"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Comment fonctionne DraftAI ?",
    a: "Tu colles tes notes brutes dans l'éditeur, tu choisis ton format (article de blog, newsletter ou thread LinkedIn) et ton ton de voix. DraftAI envoie tes notes à l'IA Gemini de Google avec un prompt optimisé, et génère un contenu complet et structuré en quelques secondes.",
  },
  {
    q: "Mes notes et contenus sont-ils confidentiels ?",
    a: "Oui, totalement. Tes notes et articles générés sont stockés de façon chiffrée dans ta base de données personnelle. Nous ne partageons jamais tes données avec des tiers, et tu peux supprimer ton compte et toutes tes données à tout moment.",
  },
  {
    q: "Quelle est la différence entre les formats ?",
    a: "L'article de blog génère un texte long et structuré (600–800 mots) optimisé pour le SEO. La newsletter produit un email engageant avec une accroche forte et une signature personnelle. Le thread LinkedIn crée une série de 5 posts numérotés avec un hook viral et un call-to-action final.",
  },
  {
    q: "Est-ce que l'IA écrit vraiment dans mon style ?",
    a: "Plus tu utilises DraftAI, plus il apprend ton style d'écriture. Le plan Pro inclut un moteur de personnalisation qui analyse tes contenus précédents pour adapter le vocabulaire, la longueur des phrases et le ton — pour que le résultat sonne vraiment comme toi.",
  },
  {
    q: "Y a-t-il un essai gratuit ?",
    a: "Oui ! Le plan Starter est gratuit pour toujours avec 5 générations par mois. Les plans Pro et Studio incluent un essai gratuit de 7 jours sans carte bancaire requise. Tu peux annuler à tout moment.",
  },
  {
    q: "Combien de temps ça prend pour générer un article ?",
    a: "En général moins de 15 secondes. La vitesse dépend de la longueur de tes notes et du format choisi. Un thread LinkedIn est généralement plus rapide qu'un article de blog complet.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24">
      {/* En-tête */}
      <div className="text-center pb-16 border-b border-border mb-16">
        <h2 className="text-foreground font-bold text-4xl sm:text-5xl tracking-tight mb-5">
          Questions Fréquentes
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
          Réponses aux questions les plus fréquentes sur DraftAI et ses
          fonctionnalités. Tu as d&apos;autres questions ?{" "}
          <a
            href="mailto:hello@draftai.io"
            className="text-foreground/60 underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Contacte-nous.
          </a>
        </p>
      </div>

      {/* Accordéon */}
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`
                border rounded-2xl overflow-hidden
                transition-all duration-300
                ${
                  isOpen
                    ? "border-border bg-accent"
                    : "border-border/60 bg-muted/50 hover:bg-accent hover:border-border"
                }
              `}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isOpen ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {faq.q}
                </span>

                <div
                  className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${
                      isOpen
                        ? "bg-foreground text-background rotate-180"
                        : "bg-muted text-muted-foreground/40"
                    }
                  `}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
