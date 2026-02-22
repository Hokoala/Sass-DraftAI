"use client";

import { useState } from "react";

const plans = {
  yearly: [
    {
      name: "Starter",
      price: "0",
      period: "/ an",
      desc: "Pour tester DraftAI sans engagement.",
      badge: null,
      features: [
        { text: "5 générations / mois", ok: true },
        { text: "Article de blog uniquement", ok: true },
        { text: "Export texte", ok: true },
        { text: "Newsletter & LinkedIn", ok: false },
        { text: "Style IA personnalisé", ok: false },
        { text: "Dictée vocale", ok: false },
      ],
      cta: "Commencer gratuitement",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "290",
      period: "/ an",
      desc: "Idéal pour les freelances qui publient sérieusement.",
      badge: "Le plus populaire",
      features: [
        { text: "Générations illimitées", ok: true },
        { text: "3 formats (blog, NL, LinkedIn)", ok: true },
        { text: "Export PDF & texte", ok: true },
        { text: "Style IA personnalisé", ok: true },
        { text: "Dictée vocale", ok: true },
        { text: "API & intégrations", ok: false },
      ],
      cta: "Démarrer l'essai 7j",
      highlighted: true,
    },
    {
      name: "Studio",
      price: "Custom",
      period: "/ an",
      desc: "Solutions sur-mesure pour les agences et équipes.",
      badge: null,
      features: [
        { text: "Tout du plan Pro", ok: true },
        { text: "5 membres d'équipe", ok: true },
        { text: "API & webhooks", ok: true },
        { text: "Intégration Notion & WordPress", ok: true },
        { text: "Support prioritaire", ok: true },
        { text: "Analytics contenu avancé", ok: true },
      ],
      cta: "Nous contacter",
      highlighted: false,
    },
  ],
  monthly: [
    {
      name: "Starter",
      price: "0",
      period: "/ mois",
      desc: "Pour tester DraftAI sans engagement.",
      badge: null,
      features: [
        { text: "5 générations / mois", ok: true },
        { text: "Article de blog uniquement", ok: true },
        { text: "Export texte", ok: true },
        { text: "Newsletter & LinkedIn", ok: false },
        { text: "Style IA personnalisé", ok: false },
        { text: "Dictée vocale", ok: false },
      ],
      cta: "Commencer gratuitement",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "29",
      period: "/ mois",
      desc: "Idéal pour les freelances qui publient sérieusement.",
      badge: "Le plus populaire",
      features: [
        { text: "Générations illimitées", ok: true },
        { text: "3 formats (blog, NL, LinkedIn)", ok: true },
        { text: "Export PDF & texte", ok: true },
        { text: "Style IA personnalisé", ok: true },
        { text: "Dictée vocale", ok: true },
        { text: "API & intégrations", ok: false },
      ],
      cta: "Démarrer l'essai 7j",
      highlighted: true,
    },
    {
      name: "Studio",
      price: "Custom",
      period: "/ mois",
      desc: "Solutions sur-mesure pour les agences et équipes.",
      badge: null,
      features: [
        { text: "Tout du plan Pro", ok: true },
        { text: "5 membres d'équipe", ok: true },
        { text: "API & webhooks", ok: true },
        { text: "Intégration Notion & WordPress", ok: true },
        { text: "Support prioritaire", ok: true },
        { text: "Analytics contenu avancé", ok: true },
      ],
      cta: "Nous contacter",
      highlighted: false,
    },
  ],
};

export default function Pricing() {
  const [billing, setBilling] = useState<"yearly" | "monthly">("yearly");

  return (
    <section className="py-20">
      {/* En-tête */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-foreground font-bold text-4xl sm:text-5xl lg:text-[3.2rem] leading-tight tracking-tight mb-5">
          Des tarifs simples pour tous.
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
          Choisis un{" "}
          <strong className="text-foreground/70 font-semibold">
            plan abordable
          </strong>{" "}
          qui inclut les meilleures fonctionnalités pour créer du contenu,
          engager ton audience et développer ton activité.
        </p>
      </div>

      {/* Toggle Yearly / Monthly */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center bg-muted border border-border rounded-full p-1">
          <button
            onClick={() => setBilling("yearly")}
            className={`
              flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${
                billing === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground/70"
              }
            `}
          >
            Annuel
            <span className="bg-foreground/10 text-foreground text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
              Économisez 25%
            </span>
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`
              px-5 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${
                billing === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground/70"
              }
            `}
          >
            Mensuel
          </button>
        </div>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-2xl overflow-hidden">
        {plans[billing].map((plan) => (
          <div
            key={plan.name}
            className={`
              relative flex flex-col
              border-r border-border last:border-r-0
              p-8
              transition-colors duration-300
              ${
                plan.highlighted
                  ? "bg-accent"
                  : "bg-background hover:bg-accent"
              }
            `}
          >
            {/* Badge Most Popular */}
            {plan.badge && (
              <div className="absolute top-6 right-6">
                <span className="bg-foreground/10 border border-foreground/20 text-foreground text-[0.65rem] font-semibold px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan name */}
            <p className="text-muted-foreground text-sm font-medium mb-4">
              {plan.name}
            </p>

            {/* Prix */}
            <div className="flex items-baseline gap-1.5 mb-2">
              {plan.price === "Custom" ? (
                <span className="text-foreground font-black text-4xl tracking-tight">
                  Custom
                </span>
              ) : (
                <>
                  {plan.price !== "0" && (
                    <span className="text-foreground font-black text-4xl tracking-tight">
                      {plan.price}€
                    </span>
                  )}
                  {plan.price === "0" && (
                    <span className="text-foreground font-black text-4xl tracking-tight">
                      Gratuit
                    </span>
                  )}
                  <span className="text-muted-foreground/50 text-sm">
                    {plan.period}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {plan.desc}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-3.5 mb-10 flex-1">
              {plan.features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className={`flex-shrink-0 mt-0.5 ${
                      f.ok ? "text-foreground" : "text-muted-foreground/20"
                    }`}
                    fill="none"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    {f.ok && (
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <span
                    className={`text-sm leading-relaxed ${
                      f.ok
                        ? "text-foreground/70"
                        : "text-muted-foreground/30"
                    }`}
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`
                w-full py-3 rounded-xl text-sm font-semibold
                transition-all duration-200 active:scale-95
                ${
                  plan.highlighted
                    ? "bg-foreground text-background hover:opacity-90"
                    : "bg-transparent border border-border text-muted-foreground hover:text-foreground hover:border-foreground/25"
                }
              `}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-muted-foreground/40 text-xs mt-6">
        Tous les plans incluent un essai gratuit de 7 jours · Annulation à
        tout moment · Aucune carte bancaire requise
      </p>
    </section>
  );
}
