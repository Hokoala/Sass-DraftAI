export default function SocialProof() {
  const logos = [
    {
      name: "Gemini",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" fillOpacity="0.7" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" fillOpacity="0.15" />
        </svg>
      ),
    },
    {
      name: "Stripe",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
        </svg>
      ),
    },
    {
      name: "Notion",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.561-.747-.794-1.306-.794-1.96V2.667c0-.839.374-1.54 1.448-1.632z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Medium",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
    {
      name: "Substack",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      ),
    },
    {
      name: "Vercel",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      ),
    },
    {
      name: "Supabase",
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.315 23.498c-.508.635-1.512.262-1.518-.564l-.086-11.606H23.47c1.345 0 2.073 1.58 1.194 2.595L13.315 23.498zM10.685.502c.508-.635 1.512-.262 1.518.564l.086 11.606H.531c-1.345 0-2.073-1.58-1.194-2.595L10.685.502z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-y border-border">
      {/* Label centré */}
      <div className="text-center py-8 border-b border-border">
        <p className="text-muted-foreground text-sm font-medium tracking-wide">
          Intégré avec tes outils et plateformes préférés
        </p>
      </div>

      {/* Grille 4x3 avec bordures */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {logos.map((logo, i) => (
          <div
            key={logo.name}
            className={`flex flex-col items-center justify-center gap-3 py-10 px-8 border-r border-b border-border text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-default group
              ${(i + 1) % 4 === 0 ? "border-r-0" : ""}
              ${i >= logos.length - (logos.length % 4 || 4) ? "border-b-0" : ""}
            `}
          >
            <div className="transition-transform duration-300 group-hover:scale-110">
              {logo.svg}
            </div>
            <span className="text-xs font-semibold tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
