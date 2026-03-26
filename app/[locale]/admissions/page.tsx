import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import Link from "next/link";
import {
  CheckCircle,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  return { title: dict.admissions.title };
}

export default async function AdmissionsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {dict.admissions.title}
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            {dict.admissions.subtitle}
          </p>
        </div>
      </div>

      {/* Steps */}
      <Section>
        <SectionTitle subtitle={dict.admissions.stepsSubtitle}>
          {dict.admissions.stepsTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.admissions.steps.map((step: { title: string; text: string }, i: number) => {
            return (
              <div key={step.title} className="relative">
                <div className="bg-primary-50 rounded-xl p-6 h-full">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center mb-4 font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-primary-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle={dict.admissions.requirementsSubtitle}>
          {dict.admissions.requirementsTitle}
        </SectionTitle>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              {dict.admissions.requirements.map((req: string) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Specialties */}
      <Section>
        <SectionTitle subtitle={dict.admissions.specialtiesSubtitle}>
          {dict.admissions.specialtiesTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.admissions.specialties.map((spec: { code: string; name: string; degree: string; duration: string }) => (
            <div
              key={spec.code}
              className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="text-xs font-mono text-primary-500 mb-1">
                {spec.code}
              </div>
              <h3 className="font-bold text-primary-900 text-lg mb-3">
                {spec.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{dict.admissions.degreeLabel}</span> {spec.degree}
                </div>
                <div>
                  <span className="font-medium">{dict.admissions.durationLabel}</span> {spec.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Important dates */}
      <Section dark>
        <SectionTitle light subtitle={dict.admissions.datesSubtitle}>
          {dict.admissions.datesTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {dict.admissions.dates.map((item: { date: string; event: string }) => (
            <div key={item.date} className="text-center p-4">
              <div className="text-2xl font-bold text-accent-400 mb-2">
                {item.date}
              </div>
              <div className="text-sm text-primary-200">{item.event}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            {dict.admissions.ctaTitle}
          </h2>
          <p className="text-gray-600 mb-6">
            {dict.admissions.ctaText}
          </p>
          <Link
            href={`/${locale}/contacts`}
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            {dict.admissions.ctaButton}
          </Link>
        </div>
      </Section>
    </div>
  );
}
