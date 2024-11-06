import {
  Handshake,
  MapPinLine,
  Package,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import React from "react";

function Details() {
  const t = useTranslations("TopNav");
  return (
    <div className="bg-custom-image min-h-[284px] mb-10  container mx-auto   place-content-center   lg:px-36 xl:px-64 md:px-36 min-w-full   grid grid-cols-2 md:grid-cols-2  lg:grid-cols-2  xl:grid-cols-4 place-items-center md:gap-20 ">
      <div className="md:min-w-[312px] min-h-[84px]  flex space-x-[24px] rtl:gap-[24px] items-center">
        <Package className="    w-[32px]  h-[32px]   md:w-[64px]      md:h-[64px] text-primary500" />
        <div>
          <h1 className="text-grayscalewhite  text-heading03   md:text-heading02">
            95,0K+
          </h1>
          <h1 className=" text-bodymedium  md:text-bodylarge  text-grayscalewhite">
            {t("PulishedAds")}
          </h1>
        </div>
      </div>

      <div className="md:min-w-[312px] min-h-[84px]  flex space-x-[24px] rtl:gap-[24px] items-center">
        <Users className="    w-[32px]  h-[32px]   md:w-[64px]      md:h-[64px] text-primary500" />
        <div>
          <h1 className="text-grayscalewhite  text-heading03   md:text-heading02">
            361K+
          </h1>
          <h1 className=" text-bodymedium  md:text-bodylarge  text-grayscalewhite">
            {t("VerifiedUser")}
          </h1>
        </div>
      </div>

      <div className="md:min-w-[312px] min-h-[84px]  flex space-x-[24px] rtl:gap-[24px] items-center">
        <Handshake className="    w-[32px]  h-[32px]   md:w-[64px]      md:h-[64px] text-primary500" />
        <div>
          <h1 className="text-grayscalewhite  text-heading03   md:text-heading02">
            67K+
          </h1>
          <h1 className=" text-bodymedium  md:text-bodylarge  text-grayscalewhite">
            {t("ProMembers")}
          </h1>
        </div>
      </div>

      <div className="md:min-w-[312px] min-h-[84px]  flex space-x-[24px]  items-center">
        <MapPinLine className="    w-[32px]  h-[32px]   md:w-[64px]      md:h-[64px] text-primary500" />
        <div>
          <h1 className="text-grayscalewhite  text-heading03   md:text-heading02">
            150+
          </h1>
          <h1 className=" text-bodymedium  md:text-bodylarge  text-grayscalewhite">
            {t("CityLocation")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Details;
