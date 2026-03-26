import Link from "next/link";
import { NewsItem } from "@/data/news";

export default function NewsCard({ item }: { item: NewsItem }) {
  const dateFormatted = new Date(item.date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden bg-primary-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 bg-primary-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {dateFormatted}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <Link
          href={`/news/${item.slug}`}
          className="text-sm font-medium text-accent-600 hover:text-accent-500 transition-colors"
        >
          Читати далі →
        </Link>
      </div>
    </article>
  );
}
