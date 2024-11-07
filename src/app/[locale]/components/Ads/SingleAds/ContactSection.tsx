"use client";
import {
  Envelope,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
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
import { useTranslations } from "next-intl";

interface PhoneNumber {
  PhoneNumber: string;
  Email: string;
}

const ContactSection: React.FC<PhoneNumber> = ({ PhoneNumber, Email }) => {
  const HidePhone = PhoneNumber.slice(0, 4);
  const t = useTranslations("TopNav");

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with the actual phone number
    const whatsappURL = `https://wa.me/${PhoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  const handleEmailClick = () => {
    const emailAddress = Email; // Replace with the actual email address
    const subject = "Hello"; // Optional: Add a subject line
    const body = "I would like to reach out regarding..."; // Optional: Add body text
    const mailtoURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
  };

  return (
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
                <AlertDialogTitle> {t("Revelthephone")}</AlertDialogTitle>
                <AlertDialogDescription>{PhoneNumber}</AlertDialogDescription>
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
  );
};

export default ContactSection;
