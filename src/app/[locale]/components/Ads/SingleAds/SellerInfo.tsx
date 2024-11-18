import Image from "next/image";
import React from "react";
import { CircleWavyCheck, Envelope } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

interface SellerInfo {
  Username: string;
  UserEmail?: string;
  UserAvatar: string;
  UserID:string
  VerifiedSeller:boolean
  Member:boolean
}
const SellerInfo: React.FC<SellerInfo> = ({
  Username,
  UserEmail,
  UserAvatar,
  UserID,
  VerifiedSeller,
  Member
}) => {

  
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");
  return (
    <div className="">
      <div className="flex gap-y-[24px] flex-col">
        <div className="flex justify-between min-h-[56px]  min-w-full items-center">
          <div className="flex gap-x-[16px] items-center">
           {
            UserAvatar ? (
              <Image
              src={UserAvatar || "/"}
              width={52}
              height={52}
              alt=""
              className="rounded-full bg-red-500 bg-cover"
            />
            ):(
              <div className="rounded-full bg-grayscale200 w-12 h-12 flex justify-center items-center"><h1 className="text-bodyxl">{Username[1]}</h1></div>
            )
           }
            <div className="flex flex-col gap-y-[6px] ">
              <h1 className="text-grayscale500 text-bodysmall">{t("Addby")}:</h1>
              <h1 className="text-grayscale900 text-bodymedium flex gap-x-[4px] items-center">
                <span> {Username}</span>
               {
                VerifiedSeller && Member ?(
                  <CircleWavyCheck
                  width={20}
                  height={20}
                  className="text-success500"
                />
                ):(
                  <></>
                )
               }
              </h1>
            </div>
          </div>
          <Link className="text-primary500 text-bodysmall"  href={`/${locale}/profile/${UserID}?page=1`}>
            {t("ViewProfile")}
          </Link>
        </div>

       {
        UserEmail ?(
          <div className="flex flex-col justify-center gap-y-[16px]">
          <span className="flex gap-x-[12px] items-center">
            {" "}
            <Envelope
              widths={24}
              height={24}
              className="text-primary500"
            />{" "}
            <h1 className="text-grayscale600 text-bodymedium">{UserEmail}</h1>
          </span>
        </div>
        ):(
          <></>
        )
       }
      </div>
    </div>
  );
};

export default SellerInfo;
