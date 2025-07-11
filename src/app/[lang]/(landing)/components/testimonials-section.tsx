import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  ScrollAnimation,
  StaggeredAnimation,
} from "@/hooks/use-scroll-animation";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Lead AI Researcher",
    company: "TechCorp",
    content:
      "Aioneers has revolutionized how we deploy AI models. What used to take weeks now takes minutes. The platform is incredibly intuitive and powerful.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    company: "DataFlow Inc",
    content:
      "The enterprise security features and compliance tools gave us the confidence to migrate our entire ML pipeline. Outstanding performance and reliability.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "ML Engineer",
    company: "StartupAI",
    content:
      "As a startup, we needed a solution that could scale with us. Aioneers provided exactly that - from prototype to production seamlessly.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation direction="up" threshold={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by AI developers worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what industry leaders are saying about building AI solutions
              with Aioneers
            </p>
          </div>
        </ScrollAnimation>

        <StaggeredAnimation stagger={150} direction="up" className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredAnimation>
      </div>
    </section>
  );
}
