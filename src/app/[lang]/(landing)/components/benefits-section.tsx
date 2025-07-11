import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Shield, LucideIcon } from "lucide-react";
import {
  ScrollAnimation,
  StaggeredAnimation,
} from "@/hooks/use-scroll-animation";
import { Dictionary } from "@/lib/i18n/types";

type Benefit = {
  icon: LucideIcon;
  metric: string;
  label: string;
  description: string;
};

type BenefitsSectionProps = {
  dictionary: Dictionary;
};

export function BenefitsSection({ dictionary }: BenefitsSectionProps) {
  const benefits: Benefit[] = [
    {
      icon: TrendingUp,
      metric: dictionary.landing.benefits.items.modelsDeployed.metric,
      label: dictionary.landing.benefits.items.modelsDeployed.label,
      description: dictionary.landing.benefits.items.modelsDeployed.description,
    },
    {
      icon: Clock,
      metric: dictionary.landing.benefits.items.uptime.metric,
      label: dictionary.landing.benefits.items.uptime.label,
      description: dictionary.landing.benefits.items.uptime.description,
    },
    {
      icon: Shield,
      metric: dictionary.landing.benefits.items.responseTime.metric,
      label: dictionary.landing.benefits.items.responseTime.label,
      description: dictionary.landing.benefits.items.responseTime.description,
    },
  ];

  return (
    <section className="py-20 bg-accent/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up" threshold={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {dictionary.landing.benefits.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.landing.benefits.description}
            </p>
          </div>
        </ScrollAnimation>

        <StaggeredAnimation
          stagger={150}
          direction="up"
          className="grid md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg text-center p-6 card-hover"
            >
              <CardContent className="p-6">
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">
                  {benefit.metric}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {benefit.label}
                </div>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}
