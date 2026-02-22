"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export default function BeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden p-6"
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-center justify-between gap-10">
        {/* User */}
        <Circle ref={userRef}>
          <Icons.user />
        </Circle>

        {/* AI au centre */}
        <Circle ref={aiRef} className="size-14 p-3">
          <Icons.ai />
        </Circle>

        {/* Outputs à droite */}
        <div className="flex flex-col gap-4">
          <Circle ref={blogRef} className="size-10 p-2">
            <Icons.blog />
          </Circle>
          <Circle ref={newsletterRef} className="size-10 p-2">
            <Icons.newsletter />
          </Circle>
          <Circle ref={linkedinRef} className="size-10 p-2">
            <Icons.linkedin />
          </Circle>
        </div>
      </div>

      {/* Beams : User -> AI */}
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={userRef}
        toRef={aiRef}
        gradientStartColor="#888"
        gradientStopColor="#333"
      />
      {/* Beams : AI -> outputs */}
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={blogRef}
        gradientStartColor="#888"
        gradientStopColor="#333"
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={newsletterRef}
        gradientStartColor="#888"
        gradientStopColor="#333"
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={linkedinRef}
        gradientStartColor="#888"
        gradientStopColor="#333"
      />
    </div>
  );
}

const Icons = {
  user: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" className="text-foreground" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  ai: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
  blog: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  newsletter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};
