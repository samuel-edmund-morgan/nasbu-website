import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Національна академія Служби безпеки України",
    template: "%s | Національна академія СБУ",
  },
  description:
    "Офіційний вебсайт Національної академії Служби безпеки України — провідного навчального закладу у сфері національної безпеки та оборони.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${montserrat.variable} font-sans`}>{children}</body>
    </html>
  );
}
