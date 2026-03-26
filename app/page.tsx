import Hero from "@/components/Hero";
import Section, { SectionTitle } from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/news";
import Link from "next/link";
import {
  Shield,
  GraduationCap,
  BookOpen,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Безпека держави",
    text: "Підготовка висококваліфікованих фахівців у сфері національної безпеки та оборони",
  },
  {
    icon: GraduationCap,
    title: "Сучасна освіта",
    text: "Навчальні програми, що відповідають найвищим міжнародним стандартам",
  },
  {
    icon: BookOpen,
    title: "Наукова діяльність",
    text: "Фундаментальні та прикладні дослідження в галузі безпеки",
  },
  {
    icon: Globe,
    title: "Міжнародна співпраця",
    text: "Партнерство з провідними навчальними закладами світу",
  },
];

export default function HomePage() {
  const latestNews = news.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Features */}
      <Section>
        <SectionTitle subtitle="Чому варто обрати Національну академію СБУ">
          Наші переваги
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 group-hover:bg-primary-200 rounded-2xl flex items-center justify-center transition-colors">
                <f.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About short */}
      <Section dark>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle light center={false}>
              Про академію
            </SectionTitle>
            <p className="text-primary-200 mb-4 leading-relaxed">
              Національна академія Служби безпеки України є головним вищим
              навчальним закладом у системі СБУ. Академія здійснює підготовку,
              перепідготовку та підвищення кваліфікації фахівців для потреб
              Служби безпеки України.
            </p>
            <p className="text-primary-200 mb-6 leading-relaxed">
              Заснована як провідний центр безпекової освіти, Академія
              забезпечує фундаментальну теоретичну підготовку та набуття
              практичних навичок, необхідних для ефективної діяльності в сфері
              захисту державних інтересів.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              Дізнатися більше
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&q=80"
                alt="Академія"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent-400 mb-1 drop-shadow-lg">
                  30+
                </div>
                <div className="text-primary-100 text-sm font-medium">років досвіду</div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-0 sm:-right-4 bg-accent-500 text-primary-950 p-3 sm:p-4 rounded-xl shadow-lg">
              <div className="text-xl sm:text-2xl font-bold">5000+</div>
              <div className="text-xs sm:text-sm font-medium">випускників</div>
            </div>
          </div>
        </div>
      </Section>

      {/* News */}
      <Section>
        <SectionTitle subtitle="Актуальні події та заходи академії">
          Останні новини
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Усі новини
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-primary-800 to-primary-900 text-white !py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Готовий стати частиною еліти?
          </h2>
          <p className="text-lg text-primary-200 mb-8">
            Розпочни свій шлях до професійної кар&apos;єри у сфері національної
            безпеки
          </p>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-accent-500/25"
          >
            Умови вступу
          </Link>
        </div>
      </Section>
    </>
  );
}
