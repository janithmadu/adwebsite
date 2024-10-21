import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Topnavbar from "./components/navbars/Topnavbar";
import { I18nextProvider } from "react-i18next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import Fotter from "./components/Fotter/Fotter";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "@/components/ui/toaster"




export const revalidate = 1;
const inter = Nunito_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "GShop",
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

  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.className}`}>
        {" "}
        <NextIntlClientProvider messages={messages}>
          <div className="">
            <Topnavbar user={user} />
          </div>
          {children}
          <Fotter />
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
