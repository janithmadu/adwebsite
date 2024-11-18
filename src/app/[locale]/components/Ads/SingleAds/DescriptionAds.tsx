"use client";
import { Star } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import {
  Envelope,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

import { CircleWavyCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useTranslations } from "next-intl";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

interface AdData {
  Options?: Option[];
  Description?: string;
  Features?: string[];
  Price?: string;
  Currency?: string;
  Negotiable?: string;
  UserID?: string;
  AdID?: string;
  Model?: string;
  Condition?: string;
  Brand?: string;
  Authenticity?: string;
  State?: string;
  PhoneNumber?: string;
  Username?: string;
  UserEmail?: string;
  UserAvatar?: string;
  ClientUserID: string;
}

interface Option {
  key: string;
  value: string;
}

interface Feature {
  Feature: string[];
}

const DescriptionAds: React.FC<AdData> = ({
  Options,
  Description,
  Features,
  Price,
  Currency,
  Negotiable,
  UserID,
  AdID,
  Model,
  Condition,
  Brand,
  Authenticity,
  State,
  PhoneNumber,
  Username,
  UserEmail,
  UserAvatar,
  ClientUserID,
}) => {
  const [NegotiableCheck, setNegotiableCheck] = useState<boolean>();
  const t = useTranslations("TopNav");
  const [locale, setLocale] = useState("en");



  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    if (Negotiable) {
      setNegotiableCheck(true);
    } else {
      setNegotiableCheck(false);
    }
  }, [UserID, AdID]);

  const HidePhone = PhoneNumber?.slice(0, 4);

  const handleWhatsAppClick = () => {
    const phoneNumber = PhoneNumber; // Replace with the actual phone number
    const whatsappURL = `https://wa.me/${PhoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  const handleEmailClick = () => {
    const emailAddress = UserEmail; // Replace with the actual email address
    const subject = "Hello"; // Optional: Add a subject line
    const body = "I would like to reach out regarding..."; // Optional: Add body text
    const mailtoURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
  };

  return (
    <div className="mt-8 ">
      <div className="mb-4 lg:hidden flex flex-col gap-y-2">
        <h1 className="text-bodylarge text-primary500 font-extrabold ">
          <span>
            {Currency} {Price?.toLocaleString()}{" "}
          </span>
        </h1>
        {Negotiable && (
          <div className="flex gap-x-1 items-center">
            {" "}
            <Star className="text-blue-500" />
            <h1 className="text-grayscale900 text-bodysmall">
              {" "}
              {t("Negotiable")}
            </h1>
          </div>
        )}
      </div>

      <div className="mb-4 lg:hidden flex flex-col gap-y-2">
        <div className="min-w-full border-b  py-5">
          <div className="flex gap-x-3">
            <h1 className="text-grayscale400"> {t("Model")}:</h1>{" "}
            <span>{Model}</span>
          </div>
          <div className="flex gap-x-3">
            <h1 className="text-grayscale400">{t("Condition")}:</h1>{" "}
            <span>{Condition}</span>
          </div>
          <div className="flex gap-x-3">
            <h1 className="text-grayscale400">{t("Brand")}:</h1>{" "}
            <span>{Brand}</span>
          </div>
          <div className="flex gap-x-3">
            <h1 className="text-grayscale400">{t("Authenticity")}:</h1>{" "}
            <span>{Authenticity}</span>
          </div>
          <div className="flex gap-x-3">
            <h1 className="text-grayscale400">{t("State")}:</h1>{" "}
            <span>{State}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 lg:hidden flex flex-col gap-y-2">
        <div className="space-y-2 mb-6">
          <div>
            <div className=" flex flex-col gap-y-[12px] px-[20px] py-[20px] bg-grayscale20 rounded-[8px]">
              <h1 className="flex gap-x-[12px] items-center">
                <PhoneCall width={32} height={32} className="text-primary500" />
                <span className="text-grayscale900 text-bodylarge">
                  {HidePhone} XX-XXXX
                </span>
              </h1>

              <AlertDialog>
                <AlertDialogTrigger>{t("Revelthephone")}</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle> {t("OwnerPhone")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {PhoneNumber}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* <div className="rounded-[4px] bg-primary500 flex items-center justify-center gap-x-[8px] py-[13px]">
        <ChatCircleDots width={24} height={24} className="text-white" />
        <h1 className="text-grayscalewhite text-heading04">Send Message</h1>
      </div> */}
          <button
            onClick={handleWhatsAppClick}
            className="rounded-[4px] bg-[#2DD54B] flex items-center justify-center gap-x-[8px] py-[13px] min-w-full"
          >
            <WhatsappLogo width={24} height={24} className="text-white" />
            <h1 className="text-grayscalewhite text-heading04">
              {t("MessegeviaWhatsapp")}
            </h1>
          </button>

          <button
            onClick={handleEmailClick}
            className="rounded-[4px] bg-grayscale50 flex items-center justify-center gap-x-[8px] py-[13px] min-w-full"
          >
            <Envelope width={24} height={24} className="text-grayscale900" />
            <h1 className="text-grayscale900 text-heading04">
              {" "}
              {t("MessegeviaEmail")}
            </h1>
          </button>
        </div>
      </div>

      <h2 className="text-heading03 text-grayscale900">{t("Description")}</h2>
      <p className="text-bodymedium text-grayscale500 text-wrap">
        {Description}
      </p>

      {/* Features List */}
      <div className="mt-6 flex flex-col gap-y-[24px]">
        <h2 className="text-grayscale900 text-heading03">{t("Options")}</h2>
        <ul className="grid grid-cols-2 gap-y-[16px] text-grayscale700 text-bodymedium">
          {Options?.map((GetOption: Option, index: number) => {
            return (
              <li
                key={index}
                className={`${GetOption == null ? "hidden" : "flex gap-x-[12px] items-center"}`}
              >
                {" "}
                <Check
                  width={24}
                  height={24}
                  className="text-primary500"
                />{" "}
                {GetOption?.key} : {GetOption?.value}{" "}
              </li>
            );
          })}
        </ul>
      </div>

      {Features?.every((item) => item === "") ? null : (
        <div className="mt-6 flex flex-col gap-y-[24px] mb-10">
          <h2 className="text-grayscale900 text-heading03">{t("Features")}</h2>
          <ul className="grid grid-cols-2 gap-y-[16px] text-grayscale700 text-bodymedium">
            {Features?.map((feature, index: number) => {
              return (
                <li key={index} className="flex gap-x-[12px] items-center">
                  <Check width={24} height={24} className="text-primary500" />
                  {feature}
                  {/* Accessing the string property inside the Feature object */}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mb-4 lg:hidden flex flex-col gap-y-2">
        <div className="">
          <div className="flex gap-y-[24px] flex-col">
            <div className="flex justify-between min-h-[56px]  min-w-full items-center">
              <div className="flex gap-x-[16px] items-center">
                <Image
                  src={UserAvatar || "/"}
                  width={52}
                  height={52}
                  alt=""
                  className="rounded-full bg-red-500 bg-cover"
                />
                <div className="flex flex-col gap-y-[6px] ">
                  <h1 className="text-grayscale500 text-bodysmall">
                    {t("Addby")}
                  </h1>
                  <h1 className="text-grayscale900 text-bodymedium flex gap-x-[4px] items-center">
                    <span> {Username}</span>
                    <CircleWavyCheck
                      width={20}
                      height={20}
                      className="text-success500"
                    />
                  </h1>
                </div>
              </div>
              <Link
                className="text-primary500 text-bodysmall"
                href={`/${locale}/profile/${ClientUserID}?page=1`}
              >
                View Profile
              </Link>
            </div>

            <div className="flex flex-col justify-center gap-y-[16px]">
              <span className="flex gap-x-[12px] items-center">
                {" "}
                <Envelope
                  widths={24}
                  height={24}
                  className="text-primary500"
                />{" "}
                <h1 className="text-grayscale600 text-bodymedium">
                  {UserEmail}
                </h1>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAds;
