import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import {
  FlaskConical,
  BookOpen,
  FileText,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Наука",
};

const directions = [
  {
    icon: FlaskConical,
    title: "Кібербезпека та інформаційний захист",
    text: "Розробка методів протидії кіберзагрозам, захист критичної інфраструктури, криптографія",
  },
  {
    icon: BookOpen,
    title: "Правове забезпечення безпеки",
    text: "Дослідження правових аспектів національної безпеки, вдосконалення законодавства",
  },
  {
    icon: Lightbulb,
    title: "Оперативно-розшукова діяльність",
    text: "Методологія та тактика оперативної роботи, аналіз сучасних загроз",
  },
  {
    icon: Users,
    title: "Психологія безпекової діяльності",
    text: "Психологічна підготовка, профвідбір, стресостійкість оперативних працівників",
  },
  {
    icon: TrendingUp,
    title: "Аналітика та прогнозування",
    text: "Методи аналізу інформації, прогнозування загроз, системи підтримки прийняття рішень",
  },
  {
    icon: FileText,
    title: "Військове управління",
    text: "Стратегічне планування, управління силами та засобами в умовах гібридних загроз",
  },
];

const publications = [
  {
    title: "Збірник наукових праць НАСБУ",
    description: "Фахове видання, включене до переліку МОН України",
    frequency: "Виходить 4 рази на рік",
  },
  {
    title: "Вісник Національної академії СБУ",
    description: "Науково-практичний журнал з питань безпеки",
    frequency: "Виходить 2 рази на рік",
  },
  {
    title: "Cyber Security Review",
    description: "Англомовне видання з кібербезпеки",
    frequency: "Виходить 2 рази на рік",
  },
];

export default function SciencePage() {
  return (
    <div className="pt-20">
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Наука
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Наукова діяльність Академії — фундаментальні та прикладні
            дослідження у сфері безпеки
          </p>
        </div>
      </div>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { value: "50+", label: "докторів наук" },
            { value: "120+", label: "кандидатів наук" },
            { value: "300+", label: "публікацій щорічно" },
            { value: "25+", label: "наукових проєктів" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                {s.value}
              </div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <SectionTitle subtitle="Основні напрямки наукових досліджень Академії">
          Наукові напрямки
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((d) => (
            <div
              key={d.title}
              className="p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <d.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">{d.title}</h3>
              <p className="text-sm text-gray-600">{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle="Наукові видання Академії">
          Публікації
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {publications.map((pub) => (
            <div key={pub.title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">{pub.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{pub.description}</p>
              <p className="text-xs text-primary-500">{pub.frequency}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Councils */}
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Спеціалізовані вчені ради
          </h2>
          <p className="text-primary-200 mb-8">
            В Академії діють спеціалізовані вчені ради із захисту дисертацій на
            здобуття наукових ступенів доктора та кандидата наук за
            спеціальностями у сфері національної безпеки, права та
            інформаційної безпеки.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-primary-800/50 rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-400 mb-2">3</div>
              <div className="text-primary-200">
                спеціалізовані вчені ради
              </div>
            </div>
            <div className="bg-primary-800/50 rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-400 mb-2">
                150+
              </div>
              <div className="text-primary-200">захищених дисертацій</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
