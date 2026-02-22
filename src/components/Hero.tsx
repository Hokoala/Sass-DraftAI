"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden px-8 sm:px-16">

      {/* ── GLOW de fond ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-foreground/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">

        {/* ── GAUCHE : Texte ── */}
        <div className="flex flex-col">

          {/* Badge unique */}
          <div className="inline-flex items-center gap-2 bg-foreground/5 border border-foreground/10 rounded-full px-4 py-2 mb-10 w-fit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" className="text-foreground/60" strokeWidth="2.5" strokeLinecap="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-foreground/60 text-xs font-semibold">
              Nouveau — Génération de contenu par IA
            </span>
          </div>

          {/* Titre */}
          <h1 className="font-black leading-[1.0] tracking-tight mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] text-foreground">
              Notes en
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] text-foreground">
              Contenu.
            </span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[420px] mb-10">
            Transforme tes notes brutes en articles de blog,
            newsletters et threads LinkedIn en quelques secondes,
            grâce à l&apos;IA.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 w-fit">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 group w-fit"
            >
              <span className="font-mono text-base leading-none transition-colors">
                &gt;_
              </span>
              Commencer gratuitement
            </a>
            <p className="text-muted-foreground/50 text-xs pl-1">
              Aucune carte bancaire · 7 jours d&apos;essai gratuit
            </p>
          </div>

        </div>

        {/* ── DROITE : Sphère 3D avec orbites ── */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative w-[380px] h-[380px]">

            {/* Glow derrière */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-foreground/8 rounded-full blur-[80px]" />
              <div className="absolute w-48 h-48 bg-foreground/5 rounded-full blur-[60px] translate-x-4 -translate-y-4" />
            </div>

            {/* Sphère centrale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, hsl(0 0% 70%) 0%, hsl(0 0% 30%) 40%, hsl(0 0% 8%) 100%)",
                  boxShadow: "0 0 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.4)",
                  animation: "pulse 4s ease-in-out infinite",
                }}
              />
            </div>

            {/* Orbite 1 */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "spin 12s linear infinite" }}
            >
              <div
                className="absolute w-full h-full rounded-full border border-foreground/10"
                style={{ transform: "rotateX(65deg) rotateZ(-20deg)" }}
              />
              <div
                className="absolute w-4 h-4 rounded-full bg-foreground/70"
                style={{
                  boxShadow: "0 0 16px rgba(0,0,0,0.4)",
                  animation: "orbit1 12s linear infinite",
                }}
              />
            </div>

            {/* Orbite 2 */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "spin 18s linear infinite reverse" }}
            >
              <div
                className="absolute w-[85%] h-[85%] rounded-full border border-foreground/8"
                style={{ transform: "rotateX(70deg) rotateZ(30deg)" }}
              />
              <div
                className="absolute w-3 h-3 rounded-full bg-foreground/50"
                style={{
                  boxShadow: "0 0 12px rgba(0,0,0,0.3)",
                  animation: "orbit2 18s linear infinite",
                }}
              />
            </div>

            {/* Orbite 3 */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "spin 15s linear infinite" }}
            >
              <div
                className="absolute w-[110%] h-[110%] rounded-full border border-foreground/6"
                style={{ transform: "rotateX(55deg) rotateZ(-45deg)" }}
              />
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-foreground/40"
                style={{
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  animation: "orbit3 15s linear infinite",
                }}
              />
            </div>

            {/* Petites particules flottantes */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-foreground/30" style={{ animation: "float1 6s ease-in-out infinite" }} />
              <div className="absolute top-[70%] left-[75%] w-1 h-1 rounded-full bg-foreground/20" style={{ animation: "float2 8s ease-in-out infinite" }} />
              <div className="absolute top-[25%] right-[15%] w-1 h-1 rounded-full bg-foreground/20" style={{ animation: "float3 7s ease-in-out infinite" }} />
              <div className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-foreground/15" style={{ animation: "float2 5s ease-in-out infinite" }} />
              <div className="absolute top-[50%] right-[10%] w-1 h-1 rounded-full bg-foreground/15" style={{ animation: "float1 9s ease-in-out infinite" }} />
            </div>

          </div>
        </div>

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes orbit1 {
          0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0% { transform: rotate(0deg) translateX(130px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(130px) rotate(360deg); }
        }
        @keyframes orbit3 {
          0% { transform: rotate(0deg) translateX(190px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(190px) rotate(-360deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-12px) scale(1.3); opacity: 0.8; }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-18px) scale(1.2); opacity: 0.7; }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-10px) scale(1.4); opacity: 0.6; }
        }
      `}</style>

    </section>
  );
}
