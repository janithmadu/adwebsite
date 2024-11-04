"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "@phosphor-icons/react";
import Link from "next/link";
import { PostAd } from "@/lib/categoryInterface";
export const revalidate = 1;

// Helper function to get a cookie
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

interface AdCardProps {
  GetAds: PostAd;
}

const AdCard: React.FC<AdCardProps> = ({ GetAds }) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const cookieLocale = (getCookie("NEXT_LOCALE") as "en" | "ar") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {});

  return (
    <Link href={`/${locale}/ads/${GetAds?._id}`}>
      <div className="min-w-[270px] lg:min-w-[290px] xl:max-w-[200px] min-h-[392px] bg-grayscalewhite drop-shadow rounded-[8px]">
        <div className="min-w-[270px] lg:min-w-[290px] xl:max-w-[200px] min-h-[250px] flex flex-col space-y-[16px]">
          <div>
            <Image
              alt="AdImage"
              width={200}
              height={220}
              src={GetAds?.photos[0]?.asset?.url || ""} // Fallback image URL
              className="min-w-full h-[220px] rounded-t-[8px]"
            />
          </div>
          <div className="min-h-[124px]">
            <div className="min-w-full flex flex-col min-h-[73px] px-[20px] border-b border-grayscale50">
              <div className="flex flex-col space-y-[8px]">
                <h1 className="text-bodysmall text-grayscale500">
                  {locale === "ar"
                    ? GetAds.category.title.ar
                    : GetAds.category.title.en}
                </h1>
                <h1 className="text-bodymedium text-grayscale900">
                  {GetAds.adName}
                </h1>
              </div>
            </div>
            <div className="min-w-full flex min-h-[56px] px-[20px] justify-between items-center">
              <div className="flex space-x-[4px] items-center">
                <MapPin className="text-success500" />
                <h1 className="text-grayscale500 text-bodysmall">
                  {GetAds.state}
                </h1>
              </div>
              <div>
                <h1 className="text-bodymedium text-danger500">
                  {GetAds.currency} {GetAds.price}.0000
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
