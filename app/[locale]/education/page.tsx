import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import {
  BookOpen,
  Monitor,
  Globe,
  FlaskConical,
  Clock,
  Award,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

const featureIcons = [Monitor, Globe, FlaskConical, Clock, Award, BookOpen];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  return { title: dict.education.title };
}

export default async function EducationPage({
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
            src="/images/hero-education.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {dict.education.title}
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            {dict.education.subtitle}
          </p>
        </div>
      </div>

      {/* Programs */}
      <Section>
        <SectionTitle subtitle={dict.education.programsSubtitle}>
          {dict.education.programsTitle}
        </SectionTitle>
        <div className="space-y-8">
          {dict.education.programs.map((prog: { level: string; duration: string; description: string; specialties: string[] }) => (
            <div
              key={prog.level}
              className="border border-gray-200 rounded-xl p-6 md:p-8 hover:border-primary-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary-900">
                    {prog.level}
                  </h3>
                  <p className="text-sm text-primary-500">
                    {dict.education.durationLabel} {prog.duration}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{prog.description}</p>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  {dict.education.specialtiesLabel}
                </div>
                <div className="flex flex-wrap gap-2">
                  {prog.specialties.map((s: string) => (
                    <span
                      key={s}
                      className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle={dict.education.featuresSubtitle}>
          {dict.education.featuresTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.education.features.map((f: { title: string; text: string }, i: number) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={f.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Schedule info */}
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {dict.education.scheduleTitle}
          </h2>
          <p className="text-primary-200 mb-8">
            {dict.education.scheduleText}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {dict.education.scheduleStats.map((s: { value: string; label: string }) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-accent-400 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-primary-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
