"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const navItems = [
    { title: dict.nav.home, href: `/${locale}` },
    { title: dict.nav.about, href: `/${locale}/about` },
    { title: dict.nav.admissions, href: `/${locale}/admissions` },
    { title: dict.nav.education, href: `/${locale}/education` },
    { title: dict.nav.science, href: `/${locale}/science` },
    { title: dict.nav.news, href: `/${locale}/news` },
    { title: dict.nav.contacts, href: `/${locale}/contacts` },
  ];

  return (
    <footer className="bg-primary-950 text-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <div className="text-white font-bold text-base leading-tight">
                  {dict.site.headerLine1}
                </div>
                <div className="text-white font-bold text-base leading-tight">
                  {dict.site.headerLine2}
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-300 max-w-md leading-relaxed">
              {dict.site.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">{dict.common.navigation}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-300 hover:text-accent-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">{dict.common.contacts}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="shrink-0 mt-0.5 text-accent-400" />
                <span>{dict.site.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="shrink-0 text-accent-400" />
                <span>{dict.site.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="shrink-0 text-accent-400" />
                <span>{dict.site.email}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Clock size={16} className="shrink-0 text-accent-400" />
                <span>{dict.site.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-xs text-primary-400">
          &copy; {new Date().getFullYear()} {dict.site.name}. {dict.common.allRights}
        </div>
      </div>
    </footer>
  );
}
