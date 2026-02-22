"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = session?.user?.name
    ? session.user.name.slice(0, 2).toUpperCase()
    : session?.user?.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <motion.header
      className="fixed z-50 bg-background/90 backdrop-blur-xl border-border/50 dark:border-white/15"
      initial={false}
      animate={{
        top: scrolled ? 12 : 0,
        left: "50%",
        x: "-50%",
        width: scrolled ? "min(780px, 90%)" : "min(1100px, 100%)",
        borderRadius: scrolled ? 16 : 0,
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.15)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        borderTop: scrolled ? "1px solid var(--border)" : "none",
        borderRight: scrolled ? "1px solid var(--border)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        borderLeft: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <motion.div
        className="flex items-center justify-between"
        initial={false}
        animate={{
          paddingTop: scrolled ? "0.5rem" : "1rem",
          paddingBottom: scrolled ? "0.5rem" : "1rem",
          paddingLeft: scrolled ? "1.25rem" : "1.5rem",
          paddingRight: scrolled ? "1.25rem" : "1.5rem",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <Link href="/">
          <motion.span
            className="font-semibold text-foreground"
            initial={false}
            animate={{ fontSize: scrolled ? "0.95rem" : "1.15rem" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            ProjetSass
          </motion.span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 rounded-full px-2 py-1 bg-muted/60">
          <Link href="/" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
            Accueil
          </Link>
          <Link href="#how-it-works" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
            Comment ça marche
          </Link>
          <Link href="#features" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
            Tarifs
          </Link>
          {session && (
            <Link href="/generate" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent">
              Générer
            </Link>
          )}
        </nav>

        {/* Droite */}
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-accent [&_svg]:size-4" />

          {session ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center hover:opacity-80 transition-opacity ring-2 ring-border"
              >
                {initials}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 w-56 bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-50"
                  >
                    {/* Infos utilisateur */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {session.user.name || "Utilisateur"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <Link
                        href="/generate"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Générateur
                      </Link>
                      <Link
                        href="#pricing"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                        Mon plan
                      </Link>
                    </div>

                    {/* Déconnexion */}
                    <div className="p-1.5 border-t border-border">
                      <button
                        onClick={() => { signOut(); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Connexion
            </Link>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
