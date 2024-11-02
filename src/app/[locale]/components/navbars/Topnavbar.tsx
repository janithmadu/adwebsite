import Image from "next/image";
import React from "react";
import Logo from "../../../../../public/fi_search.svg";
import Link from "next/link";
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";
import CategoryBar from "./CategoryBar";
import CountryChange from "./CountryChange";
export const revalidate = 1;
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import UserSetting from "./UserSetting";

export interface User {
  user: {
    id: string; // Make this non-optional if you're guaranteed to have an id
    email: string; // Non-optional
    family_name: string; // Non-optional
    given_name: string; // Non-optional
    picture: string; // Non-optional
    username?: string; // Optional
    phone_number?: string; // Optional
  } | null; // Allow the entire user to be null
}


const Topnavbar: React.FC<User> = ({user}) => {


  
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

  return (
    <>
      <div className="min-w-full flex flex-col justify-start border-b-[#EBEEF7] border">
        {/* Top Nav Start */}
        <div className="relative container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 min-h-[100px] flex gap-10 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-heading02 font-bold">
              <span className="text-primary600">G</span>oshop
            </h1>
          </Link>

          {/* Search Box */}
          <div className="relative">
            <Image
              alt="Search Icon"
              src={Logo}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="hidden md:inline px-10 xl:min-w-[536px] lg:min-w-[536px] min-h-[52px] border-[#EBEEF7] border rounded-[5px]"
              placeholder={t("SearchBarPlaceHolder")}
            />
          </div>

          {/* Top Nav Button Section */}
          <div className="hidden md:flex min-w-[243px] space-x-[20px] rtl:gap-[20px]">
            {user ? (
              <UserSetting picture={user.picture} email={user.email} family_name={user.family_name} given_name={user.given_name} id={user.id} phone_number={user.phone_number} username={user.username} />
            ) : (
              <button className="min-w-[92px] min-h-[50px] rounded-[4px] bg-primary50 text-primary500 text-[16px] font-bold">
                <LoginLink>{t("SignIn")}</LoginLink>
              </button>
            )}

            <Link
              className="min-w-[139px] min-h-[5px] flex items-center justify-center bg-primary500 text-grayscalewhite font-bold rounded-[4px]"
              href={`/${locale}/addform/step01`}
            >
              <div className="flex space-x-[8px] rtl:gap-[8px]">
                <PlusCircle className="min-w-[24px] min-h-[24px]" />
                <h1>{t("PostAds")}</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Top Nav End */}

      <div className="container mx-auto lg:px-5 px-5 xl:px-20 md:px-10">
        <div className="min-w-full min-h-[78px] flex items-center justify-between">
          <CategoryBar CurrentLocal={locale} />
          <CountryChange />
        </div>
      </div>
    </>
  );
};

export default Topnavbar;
