import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Dictionary } from "@/lib/i18n/types";
import Link from "next/link";

type CTASectionProps = {
  dictionary: Dictionary;
};

export function CTASection({ dictionary }: CTASectionProps) {
  return (
    <section className="py-20 bg-primary">
      <ScrollAnimation direction="up" threshold={0.1}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {dictionary.landing.cta.title}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            {dictionary.landing.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4"
              asChild
            >
              <Link href="/auth">
                {dictionary.landing.cta.startBuilding}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
