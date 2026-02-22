"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.15)"
          : "0 0 0 rgba(0,0,0,0)",
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
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.name || session.user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => signOut()}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full"
              >
                Connexion
              </Button>
            </Link>
          )}
          <AnimatedThemeToggler className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-accent [&_svg]:size-4" />
        </div>
      </motion.div>
    </motion.header>
  );
}
