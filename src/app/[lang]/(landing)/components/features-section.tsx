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

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Brain,
    title: "Smart AI Models",
    description:
      "Access our library of pre-trained models for computer vision, NLP, and more. Deploy instantly with our one-click API integration.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized infrastructure delivers AI predictions in milliseconds. Scale from prototype to production seamlessly.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption. Your data stays secure while you build the next generation of AI applications.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up" threshold={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to build AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools, models, and
              infrastructure you need to create production-ready AI
              applications.
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
