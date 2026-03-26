import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, type Locale } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div lang={locale}>
      <Header locale={locale} dict={dict} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
