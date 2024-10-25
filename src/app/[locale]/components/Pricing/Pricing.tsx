"use client";
import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertToSub } from "@/lib/ConvertToSub";
import Checkout from "@/app/[locale]/components/Pricing/Checkout";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not define");
}

const stripePromis = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Pricing = () => {
  const amount: number = 400;
  return (
    <div>
      <Elements
        stripe={stripePromis}
        options={{
          mode: "payment",
          amount: convertToSub(amount),
          currency: "usd",
        }}
      >
        <Checkout amounts={amount} />
      </Elements>
    </div>
  );
};

export default Pricing;
