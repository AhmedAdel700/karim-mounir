import "../styles/globals.css";
import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";
import { ViewTransitions } from "next-view-transitions";
import ScrollProvider from "../components/ScrollProvider";
import ModernCursor from "../components/ModernCursor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Karim Mounir",
  description: "Karim Mounir For Interior Design",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <ViewTransitions>
      <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
        <body
          className={`${
            locale === "ar" ? ibmPlexArabic.variable : montserrat.variable
          } antialiased`}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ModernCursor />
            <Header />
            <ScrollProvider>{children}</ScrollProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
