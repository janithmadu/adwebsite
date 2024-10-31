"use client";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";

function PriceSection({ Price, Currency, Negotiable }: any) {
  const [NegotiableCheck, setNegotiableCheck] = useState<boolean>();

  useEffect(() => {
    if (Negotiable) {
      setNegotiableCheck(true);
    } else {
      setNegotiableCheck(false);
    }
  }, []);

  return (
    <div className="">
      <div className="min-w-full border-b px-[32px] py-5">
        <div>
          <div className="flex items-center min-h-[72px] justify-between max-w-[322px]">
            <div>
              <h1 className="text-grayscale900 text-[32px]">
                <span>{Currency} </span>
                <span>{Price}.00</span>
              </h1>
            </div>

            <div className="min-w-[48px] flex items-center justify-center min-h-[48px] rounded-[4px] bg-primary100">
              {/* Reminder:- Need to Create This after the User Functions  are done */}

              <Heart className="text-primary500" width={24} height={24} />
            </div>
          </div>
          {Negotiable && (
            <div className="flex gap-x-4 items-center">
              {" "}
              <Star className="text-blue-500" />{" "}
              <h1 className="text-grayscale900 text-bodysmall">Negotiable</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PriceSection;
