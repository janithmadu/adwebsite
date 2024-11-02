import { Check } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface AdData {
  Options?: Option[];
  Description?: string;
  Features?: Feature[];
}


interface Option {
 
    key:string
    value:string
  
}

interface Feature {
 
  Feature:string[]

}

const DescriptionAds: React.FC<AdData> = ({
  Options,
  Description,
  Features,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-heading03 text-grayscale900">Description</h2>
      <p className="text-bodymedium text-grayscale500 text-wrap">
        {Description}
      </p>

      {/* Features List */}
      <div className="mt-6 flex flex-col gap-y-[24px]">
        <h2 className="text-grayscale900 text-heading03">Options</h2>
        <ul className="grid grid-cols-2 gap-y-[16px] text-grayscale700 text-bodymedium">
          {Options?.map((GetOption: Option, index: number) => {
            console.log();
            
            return (
              <li key={index} className="flex gap-x-[12px] items-center">
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

      <div className="mt-6 flex flex-col gap-y-[24px] mb-10">
        <h2 className="text-grayscale900 text-heading03">Features</h2>
        <ul className="grid grid-cols-2 gap-y-[16px] text-grayscale700 text-bodymedium">
          {Features?.map((Feature: Feature, index: number) => {
            return (
              <li key={index} className="flex gap-x-[12px] items-center">
                <Check width={24} height={24} className="text-primary500" />
                {Feature.Feature}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DescriptionAds;
