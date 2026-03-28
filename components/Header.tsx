"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

interface NavItem {
  title: string;
  href: string;
}

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { title: dict.nav.home, href: `/${locale}` },
    { title: dict.nav.about, href: `/${locale}/about` },
    { title: dict.nav.admissions, href: `/${locale}/admissions` },
    { title: dict.nav.education, href: `/${locale}/education` },
    { title: dict.nav.science, href: `/${locale}/science` },
    { title: dict.nav.news, href: `/${locale}/news` },
    { title: dict.nav.contacts, href: `/${locale}/contacts` },
  ];

  const otherLocale = locale === "uk" ? "en" : "uk";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-900/95 backdrop-blur-md border-b border-primary-700/50 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 shrink-0"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              transitionDelay: "0ms",
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-base md:text-lg leading-tight">
                {dict.site.headerLine1}
              </div>
              <div className="text-white font-bold text-base md:text-lg leading-tight">
                {dict.site.headerLine2}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-primary-100 hover:text-white hover:bg-primary-700/50 rounded-lg transition-colors"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-20px)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  transitionDelay: `${(i + 1) * 70}ms`,
                }}
              >
                {item.title}
              </Link>
            ))}
            {/* Language switcher */}
            <Link
              href={switchPath}
              className="ml-3 px-3 py-1.5 text-sm font-medium rounded-lg border border-primary-600 transition-colors hover:bg-primary-700/50"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-20px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                transitionDelay: `${(navItems.length + 1) * 70}ms`,
              }}
            >
              <span className={locale === "uk" ? "text-accent-400 font-bold" : "text-primary-300"}>
                UA
              </span>
              <span className="text-primary-500 mx-1">|</span>
              <span className={locale === "en" ? "text-accent-400 font-bold" : "text-primary-300"}>
                EN
              </span>
            </Link>
          </nav>

          {/* Mobile: lang switcher + toggle */}
          <div
            className="flex items-center gap-2 lg:hidden"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              transitionDelay: "100ms",
            }}
          >
            <Link
              href={switchPath}
              className="px-2 py-1 text-xs font-medium rounded border border-primary-600 transition-colors hover:bg-primary-700/50"
            >
              <span className={locale === "uk" ? "text-accent-400 font-bold" : "text-primary-300"}>
                UA
              </span>
              <span className="text-primary-500 mx-0.5">|</span>
              <span className={locale === "en" ? "text-accent-400 font-bold" : "text-primary-300"}>
                EN
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label={dict.common.menu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-primary-900/98 backdrop-blur-md border-t border-primary-700/50">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-primary-100 hover:text-white hover:bg-primary-700/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
