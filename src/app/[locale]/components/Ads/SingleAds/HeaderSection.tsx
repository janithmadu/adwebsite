"use client";
import { Clock, Eye } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect } from "react";

function HeaderSection({ Titile, CreatedDate, VerifiedSeller, Member }: any) {
  const [isVerified, setisVerified] = React.useState<string>();
  const [isMember, setisMember] = React.useState<string>();

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
        <div className="min-w-[300px] min-h-[24px] flex gap-x-[12px] ">
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
        <h1 className="text-grayscale900 text-heading02">{Titile}</h1>
        <div className="flex gap-x-[32px] ">
          <div className="flex gap-x-[6px] items-center ">
            <Clock width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodymedium">{CreatedDate}</h1>
          </div>

          <div className="flex gap-x-[6px] items-center ">
            <Eye width={24} height={24} className="text-grayscale500" />
            <h1 className="text-grayscale500 text-bodymedium">69,656 Viewed</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
