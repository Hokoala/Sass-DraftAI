"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export default function MultiPlatformAnimation() {
  return (
    <div className="relative flex h-40 w-full items-center justify-center overflow-hidden">
      {/* Orbite intérieure */}
      <OrbitingCircles iconSize={32} radius={50} speed={1.5}>
        {/* LinkedIn */}
        <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </div>
        {/* Twitter/X */}
        <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </div>
        {/* Newsletter */}
        <div className="flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </OrbitingCircles>

      {/* Orbite extérieure (sens inverse) */}
      <OrbitingCircles iconSize={28} radius={90} speed={1} reverse>
        {/* Blog */}
        <div className="flex size-7 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        {/* Medium */}
        <div className="flex size-7 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <span className="text-foreground font-bold text-xs">M</span>
        </div>
        {/* RSS */}
        <div className="flex size-7 items-center justify-center rounded-full border border-border bg-background shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </div>
      </OrbitingCircles>
    </div>
  );
}
