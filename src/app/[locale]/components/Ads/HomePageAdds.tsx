import React from "react";
import { useTranslations } from "next-intl";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AdCard from "./AdCard";
import Link from "next/link";
import { cookies } from "next/headers";
import { PostAd } from "@/lib/categoryInterface";
import { ProfileAdCard } from "../ProfileComponets/ProfileAdCard";
export const revalidate = 1;

interface Ads {
  Ads: PostAd[];
}

const HomePageAdds: React.FC<Ads> = ({ Ads }) => {
  const t = useTranslations("TopNav");
  const cookieStore = cookies();
  const locale: string = cookieStore.get("NEXT_LOCALE")?.value || "en";

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
      <div className="  relative container mx-auto  grid grid-cols-1   lg:grid-cols-1 xl:grid-cols-1  2xl:grid-cols-2 md:gap-x-16     2xl:gap-x-1  gap-y-3  place-items-center   ">
        {Ads.map((item: PostAd, index: number) => (
          <div className=" relative min-w-full md:min-w-fit" key={index}>
            <ProfileAdCard
              category={item.category.title[(locale as "en") || "ar"]}
              price={item.price}
              image={item.image[0].url || "/"}
              title={item.adName}
              adprice={item.price}
              id={item._id}
              key={item._id}
              timestamp={item._createdAt}
              timedate={true}
            />
          </div>
        ))}
      </div>
      {/* Main Grid End */}
      <div className="min-w-full flex justify-center items-center">
        <Link
          href={`${locale}/ads?page=1`}
          className="flex space-x-[8px] items-center min-w-[144px] min-h-[50px] bg-primary500 justify-center text-heading04 text-grayscalewhite rounded-[4px] rtl:flex-row-reverse transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
        >
          <h1>{t("ViewAllButtion")}</h1>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HomePageAdds;
