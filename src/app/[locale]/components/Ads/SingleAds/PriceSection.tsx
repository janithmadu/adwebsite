import { Heart } from "@phosphor-icons/react/dist/ssr";
import React from "react";

function PriceSection({ Price, Currency }: any) {
  return (
    <div className="">
      <div className="min-w-full border-b px-[32px]">
        <div className="flex items-center min-h-[112px] justify-between max-w-[322px]">
          <h1 className="text-grayscale900 text-[32px]">
            {Currency}
            {Price}.00
          </h1>
          <div className="min-w-[48px] flex items-center justify-center min-h-[48px] rounded-[4px] bg-primary100">
            {/* Reminder:- Need to Create This after the User Functions  are done */}

            <Heart className="text-primary500" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSection;
