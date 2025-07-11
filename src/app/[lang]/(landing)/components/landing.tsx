"use client";

import { useRouter } from "next/navigation";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { BenefitsSection } from "./benefits-section";
import { TestimonialsSection } from "./testimonials-section";
import { CTASection } from "./cta-section";

export default function Landing() {
  const router = useRouter();

  const handleNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      <main className="page-transition">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection onNavigate={handleNavigate} />
      </main>
    </div>
  );
}
