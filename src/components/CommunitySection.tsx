"use client";

import { AvatarCircles } from "@/components/ui/avatar-circles";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";

const avatars = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=1",
    profileUrl: "#",
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=5",
    profileUrl: "#",
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=8",
    profileUrl: "#",
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=12",
    profileUrl: "#",
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=20",
    profileUrl: "#",
  },
];

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border py-20">
      <Ripple mainCircleSize={180} mainCircleOpacity={0.35} numCircles={12} />
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <AvatarCircles numPeople={2480} avatarUrls={avatars} />
        <h2 className="text-foreground font-bold text-3xl sm:text-4xl tracking-tight">
          Rejoins la communauté DraftAI
        </h2>
        <p className="text-muted-foreground text-base max-w-md leading-relaxed">
          Plus de <strong className="text-foreground/70 font-semibold">2 500 créateurs</strong> utilisent
          déjà DraftAI pour transformer leurs notes en contenu. Rejoins-les.
        </p>
        <Button size="lg" className="mt-2 rounded-xl px-8">
          Rejoindre la communauté
        </Button>
      </div>
    </section>
  );
}
