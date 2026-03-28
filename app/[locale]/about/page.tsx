import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import HistoryBookshelf from "@/components/HistoryBookshelf";
import {
  Target,
  BookOpen,
  Users,
  Building2,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

const missionIcons = [Target, BookOpen, Users];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  return { title: dict.about.title };
}

export default async function AboutPage({
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
            src="/images/hero-about.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {dict.about.title}
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            {dict.about.subtitle}
          </p>
        </div>
      </div>

      {/* Mission */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle center={false}>{dict.about.missionTitle}</SectionTitle>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {dict.about.missionText1}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {dict.about.missionText2}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {dict.about.missionText3}
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="/images/about-mission.jpg"
                alt=""
                className="w-full h-44 object-cover"
                loading="lazy"
              />
            </div>
            {dict.about.missionCards.map((item: { title: string; text: string }, i: number) => {
              const Icon = missionIcons[i];
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-xl bg-primary-50"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section dark>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {dict.about.stats.map((s: { value: string; label: string }) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-2">
                {s.value}
              </div>
              <div className="text-primary-200">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* History timeline - bookshelf */}
      <Section>
        <SectionTitle subtitle={dict.about.historySubtitle}>
          {dict.about.historyTitle}
        </SectionTitle>
        <HistoryBookshelf milestones={dict.about.milestones} />
      </Section>

      {/* Structure */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle={dict.about.structureSubtitle}>
          {dict.about.structureTitle}
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.about.departments.map((name: string) => (
            <div
              key={name}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
            >
              <Building2 className="w-5 h-5 text-primary-500 shrink-0" />
              <span className="text-sm font-medium text-primary-900">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
