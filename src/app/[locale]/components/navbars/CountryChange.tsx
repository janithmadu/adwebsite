"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Image from "next/image";

function CountryChange() {
  const router = useRouter(); // Provides programmatic navigation
  const pathname = usePathname(); // Get the current path (e.g., /en/ads)
  const searchParams = useSearchParams(); // Get the current query parameters (e.g., ?id=1)

  const languages: any = [
    { code: "en", label: "English", Image: UKflag },
    { code: "ar", label: "عربي", Image: Arab },
  ];

  const handleLanguageSwitch = (locale: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove the current locale (assuming it's the first segment) and replace it with the new one
    const segments = pathname.split("/");
    
    // If the first segment is a language code (like 'en' or 'ar'), replace it with the new locale
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = locale;
    } else {
      // If there's no locale in the path, just add it
      segments.unshift(locale);
    }

    // Construct the new URL with the updated locale
    const newPath = segments.join("/");

    // Push the new URL, preserving the current query params
    router.push(`${newPath}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-5 rtl:gap-10">
      {languages.map((language: any) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSwitch(language.code)}
          className="flex items-center gap-2 rtl:gap-2"
        >
          <Image
            className="rounded-full"
            width={25}
            src={language.Image}
            alt={language.label}
          />
          {language.label}
        </button>
      ))}
    </div>
  );
}

export default CountryChange;
