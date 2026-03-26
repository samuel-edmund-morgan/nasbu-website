"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-900/95 backdrop-blur-md border-b border-primary-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/logo.png"
              alt="Логотип"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-base md:text-lg leading-tight">
                Національна академія
              </div>
              <div className="text-white font-bold text-base md:text-lg leading-tight">
                Служби безпеки України
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-primary-100 hover:text-white hover:bg-primary-700/50 rounded-lg transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Меню"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-primary-900/98 backdrop-blur-md border-t border-primary-700/50">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {mainNav.map((item) => (
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
