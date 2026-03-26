import { Metadata } from "next";
import Section, { SectionTitle } from "@/components/Section";
import { siteConfig } from "@/data/site";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакти",
};

const contacts = [
  {
    icon: MapPin,
    title: "Адреса",
    text: siteConfig.address,
    detail: "Як дістатися: ст. метро «Голосіївська», далі 10 хв пішки",
  },
  {
    icon: Phone,
    title: "Телефон",
    text: siteConfig.phone,
    detail: "Приймальна комісія: +38 (044) 257-33-84",
  },
  {
    icon: Mail,
    title: "Електронна пошта",
    text: siteConfig.email,
    detail: "Приймальна комісія: vstup@nasbu.edu.ua",
  },
  {
    icon: Clock,
    title: "Графік роботи",
    text: siteConfig.workingHours,
    detail: "Субота: 10:00 - 14:00 (приймальна комісія)",
  },
];

export default function ContactsPage() {
  return (
    <div className="pt-20">
      <div className="relative text-white py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Контакти
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl">
            Зв&apos;яжіться з нами — ми завжди готові відповісти на ваші
            запитання
          </p>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <SectionTitle center={false}>Контактна інформація</SectionTitle>
            <div className="space-y-6">
              {contacts.map((c) => (
                <div key={c.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <c.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">
                      {c.title}
                    </h3>
                    <p className="text-gray-700">{c.text}</p>
                    <p className="text-sm text-gray-500">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <SectionTitle center={false}>Написати нам</SectionTitle>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше ім&apos;я
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    placeholder="Введіть ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Електронна пошта
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тема
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    placeholder="Тема повідомлення"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Повідомлення
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none"
                    placeholder="Ваше повідомлення..."
                  />
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-all">
                  <Send size={18} />
                  Надіслати
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section className="!pt-0">
        <div className="aspect-[16/9] md:aspect-[16/6] rounded-xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=500&fit=crop&q=80"
            alt="Розташування Академії"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl max-w-sm mx-4">
              <MapPin className="w-10 h-10 text-primary-500 mx-auto mb-3" />
              <p className="text-primary-900 font-bold text-lg mb-1">
                Наше розташування
              </p>
              <p className="text-sm text-gray-600">
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
