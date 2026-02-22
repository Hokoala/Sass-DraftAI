"use client";

import { motion } from "framer-motion";

export default function BlogAnimation() {
  return (
    <div className="flex items-center justify-center p-6 gap-4">
      {/* Note brute */}
      <motion.div
        className="w-24 rounded-lg border border-border bg-muted/50 p-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="h-1.5 w-12 rounded bg-muted-foreground/20 mb-2" />
        <div className="h-1.5 w-16 rounded bg-muted-foreground/15 mb-1.5" />
        <div className="h-1.5 w-10 rounded bg-muted-foreground/15 mb-1.5" />
        <div className="h-1.5 w-14 rounded bg-muted-foreground/10" />
      </motion.div>

      {/* Flèche animée */}
      <motion.div
        className="text-foreground/60"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.div>

      {/* Article structuré */}
      <motion.div
        className="w-28 rounded-lg border border-foreground/10 bg-foreground/5 p-3"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <div className="h-2 w-16 rounded bg-foreground/20 mb-2.5" />
        <div className="h-1.5 w-full rounded bg-foreground/10 mb-1.5" />
        <div className="h-1.5 w-full rounded bg-foreground/10 mb-1.5" />
        <div className="h-1.5 w-20 rounded bg-foreground/10 mb-2.5" />
        <div className="h-2 w-12 rounded bg-foreground/15 mb-2" />
        <div className="h-1.5 w-full rounded bg-foreground/8 mb-1.5" />
        <div className="h-1.5 w-16 rounded bg-foreground/8" />
      </motion.div>
    </div>
  );
}
