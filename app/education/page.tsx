import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import {
  BookOpen,
  Monitor,
  Globe,
  FlaskConical,
  Clock,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Навчання",
};

const programs = [
  {
    level: "Бакалавр",
    duration: "4 роки",
    description:
      "Перший рівень вищої освіти. Фундаментальна теоретична та практична підготовка.",
    specialties: [
      "Право",
      "Кібербезпека",
      "Правоохоронна діяльність",
      "Прикладна математика",
    ],
  },
  {
    level: "Магістр",
    duration: "1,5 роки",
    description:
      "Другий рівень вищої освіти. Поглиблена спеціалізація та науково-дослідна робота.",
    specialties: [
      "Право",
      "Кібербезпека",
      "Національна безпека",
      "Правоохоронна діяльність",
      "Військове управління",
    ],
  },
  {
    level: "Доктор філософії (PhD)",
    duration: "4 роки",
    description:
      "Третій рівень вищої освіти. Наукова діяльність та захист дисертації.",
    specialties: [
      "Національна безпека",
      "Право",
      "Інформаційна безпека",
    ],
  },
];

const features = [
  {
    icon: Monitor,
    title: "Сучасне обладнання",
    text: "Комп'ютерні лабораторії, симулятори, полігони та спеціалізовані класи",
  },
  {
    icon: Globe,
    title: "Мовна підготовка",
    text: "Поглиблене вивчення англійської та інших іноземних мов",
  },
  {
    icon: FlaskConical,
    title: "Практична спрямованість",
    text: "Стажування, навчальні практики та участь у реальних операціях",
  },
  {
    icon: Clock,
    title: "Гнучкий розклад",
    text: "Денна та заочна форми навчання для різних категорій курсантів",
  },
  {
    icon: Award,
    title: "Визнані дипломи",
    text: "Дипломи державного зразка, визнані в Україні та за кордоном",
  },
  {
    icon: BookOpen,
    title: "Бібліотека та ресурси",
    text: "Сучасна бібліотека з доступом до міжнародних наукових баз даних",
  },
];

export default function EducationPage() {
  return (
    <div className="pt-20">
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Навчання
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Освітні програми, що формують професіоналів найвищого рівня у сфері
            національної безпеки
          </p>
        </div>
      </div>

      {/* Programs */}
      <Section>
        <SectionTitle subtitle="Рівні вищої освіти в Академії">
          Освітні програми
        </SectionTitle>
        <div className="space-y-8">
          {programs.map((prog) => (
            <div
              key={prog.level}
              className="border border-gray-200 rounded-xl p-6 md:p-8 hover:border-primary-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary-900">
                    {prog.level}
                  </h3>
                  <p className="text-sm text-primary-500">
                    Тривалість: {prog.duration}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{prog.description}</p>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Спеціальності:
                </div>
                <div className="flex flex-wrap gap-2">
                  {prog.specialties.map((s) => (
                    <span
                      key={s}
                      className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle="Що забезпечує якість освіти в Академії">
          Переваги навчання
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Schedule info */}
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Навчальний процес
          </h2>
          <p className="text-primary-200 mb-8">
            Навчання організовано відповідно до стандартів вищої військової
            освіти. Курсанти поєднують теоретичну підготовку з практичними
            заняттями, фізичною підготовкою та стройовою підготовкою.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "6", label: "годин лекцій на день" },
              { value: "2", label: "години фізпідготовки" },
              { value: "12", label: "тижнів практики на рік" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-accent-400 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-primary-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
