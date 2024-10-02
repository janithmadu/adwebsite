import Image from "next/image";
import React from "react";
import Logo from "../../public/fi_search.svg";
import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import CategoryBar from "./CategoryBar";
import CountryChange from "./CountryChange";
export const revalidate = 1;
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";

function Topnavbar() {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");
  return (
    <div className=" md:min-w-[800px] lg:min-w-[1300px]  xl:min-w-[1920px] min-h-[178px] relative   ">
      {/* Top Nav Start  */}
      <div className=" relative w-full min-h-[100px] md:px-[50px]  lg:px-[100px] xl:px-[300px] flex gap-10 items-center border-b-[#EBEEF7] border justify-between">
        {/* Logo */}
        <h1 className="text-heading02 font-bold">
          <span className="text-primary600">G</span>oshop
        </h1>

        {/* Search Box */}

        <div className="relative">
          {/* Search Icon Image */}
          <Image
            alt="Search Icon"
            src={Logo}
            className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
          />
          {/* Search Icon Image End*/}

          {/* Search Bar */}
          <input
            type="text"
            className=" px-10 xl:min-w-[536px] lg:min-w-[536px]  min-h-[52px] border-[#EBEEF7] border rounded-[5px]"
            placeholder={t("SearchBarPlaceHolder")}
          />
          {/* Search Bar End */}
        </div>

        {/* Top Nav Buttion Section Start */}

        <div className="flex min-w-[243px] space-x-[20px] rtl:gap-[20px] ">
          <button className="min-w-[92px] min-h-[50px] rounded-[4px] bg-primary50 text-primary500 text-[16px] font-bold">
            {t("SignIn")}
          </button>
          <Link
            className=" min-w-[139px] min-h-[5px] flex items-center justify-center bg-primary500 text-grayscalewhite font-bold rounded-[4px]"
            href="#"
          >
            <div className="flex space-x-[8px] rtl:gap-[8px]">
              <PlusCircle className="min-w-[24px] min-h-[24px] " />
              <h1>{t("PostAds")}</h1>
            </div>
          </Link>
        </div>

        {/* Top Nav Buttion Section End */}
      </div>
      {/* Top Nav End  */}

      <div className="min-w-full min-h-[78px] md:px-[50px]  lg:px-[100px] xl:px-[300px] flex items-center  justify-between">
        <CategoryBar CurrentLocal={locale} />
        <div>
          <CountryChange />
        </div>
      </div>
    </div>
  );
}

export default Topnavbar;
