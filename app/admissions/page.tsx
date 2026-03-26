import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import Link from "next/link";
import {
  FileText,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Вступникам",
};

const steps = [
  {
    icon: FileText,
    title: "Подання документів",
    text: "Подайте заяву та необхідний пакет документів до приймальної комісії",
  },
  {
    icon: ClipboardCheck,
    title: "Проходження перевірки",
    text: "Пройдіть спеціальну перевірку та медичний огляд",
  },
  {
    icon: Calendar,
    title: "Вступні випробування",
    text: "Складіть вступні іспити та пройдіть тестування фізичної підготовки",
  },
  {
    icon: GraduationCap,
    title: "Зарахування",
    text: "За результатами конкурсного відбору зарахування до Академії",
  },
];

const requirements = [
  "Громадянство України",
  "Вік від 17 до 25 років (для бакалаврату)",
  "Повна загальна середня освіта",
  "Придатність до військової служби за станом здоров'я",
  "Відсутність судимості",
  "Успішне проходження спеціальної перевірки",
  "Сертифікати ЗНО/НМТ з обов'язкових предметів",
];

const specialties = [
  {
    code: "081",
    name: "Право",
    degree: "Бакалавр / Магістр",
    duration: "4 / 1.5 роки",
  },
  {
    code: "125",
    name: "Кібербезпека",
    degree: "Бакалавр / Магістр",
    duration: "4 / 1.5 роки",
  },
  {
    code: "256",
    name: "Національна безпека",
    degree: "Магістр",
    duration: "1.5 роки",
  },
  {
    code: "262",
    name: "Правоохоронна діяльність",
    degree: "Бакалавр / Магістр",
    duration: "4 / 1.5 роки",
  },
  {
    code: "253",
    name: "Військове управління",
    degree: "Магістр",
    duration: "1.5 роки",
  },
  {
    code: "113",
    name: "Прикладна математика",
    degree: "Бакалавр",
    duration: "4 роки",
  },
];

export default function AdmissionsPage() {
  return (
    <div className="pt-20">
      {/* Hero banner */}
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Вступникам
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Інформація для абітурієнтів — умови вступу, спеціальності та етапи
            вступної кампанії 2026 року
          </p>
        </div>
      </div>

      {/* Steps */}
      <Section>
        <SectionTitle subtitle="Як стати курсантом Національної академії СБУ">
          Етапи вступу
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="bg-primary-50 rounded-xl p-6 h-full">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center mb-4 font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-gray-50">
        <SectionTitle subtitle="Основні вимоги до кандидатів на вступ">
          Вимоги до вступників
        </SectionTitle>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Specialties */}
      <Section>
        <SectionTitle subtitle="Спеціальності, за якими здійснюється підготовка">
          Спеціальності
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((spec) => (
            <div
              key={spec.code}
              className="border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="text-xs font-mono text-primary-500 mb-1">
                {spec.code}
              </div>
              <h3 className="font-bold text-primary-900 text-lg mb-3">
                {spec.name}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Ступінь:</span> {spec.degree}
                </div>
                <div>
                  <span className="font-medium">Термін:</span> {spec.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Important dates */}
      <Section dark>
        <SectionTitle light subtitle="Ключові дати вступної кампанії 2026">
          Важливі дати
        </SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { date: "1 березня", event: "Початок прийому документів" },
            { date: "1 червня", event: "Завершення прийому документів" },
            { date: "15-30 червня", event: "Вступні випробування" },
            { date: "15 липня", event: "Оголошення результатів" },
          ].map((item) => (
            <div key={item.date} className="text-center p-4">
              <div className="text-2xl font-bold text-accent-400 mb-2">
                {item.date}
              </div>
              <div className="text-sm text-primary-200">{item.event}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            Маєте питання?
          </h2>
          <p className="text-gray-600 mb-6">
            Зв&apos;яжіться з приймальною комісією для отримання детальної
            інформації
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Контакти приймальної комісії
          </Link>
        </div>
      </Section>
    </div>
  );
}
