import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google';
import "./globals.css";
import Topnavbar from "./components/navbars/Topnavbar";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Fotter from "./components/Fotter/Fotter";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const revalidate = 1;
const nunitoSans = Nunito_Sans({
  subsets: ['latin'], // Include subsets you need
  weight: ['400', '700'], // Specify font weights you need
  display: 'swap', // Recommended for Google Fonts
});

export const metadata: Metadata = {
  title: "ARZAQ",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const users = {
    id: user?.id ?? "", // Provide a default value
    email: user?.email ?? "", // Provide a default value
    family_name: user?.family_name ?? "", // Provide a default value
    given_name: user?.given_name ?? "", // Provide a default value
    picture: user?.picture ?? "", // Provide a default value
    username: user?.username ?? undefined, // Optional, use undefined if not available
    phone_number: user?.phone_number ?? undefined, // Optional, use undefined if not available
  };

  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir}>
      <body className={`${nunitoSans.className} bg-gray-100`}>
        {" "}
        <NextIntlClientProvider messages={messages}>
          <div className="bg-white ">
            <Topnavbar user={users} />
          </div>
          {children}
          <Analytics />
          <SpeedInsights />
          <Fotter />
        </NextIntlClientProvider>
        <div className="md:hidden fixed bottom-1 left-1/2 transform -translate-x-1/2 z-50 bg-primary500 px-7 mb-4 font-bold py-3 rounded-full text-white">
          <Link
            href={`/${locale}/addform/step01`}
            className="flex items-center gap-x-1"
          >
            <PlusCircle size={22} />
            Post Ad
          </Link>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
