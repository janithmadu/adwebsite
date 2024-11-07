import Image from "next/image";
import React from "react";
import Logo from "../../../../../public/fi_search.svg";
import LogoMain from "../../../../../public/logo.png";
import Link from "next/link";
import {
  PlusCircle,
  Usb,
  UserCheck,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import CategoryBar from "./CategoryBar";
import CountryChange from "./CountryChange";
export const revalidate = 1;
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import UserSetting from "./UserSetting";
import { User } from "@phosphor-icons/react";

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

const Topnavbar: React.FC<User> = ({ user }) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

  return (
    <>
      <div className="min-w-full flex flex-col justify-start border-b-[#EBEEF7] border">
        {/* Top Nav Start */}
        <div className=" container mx-auto px-5 lg:px-5 xl:px-20 md:px-10 min-h-[100px] flex md:gap-10 items-center justify-between ">
          {/* Logo */}
          <Link href="/">
            <Image
              src={LogoMain}
              width={130}
              height={0}
              className=""
              alt="Logo"
            />
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
              className="hidden sm:inline px-10 xl:min-w-[536px] lg:min-w-[536px] min-h-[52px] border-[#EBEEF7] border rounded-[5px]"
              placeholder={t("SearchBarPlaceHolder")}
            />
          </div>

          {/* Top Nav Button Section */}
          <div className=" flex md:min-w-[243px] space-x-[20px] rtl:gap-[20px]">
            {user?.id ? (
              <UserSetting
                picture={user.picture}
                email={user.email}
                family_name={user.family_name}
                given_name={user.given_name}
                id={user.id}
                phone_number={user.phone_number}
                username={user.username}
              />
            ) : (
              <>
                <button className="hidden md:inline min-w-[92px] min-h-[50px] rounded-[4px] bg-primary50 text-primary500 text-[16px] font-bold">
                  <LoginLink>{t("SignIn")}</LoginLink>
                </button>

                <button className=" hidden xl:inline min-w-[92px] min-h-[50px] rounded-[4px] bg-primary50 text-primary500 text-[16px] font-bold">
                  <RegisterLink>{t("SignUp")}</RegisterLink>
                </button>

                <button className=" md:hidden rounded-[4px] text-[16px] font-bold">
                  <LoginLink>
                    <UserCircle size={39} className="text-primary500" />
                  </LoginLink>
                </button>
              </>
            )}

            <Link
              className=" hidden min-w-[139px] min-h-[5px] md:flex items-center justify-center bg-primary500 text-grayscalewhite font-bold rounded-[4px] transition duration-300 ease-in-out hover:bg-primary700 hover:shadow-lg"
              href={`/${locale}/addform/step01`}
            >
              <div className=" flex space-x-[8px] rtl:gap-[8px]">
                <PlusCircle className="min-w-[24px] min-h-[24px]" />
                <h1>{t("PostAds")}</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="sm:hidden relative min-w-full flex justify-center mb-2 rounded-full px-2  ">
          <Image
            alt="Search Icon"
            src={Logo}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            className="  px-10  min-w-full min-h-[52px] border-primary700 border rounded-full"
            placeholder={t("SearchBarPlaceHolder")}
          />
        </div>
      </div>
      {/* Top Nav End */}

      <div className="container mx-auto lg:px-5 px-5 xl:px-20 md:px-10">
        <div className="min-w-full min-h-[78px] flex items-center justify-between">
          <CategoryBar
            CurrentLocal={locale}
            t={t("SelectYourCategory")}
            categorytitle={t("categorytitle")}
          />
          <CountryChange />
        </div>
      </div>
    </>
  );
};

export default Topnavbar;
