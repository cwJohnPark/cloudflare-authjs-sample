import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

type CTASectionProps = {
  onNavigate: (url: string) => void;
};

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-20 bg-primary">
      <ScrollAnimation direction="up" threshold={0.1}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to transform your AI development?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of developers building the future with Aioneers.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4"
              onClick={() => onNavigate("/auth")}
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
