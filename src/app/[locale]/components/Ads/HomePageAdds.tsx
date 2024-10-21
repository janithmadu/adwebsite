import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AdImage from "@/app/[locale]/public/Image.png";
import {
  ArrowRight,
  LockLaminatedOpen,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import AdCard from "./AdCard";
import Link from "next/link";
import { cookies } from "next/headers";
export const revalidate = 1;
function HomePageAdds(Ads: any) {
  const t = useTranslations("TopNav");
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3 ">
      {" "}
      {/* Heading */}
      <div>
        <h1 className=" text-heading03 md:text-heading01 font-bold text-center">
          {" "}
          {t("HomePageProductSectionHeading")}
        </h1>
      </div>
      {/* Heading End*/}
      {/* Main Grid */}
      <div className="   lg:max-w-[920px]  xl:min-w-[1120px] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 md:gap-x-16  lg:gap-x-20  xl:gap-x-24 2xl:gap-x-[234px]  gap-y-3  place-items-center   ">
        {Ads.Ads.map((item: any, index: number) => (
          <AdCard GetAds={item} />
        ))}
      </div>
      {/* Main Grid End */}
      <div className="min-w-full flex justify-center items-center">
        <Link
          href={locale + "/ads?page=1"}
          className="flex space-x-[8px] items-center min-w-[144px] min-h-[50px] bg-primary500 justify-center text-heading04 text-grayscalewhite rounded-[4px] rtl:flex-row-reverse"
        >
          <h1>View Alls</h1>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default HomePageAdds;
