"use client";
import { getRelativeTime } from "@/app/[locale]/actions/relativeTime";
import { Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface HeaderSection {
  Titile: string;
  CreatedDate: string;
  VerifiedSeller: boolean;
  Member: boolean;
}

const HeaderSection: React.FC<HeaderSection> = ({
  Titile,
  CreatedDate,
  VerifiedSeller,
  Member,
}) => {
  const [isVerified, setisVerified] = React.useState<string>();
  const [isMember, setisMember] = React.useState<string>();
  const [relativeTime, setRelativeTime] = useState(
    getRelativeTime(CreatedDate)
  );
  const t = useTranslations("TopNav");

  

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(CreatedDate));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [CreatedDate]);

  useEffect(() => {
    if (VerifiedSeller) {
      setisVerified(" Verified Seller");
    } else {
      setisVerified("Not Verified Seller");
    }
    if (Member) {
      setisMember("Member");
    } else {
      setisMember("Not a Member");
    }
  }, [VerifiedSeller, Member]);

  return (
    <div className="flex justify-between items-center  pb-4">
      <div className="flex flex-col gap-y-[12px]">
        <div className="min-w-[200px] min-h-[24px] flex gap-x-[12px] ">
          {/* <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-warning100 flex justify-center items-center text-warning800 text-[13px]">
            Featured
          </div> */}
          <div className="px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-danger100 flex justify-center items-center text-danger800 text-[13px]">
            {isMember}
          </div>
          <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-success50 flex justify-center items-center text-success800 text-[13px]">
            {isVerified}
          </div>
        </div>
        <h1 className="text-grayscale900 text-bodylarge text-center md:text-start  lg:text-heading02">
          {Titile}
        </h1>
        <div className="flex justify-between  md:gap-x-[32px] ">
          <div className="flex gap-x-[6px] items-center ">
            <Clock width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodytiny  md:text-bodymedium">
              {relativeTime}
            </h1>
          </div>

          <div className="flex gap-x-[6px] items-center ">
            <Eye width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodytiny  md:text-bodymedium">
              69,656 {t("Viewed")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
