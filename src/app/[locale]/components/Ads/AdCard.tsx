import React from "react";
import AdImage from "@/app/[locale]/public/Image.png";
import Image from "next/image";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
export const revalidate = 1;
function AdCard(GetAds: any) {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  console.log(GetAds.GetAds.Currency);
  return (
    <div className=" min-w-[270px]  lg:min-w-[290px] xl:max-w-[200px] min-h-[392px]  bg-grayscalewhite drop-shadow rounded-[8px]">
      <div className=" min-w-[270px]  lg:min-w-[290px] xl:max-w-[200px] min-h-[250px] flex flex-col space-y-[16px]">
        <div>
          <Image
            alt="AdImage"
            width={200}
            height={0}
            src={GetAds?.GetAds.photos[0].asset.url}
            className="min-w-full max-h-[220px]"
          />
        </div>
        <div className=" min-h-[124px]">
          <div className="min-w-full flex flex-col min-h-[73px] px-[20px]  border-b  border-grayscale50">
            <div className="flex flex-col space-y-[8px] ">
              <h1 className="text-bodysmall text-grayscale500">
                {GetAds.GetAds.category.title[locale]}
              </h1>

              <h1 className="text-bodymedium text-grayscale900">
                {GetAds.GetAds.adName}
              </h1>
            </div>
          </div>
          <div className="min-w-full flex  min-h-[56px] px-[20px] justify-between items-center  ">
            <div className="flex space-x-[4px] items-center">
              <MapPin className="text-success500" />
              <h1 className="text-grayscale500 text-bodysmall">{GetAds.GetAds.state}</h1>
            </div>
            <div>
              <h1 className="text-bodymedium text-danger500">{GetAds.GetAds.Currency} 80.00</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdCard;