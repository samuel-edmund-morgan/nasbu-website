"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const slides = dict.hero.slides;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-900/60 to-primary-950/80" />

      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-accent-400 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div key={currentSlide} className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slide.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-200 mb-10 max-w-3xl mx-auto">
            {slide.subtitle}
          </p>
          <Link
            href={`/${locale}${slide.ctaHref}`}
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-accent-500/25"
          >
            {slide.ctaText}
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {slides.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide
                  ? "w-8 bg-accent-400"
                  : "w-4 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`${dict.hero.slideLabel} ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
