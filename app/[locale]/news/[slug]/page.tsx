import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import { news } from "@/data/news";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

interface Props {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return news.flatMap((item) =>
    locales.map((locale) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const item = news.find((n) => n.slug === params.slug);
  if (!item) return { title: dict.news.singleTitle };
  const title = locale === "en" ? item.title_en : item.title_uk;
  return { title };
}

export default async function NewsArticle({ params }: Props) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const item = news.find((n) => n.slug === params.slug);
  if (!item) return notFound();

  const title = locale === "en" ? item.title_en : item.title_uk;
  const content = locale === "en" ? item.content_en : item.content_uk;
  const dateLocale = locale === "en" ? "en-GB" : "uk-UA";

  const dateFormatted = new Date(item.date).toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pt-20">
      {/* Hero with image */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/85 to-primary-800/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {dict.news.backToNews}
          </Link>
          <div className="text-sm text-primary-300 mb-3">{dateFormatted}</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>

      <Section>
        <article className="max-w-4xl mx-auto prose prose-lg prose-gray">
          {content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                  {items.map((li, j) => (
                    <li key={j} className="text-gray-700">
                      {li.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </article>
      </Section>
    </div>
  );
}
