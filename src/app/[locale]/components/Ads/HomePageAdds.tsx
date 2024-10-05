import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AdImage from "@/app/[locale]/public/Image.png";
import { LockLaminatedOpen, MapPin } from "@phosphor-icons/react/dist/ssr";
import AdCard from "./AdCard";
export const revalidate = 1;
function HomePageAdds(Ads:any) {
  const t = useTranslations("TopNav");

  
  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 mb-3 ">
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
      <div className="   lg:max-w-[920px]  xl:min-w-[1120px] grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4 md:gap-x-16  lg:gap-x-20  xl:gap-x-24 gap-y-3  ">
       {Ads.Ads.map((item: any, index: number) => (
        <AdCard  GetAds={item}/>
       ))}
      </div>
      {/* Main Grid End */}
    </div>
  );
}

export default HomePageAdds;
