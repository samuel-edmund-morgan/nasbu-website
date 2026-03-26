import { Metadata } from "next";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Новини",
};

export default function NewsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Новини
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Актуальні події, заходи та досягнення Національної академії СБУ
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}
