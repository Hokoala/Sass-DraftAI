"use client";

import { motion } from "framer-motion";

const bars = [
  { height: 40, opacity: "bg-foreground/25", delay: 0 },
  { height: 60, opacity: "bg-foreground/35", delay: 0.2 },
  { height: 35, opacity: "bg-foreground/20", delay: 0.4 },
  { height: 75, opacity: "bg-foreground/40", delay: 0.6 },
  { height: 50, opacity: "bg-foreground/30", delay: 0.8 },
  { height: 65, opacity: "bg-foreground/35", delay: 1.0 },
];

export default function AnalyticsAnimation() {
  return (
    <div className="flex items-end justify-center gap-2 p-6 h-28">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className={`w-4 rounded-t ${bar.opacity}`}
          animate={{ height: [0, bar.height, bar.height * 0.7, bar.height] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: bar.delay }}
        />
      ))}
    </div>
  );
}
