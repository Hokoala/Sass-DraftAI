export default function Footer() {
  const cols = [
    {
      title: "Produit",
      links: [
        { label: "Blog → Article",       href: "#" },
        { label: "Notes → Newsletter",   href: "#" },
        { label: "Notes → LinkedIn",     href: "#" },
        { label: "Bibliothèque",          href: "#" },
        { label: "Historique",            href: "#" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos",              href: "#" },
        { label: "Blog",                  href: "#" },
        { label: "Carrières ↗",           href: "#" },
        { label: "Nous contacter",        href: "#" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "#" },
        { label: "Politique de confidentialité ↗", href: "#" },
        { label: "Mentions légales",      href: "#" },
        { label: "Accord entreprise",     href: "#" },
        { label: "🔒 Vos choix de données", href: "#" },
      ],
    },
  ]

  return (
    <footer className="relative bg-background overflow-hidden rounded-2xl border border-border/50 dark:border-white/15">

      {/* ── CONTENU PRINCIPAL ── */}
      <div className="relative z-10 mx-auto px-8 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">

          {/* ── COLONNE GAUCHE — Logo + tagline ── */}
          <div className="flex flex-col justify-between pr-12 pb-12 md:pb-0">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" className="text-background" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <span className="text-foreground font-bold text-base tracking-tight">
                  DraftAI
                </span>
              </div>

              <p className="text-foreground font-bold text-xl leading-tight mb-3">
                Tes notes.<br />Ton contenu.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transforme tes idées brutes en articles,<br />
                newsletters et threads en secondes.
              </p>
            </div>

          </div>

          {/* ── COLONNES LIENS ── */}
          {cols.map((col) => (
            <div
              key={col.title}
              className="border-l border-border px-10 py-2 pb-12"
            >
              <h3 className="text-foreground font-semibold text-sm mb-6 tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILIGRANE GÉANT ── */}
      <div className="relative z-10 flex items-end justify-center overflow-hidden mt-4 h-[120px] sm:h-[160px] md:h-[200px] select-none pointer-events-none">
        <span
          className="text-foreground/[0.05] font-black whitespace-nowrap leading-none text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] tracking-tighter translate-y-[20%]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          DRAFTAI
        </span>
      </div>

      {/* ── BARRE BAS ── */}
      <div className="relative z-10 border-t border-border mt-0">
        <div className="mx-auto px-8 py-4 flex items-center justify-between">
          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} DraftAI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {/* Twitter/X */}
            <a href="#" className="text-muted-foreground/50 hover:text-foreground transition-colors duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-muted-foreground/50 hover:text-foreground transition-colors duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="text-muted-foreground/50 hover:text-foreground transition-colors duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
