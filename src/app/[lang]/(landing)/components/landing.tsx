import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { BenefitsSection } from "./benefits-section";
import { TestimonialsSection } from "./testimonials-section";
import { CTASection } from "./cta-section";
import { Dictionary } from "@/lib/i18n/types";

type LandingProps = {
  dictionary: Dictionary;
};

export default function Landing({ dictionary }: LandingProps) {
  return (
    <>
      <HeroSection dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <BenefitsSection dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <CTASection dictionary={dictionary} />
    </>
  );
}
