import { StackSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

function FormTopBarIcon({Titile,Step}:any) {
  return (
    
      <div className="flex items-center gap-x-[6px]">
        <div className="rounded-full w-[56px] h-[56px] bg-primary500 flex justify-center items-center">
          <StackSimple width={24} height={24} className="text-grayscalewhite" />
        </div>
        <div className="">
          <h1 className="text-grayscale900 text-[16px] font-semibold">
            {Step}
          </h1>
          <h1 className="text-grayscale600 text-[14px]">{Titile}</h1>
        </div>
      </div>
   
  );
}

export default FormTopBarIcon;
