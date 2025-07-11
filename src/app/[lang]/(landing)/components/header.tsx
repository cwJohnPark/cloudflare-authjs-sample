"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderProps = {
  onNavigate: (url: string) => void;
};

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <BrainCircuit className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Aioneers
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Product
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Feature
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Log in Button */}
          <div className="hidden md:block">
            <Button variant="ghost" onClick={() => onNavigate("/auth")}>
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t ">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium"
            >
              Product
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium"
            >
              Feature
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium"
            >
              Pricing
            </a>
            <div className="pt-2 pb-3">
              <Button variant="ghost" onClick={() => onNavigate("/auth")}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
