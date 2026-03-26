import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import HistoryBookshelf from "@/components/HistoryBookshelf";
import {
  Target,
  BookOpen,
  Users,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Про академію",
};

const stats = [
  { value: "30+", label: "років досвіду" },
  { value: "5000+", label: "випускників" },
  { value: "200+", label: "викладачів" },
  { value: "15+", label: "спеціальностей" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Про академію
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Національна академія СБУ — провідний навчальний заклад у системі
            Служби безпеки України
          </p>
        </div>
      </div>

      {/* Mission */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle center={false}>Наша місія</SectionTitle>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Національна академія Служби безпеки України є головним вищим
              військовим навчальним закладом у системі СБУ, що здійснює
              підготовку, перепідготовку та підвищення кваліфікації кадрів для
              Служби безпеки України.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Академія забезпечує здобуття вищої освіти на першому
              (бакалаврському) та другому (магістерському) рівнях, а також
              наукових ступенів доктора філософії та доктора наук.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Діяльність Академії спрямована на формування висококваліфікованих
              фахівців, здатних ефективно захищати національні інтереси в
              умовах сучасних загроз та викликів.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700&h=360&fit=crop&q=80"
                alt="Академія"
                className="w-full h-44 object-cover"
                loading="lazy"
              />
            </div>
            {[
              {
                icon: Target,
                title: "Мета",
                text: "Підготовка професіоналів найвищого рівня для системи національної безпеки",
              },
              {
                icon: BookOpen,
                title: "Освіта",
                text: "Бакалаврські, магістерські та докторські програми",
              },
              {
                icon: Users,
                title: "Кадри",
                text: "Понад 200 висококваліфікованих науково-педагогічних працівників",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl bg-primary-50"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section dark>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
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
        <SectionTitle subtitle="Ключові віхи розвитку академії">
          Наша історія
        </SectionTitle>
        <HistoryBookshelf />
      </Section>

      {/* Structure */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle="Основні структурні підрозділи академії">
          Структура
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Інститут підготовки кадрів",
            "Інститут перепідготовки та підвищення кваліфікації",
            "Інститут інформаційної безпеки",
            "Науково-дослідний центр",
            "Кафедра кібербезпеки",
            "Кафедра права та правоохоронної діяльності",
            "Кафедра оперативно-розшукової діяльності",
            "Кафедра іноземних мов",
            "Кафедра фізичної підготовки",
          ].map((name) => (
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
