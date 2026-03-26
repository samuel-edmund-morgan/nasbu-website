import Link from "next/link";
import { NewsItem } from "@/lib/news";
import type { Locale } from "@/i18n/locales";

export default function NewsCard({
  item,
  locale,
  readMore,
}: {
  item: NewsItem;
  locale: Locale;
  readMore: string;
}) {
  const title = locale === "en" && item.title_en ? item.title_en : item.title_uk;
  const excerpt = locale === "en" && item.excerpt_en ? item.excerpt_en : item.excerpt_uk;
  const dateLocale = locale === "en" ? "en-GB" : "uk-UA";

  const dateFormatted = new Date(item.date).toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imageUrl = item.image
    ? `/uploads/${item.image}`
    : null;

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden bg-primary-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 bg-primary-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {dateFormatted}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        <Link
          href={`/${locale}/news/${item.slug}`}
          className="text-sm font-medium text-accent-600 hover:text-accent-500 transition-colors"
        >
          {readMore} &rarr;
        </Link>
      </div>
    </article>
  );
}
