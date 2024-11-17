import Image from "next/image";
import React from "react";
import MobileAppI from "../../../../../public/Group 241.png";
import AppStore from "../../../../../public/App Store.png";
import AppStore1 from "../../../../../public/App Store (1).png";
import { useTranslations } from "next-intl";
function MobileApp() {
  const t = useTranslations("TopNav");
  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 mb-3">
      <div className="flex  justify-center items-center lg:items-start  lg:justify-normal flex-col-reverse  lg:flex-row  lg:space-x-[110px] rtl:lg:gap-x-[110px]">
        <Image className="" alt="mobile" src={MobileAppI} />
        <div className="mt-12 flex flex-col space-y-[20px] mb-16 lg:mb-0">
          <h1 className=" lg:text-start text-center  text-heading01 text-grayscale900">
            {t("DownloadAPPTitle")}
          </h1>
          <p className=" lg:text-start text-center  text-bodylarge text-gray-500 text-wrap ">
          {t("DownloadAPPDis")}
          </p>
          <div className="flex justify-center lg:justify-normal items-center gap-y-3 md:gap-y-0 flex-col md:flex-row  md:space-x-[16px]">
            <Image alt="Apstore" src={AppStore1} />
            <Image alt="Apstore" src={AppStore} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
