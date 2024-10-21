import {
  ChatCircle,
  ChatCircleDots,
  Envelope,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

function ContactSection() {
  return (
    <div className="space-y-2 mb-6">
      <div>
        <div className=" flex flex-col gap-y-[12px] px-[20px] py-[20px] bg-grayscale20 rounded-[8px]">
          <h1 className="flex gap-x-[12px] items-center">
            <PhoneCall width={32} height={32} className="text-primary500" />
            <span className="text-grayscale900 text-bodylarge">
              (808) 5XX-XXXX
            </span>
          </h1>
          <Link href="#">Click here to reveal phone number.</Link>
        </div>
      </div>

      <div className="rounded-[4px] bg-primary500 flex items-center justify-center gap-x-[8px] py-[13px]">
        <ChatCircleDots width={24} height={24} className="text-white" />
        <h1 className="text-grayscalewhite text-heading04">Send Message</h1>
      </div>
      <div className="rounded-[4px] bg-[#2DD54B] flex items-center justify-center gap-x-[8px] py-[13px]">
        <WhatsappLogo width={24} height={24} className="text-white" />
        <h1 className="text-grayscalewhite text-heading04">
          Message Via Whatsapp
        </h1>
      </div>

      <div className="rounded-[4px] bg-grayscale50 flex items-center justify-center gap-x-[8px] py-[13px]">
        <Envelope width={24} height={24} className="text-grayscale900" />
        <h1 className="text-grayscale900 text-heading04">Message Via email</h1>
      </div>
    </div>
  );
}

export default ContactSection;
