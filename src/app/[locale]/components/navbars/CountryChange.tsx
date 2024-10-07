"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UKflag from "../../../../../public/uk.png";
import Arab from "../../../../../public/arab.png";
import Link from "next/link";
import Image from "next/image";

function CountryChange() {
  const t = useTranslations("TopNav");
  const router = useRouter(); // Provides programmatic navigation
  const pathname = usePathname(); // Get the current path (e.g., /about)
  const searchParams = useSearchParams(); // Get the current query parameters (e.g., ?id=1)

  const languages: any = [
    { code: "en", label: "English", Image: UKflag },
    { code: "ar", label: "عربي", Image: Arab },
  ];

  const handleLanguageSwitch = (locale: string) => {
    // Preserve the query params when switching language
    const params = new URLSearchParams(searchParams.toString());

    // Push a new route with the new locale
    router.push(`${locale}`);
  };

  return (
    <div className="flex items-center space-x-5 rtl:gap-10">
      {languages.map((language: any) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSwitch(language.code)}
          className="flex items-center  gap-2 rtl:gap-2"
        >
          <Image
            className="rounded-full"
            width={25}
            src={language.Image}
            alt="UK"
          />
          {language.label}
        </button>
      ))}
    </div>
  );
}

export default CountryChange;
