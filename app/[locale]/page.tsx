import Hero from "@/components/Hero";
import Section, { SectionTitle } from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { getLatestNews } from "@/lib/news";
import Link from "next/link";
import {
  Shield,
  GraduationCap,
  BookOpen,
  Globe,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

const featureIcons = [Shield, GraduationCap, BookOpen, Globe];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const latestNews = getLatestNews(3);

  return (
    <>
      <Hero locale={locale} dict={dict} />

      {/* Features */}
      <Section>
        <SectionTitle subtitle={dict.home.featuresSubtitle}>
          {dict.home.featuresTitle}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.home.features.map((f: { title: string; text: string }, i: number) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={f.title}
                className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 group-hover:bg-primary-200 rounded-2xl flex items-center justify-center transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-primary-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* About short */}
      <Section dark>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle light center={false}>
              {dict.home.aboutTitle}
            </SectionTitle>
            <p className="text-primary-200 mb-4 leading-relaxed">
              {dict.home.aboutText1}
            </p>
            <p className="text-primary-200 mb-6 leading-relaxed">
              {dict.home.aboutText2}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              {dict.home.learnMore}
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent-400 mb-1 drop-shadow-lg">
                  30+
                </div>
                <div className="text-primary-100 text-sm font-medium">{dict.home.yearsExperience}</div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-0 sm:-right-4 bg-accent-500 text-primary-950 p-3 sm:p-4 rounded-xl shadow-lg">
              <div className="text-xl sm:text-2xl font-bold">5000+</div>
              <div className="text-xs sm:text-sm font-medium">{dict.home.graduates}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* News */}
      <Section>
        <SectionTitle subtitle={dict.home.newsSubtitle}>
          {dict.home.newsTitle}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((item) => (
            <NewsCard key={item.slug} item={item} locale={locale} readMore={dict.news.readMore} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            {dict.home.allNews}
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-primary-800 to-primary-900 text-white !py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {dict.home.ctaTitle}
          </h2>
          <p className="text-lg text-primary-200 mb-8">
            {dict.home.ctaText}
          </p>
          <Link
            href={`/${locale}/admissions`}
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-accent-500/25"
          >
            {dict.home.ctaButton}
          </Link>
        </div>
      </Section>
    </>
  );
}
