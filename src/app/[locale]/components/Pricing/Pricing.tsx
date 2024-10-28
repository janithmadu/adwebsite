"use client";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSub } from "@/lib/ConvertToSub";
import Checkout from "@/app/[locale]/components/Pricing/Checkout";
import { getAdById, getAdByIdForPayment } from "../../actions/getAds";
import { redirect } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not define");
}

const stripePromis = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Pricing = () => {
  const [AdPrice, setAdPrice] = useState<number>(0);
  const [AdDetails, setAdDetails] = useState();

  useEffect(() => {
    const AdID = localStorage.getItem("AdID");
    if (!AdID) {
      redirect("/");
    }

    const GetAd = async () => {
      const GetAdd = await getAdByIdForPayment(AdID as string);
      console.log();
      

      if (!GetAdd) {
        setAdPrice(0);
      } else {
        setAdPrice(GetAdd?.category?.price);
        setAdDetails(GetAdd);
      }
    };

    GetAd();
  }, []);

  return (
    <div className="min-w-full">
      {AdPrice > 0 ? (
        <Elements
          stripe={stripePromis}
          options={{
            mode: "payment",
            amount: convertToSub(AdPrice),
            currency: "usd",
          }}
        >
          {AdPrice > 0 && <Checkout amount={AdPrice} Ad={AdDetails} />}
        </Elements>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pricing;
