import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import {
  FlaskConical,
  BookOpen,
  FileText,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

const directionIcons = [FlaskConical, BookOpen, Lightbulb, Users, TrendingUp, FileText];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  return { title: dict.science.title };
}

export default async function SciencePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="pt-20">
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {dict.science.title}
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            {dict.science.subtitle}
          </p>
        </div>
      </div>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {dict.science.stats.map((s: { value: string; label: string }) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                {s.value}
              </div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <SectionTitle subtitle={dict.science.directionsSubtitle}>
          {dict.science.directionsTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.science.directions.map((d: { title: string; text: string }, i: number) => {
            const Icon = directionIcons[i];
            return (
              <div
                key={d.title}
                className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2">{d.title}</h3>
                <p className="text-sm text-gray-600">{d.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Publications */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle={dict.science.publicationsSubtitle}>
          {dict.science.publicationsTitle}
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {dict.science.publications.map((pub: { title: string; description: string; frequency: string }) => (
            <div key={pub.title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">{pub.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{pub.description}</p>
              <p className="text-xs text-primary-500">{pub.frequency}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Councils */}
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {dict.science.councilsTitle}
          </h2>
          <p className="text-primary-200 mb-8">
            {dict.science.councilsText}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {dict.science.councilsStats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="bg-primary-800/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-accent-400 mb-2">{s.value}</div>
                <div className="text-primary-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
