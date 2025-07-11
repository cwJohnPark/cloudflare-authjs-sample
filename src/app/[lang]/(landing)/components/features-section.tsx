import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Zap, Shield, LucideIcon } from "lucide-react";
import {
  ScrollAnimation,
  StaggeredAnimation,
} from "@/hooks/use-scroll-animation";
import { Dictionary } from "@/lib/i18n/types";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FeaturesSectionProps = {
  dictionary: Dictionary;
};

export function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  const features: Feature[] = [
    {
      icon: Brain,
      title: dictionary.landing.features.items.smartAI.title,
      description: dictionary.landing.features.items.smartAI.description,
    },
    {
      icon: Zap,
      title: dictionary.landing.features.items.lightningFast.title,
      description: dictionary.landing.features.items.lightningFast.description,
    },
    {
      icon: Shield,
      title: dictionary.landing.features.items.enterpriseSecurity.title,
      description:
        dictionary.landing.features.items.enterpriseSecurity.description,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up" threshold={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {dictionary.landing.features.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dictionary.landing.features.description}
            </p>
          </div>
        </ScrollAnimation>

        <StaggeredAnimation
          stagger={150}
          direction="up"
          className="grid md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-6 card-hover h-[280px]"
            >
              <CardHeader className="text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}
