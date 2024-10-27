import Image from "next/image";
import React from "react";
import selerImage from "../../../../../../public/Images (2).png";
import {
  CircleWavyCheck,
  Envelope,
  GlobeHemisphereEast,
  MapPinLine,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
function SellerInfo({Username,UserEmail,UserAvatar}:any) {
  return (
    <div className="">
      <div className="flex gap-y-[24px] flex-col">
        <div className="flex justify-between min-h-[56px]  min-w-full items-center">
          <div className="flex gap-x-[16px] items-center">
            <Image
              src={UserAvatar}
              width={52}
              height={52}
              alt=""
              className="rounded-full bg-red-500 bg-cover"
            />
            <div className="flex flex-col gap-y-[6px] ">
              <h1 className="text-grayscale500 text-bodysmall">Add by:</h1>
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
          <Link className="text-primary500 text-bodysmall" href="#">
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
  );
}

export default SellerInfo;
