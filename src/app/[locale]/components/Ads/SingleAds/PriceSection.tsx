"use client";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import GetFavoritesOfUsers from "@/app/[locale]/actions/GetFavoritesOfUsers";
import { useTranslations } from "next-intl";

export const revalidate = 1;

interface Price {
  Price: string;
  Currency: string;
  Negotiable: boolean;
  UserID: string;
  AdID: string;
}

const PriceSection: React.FC<Price> = ({
  Price,
  Currency,
  Negotiable,
  UserID,
  AdID,
}) => {
  const [NegotiableCheck, setNegotiableCheck] = useState<boolean>();
  const [FevoriteCheck, setFevoriteCheck] = useState<boolean>();
  const t = useTranslations("TopNav");
  
  

  const router = useRouter();

  useEffect(() => {
    if (Negotiable) {
      setNegotiableCheck(true);
    } else {
      setNegotiableCheck(false);
    }
  }, [UserID, AdID]);

  useEffect(() => {
    const CheckFaExsisting = async () => {
      const AdExsist = await GetFavoritesOfUsers(UserID, AdID);

      setFevoriteCheck(AdExsist as boolean);
    };
    CheckFaExsisting();
  }, []);

  const AddTofaverite = async () => {
    const response = await fetch("/api/updateFaverite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserID, AdID }),
    });

    if (response.status === 200) {
      Swal.fire({
        title: "Favorite Added!",
        text: `You've Favorited This Ad!`,
        icon: "success",
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setFevoriteCheck(true);
        }
      });
    } else if (response.status === 401) {
      Swal.fire({
        title: "Unauthorized",
        text: `Unauthorized Access - Log In Required`,
        icon: "error",
        confirmButtonText: `Log In`,
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/en/payments`);
        }
      });
    }
  };

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

            <div className="min-w-[48px] flex items-center justify-center min-h-[48px] rounded-[4px] ">
              {/* Reminder:- Need to Create This after the User Functions  are done */}
              <button disabled={FevoriteCheck}>
                <Heart
                  onClick={AddTofaverite}
                  className={`${FevoriteCheck ? "text-red-600" : "text-primary500"} cursor-pointer`}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          {Negotiable && (
            <div className="flex gap-x-4 items-center">
              {" "}
              <Star className="text-blue-500" />
              <h1 className="text-grayscale900 text-bodysmall">{t("Negotiable")}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
