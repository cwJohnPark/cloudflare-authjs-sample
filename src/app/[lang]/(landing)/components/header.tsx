"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dictionary } from "@/lib/i18n/types";

type HeaderProps = {
  dictionary: Dictionary;
};

// 네비게이션 아이템 타입
type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

// 네비게이션 링크 컴포넌트
const NavigationLink = ({
  item,
  className,
  onClick,
}: {
  item: NavigationItem;
  className: string;
  onClick?: () => void;
}) => {
  const baseClasses =
    "text-muted-foreground hover:text-foreground font-medium transition-colors";
  const combinedClasses = `${baseClasses} ${className}`;

  if (item.href.startsWith("#")) {
    return (
      <a href={item.href} className={combinedClasses} onClick={onClick}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={combinedClasses} onClick={onClick}>
      {item.label}
    </Link>
  );
};

export function Header({ dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 딕셔너리를 사용한 네비게이션 아이템들
  const navigationItems: NavigationItem[] = [
    { label: dictionary.landing.navigation.home, href: "/" },
    { label: dictionary.landing.navigation.product, href: "/product" },
    { label: dictionary.landing.navigation.feature, href: "/feature" },
    { label: dictionary.landing.navigation.pricing, href: "/pricing" },
  ];

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

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
                  {dictionary.landing.hero.brandName}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <NavigationLink
                  key={item.label}
                  item={item}
                  className="px-3 py-2 text-sm"
                />
              ))}
            </div>
          </div>

          {/* Sign in Button */}
          <div className="hidden md:block">
            <Button variant="ghost" asChild>
              <Link href="/auth">{dictionary.landing.navigation.signIn}</Link>
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.label}
                item={item}
                className="block px-3 py-2 text-base"
                onClick={handleMobileMenuClose}
              />
            ))}
            <div className="pt-2 pb-3">
              <Button variant="ghost" asChild>
                <Link href="/auth" onClick={handleMobileMenuClose}>
                  {dictionary.landing.navigation.signIn}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
