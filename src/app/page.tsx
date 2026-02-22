import Hero from "@/components/Hero";
import BentoSection from "@/components/BentoSection";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import CommunitySection from "@/components/CommunitySection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoSection />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CommunitySection />
      <CTA />
    </>
  );
}
