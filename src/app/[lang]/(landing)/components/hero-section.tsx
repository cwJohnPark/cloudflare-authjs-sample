"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Dashboard appears after all text animations complete
    const dashboardTimer = setTimeout(() => {
      setShowDashboard(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(dashboardTimer);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-background to-accent/20 pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left">
              {/* Logo and Brand */}
              <div
                className={`flex items-center justify-center lg:justify-start mb-8 hero-text-animate ${isVisible ? "animate" : ""}`}
              >
                <BrainCircuit className="w-12 h-12 text-primary mr-4" />
                <h1 className="text-4xl font-bold text-foreground">Aioneers</h1>
              </div>

              {/* Main Headline */}
              <div className="staggered-container">
                <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Build the future
                </h2>
                <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  with AI-powered
                </h2>
                <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
                  solutions
                </h2>
              </div>

              {/* Description */}
              <div className="staggered-container mt-8">
                <p className="text-xl text-muted-foreground mb-4">
                  Accelerate your AI development with our
                </p>
                <p className="text-xl text-muted-foreground mb-4">
                  comprehensive platform of pre-trained models,
                </p>
                <p className="text-xl text-muted-foreground mb-8">
                  powerful APIs, and enterprise-grade infrastructure.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="staggered-container">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="staggered-container mt-12">
                <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">10M+</div>
                    <div className="text-muted-foreground">
                      AI Models Deployed
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-primary">50ms</div>
                    <div className="text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div
              className={`dashboard-preview-container ${showDashboard ? "animate" : ""}`}
              style={{
                opacity: showDashboard ? 1 : 0,
                transform: showDashboard
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.95)",
                transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Trigger staggered animations */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(() => {
              document.querySelectorAll('.staggered-container').forEach(container => {
                container.classList.add('animate');
              });
            }, 500);
          `,
        }}
      />
    </div>
  );
}
