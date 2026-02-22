"use client";

import { motion } from "framer-motion";

const cards = [
  { rotate: -6, color: "border-foreground/10 bg-foreground/5" },
  { rotate: -2, color: "border-foreground/12 bg-foreground/4" },
  { rotate: 2, color: "border-foreground/8 bg-foreground/3" },
];

export default function LibraryAnimation() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative w-28 h-20">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 rounded-lg border ${card.color} p-2.5`}
            style={{ rotate: card.rotate }}
            animate={{ rotate: [card.rotate, card.rotate + 2, card.rotate] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          >
            <div className="h-1.5 w-10 rounded bg-foreground/10 mb-1.5" />
            <div className="h-1 w-16 rounded bg-foreground/5 mb-1" />
            <div className="h-1 w-12 rounded bg-foreground/5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
