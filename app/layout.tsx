import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Національна академія Служби безпеки України",
    template: "%s | Національна академія СБУ",
  },
  description:
    "Офіційний вебсайт Національної академії Служби безпеки України — провідного навчального закладу у сфері національної безпеки та оборони.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
