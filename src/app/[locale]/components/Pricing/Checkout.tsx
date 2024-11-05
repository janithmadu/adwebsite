import { convertToSub } from "@/lib/ConvertToSub";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Loader from "../../../../../public/system-regular-719-spinner-circle-hover-rotation (3).gif";
import Image from "next/image";
import { PostAd } from "@/lib/categoryInterface";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

interface CheckOut {
  amount: number;
  Ad: PostAd;
}

const Checkout = ({ amount, Ad }: CheckOut) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessege, seterrorMessege] = useState<string | undefined>();
  const [clientSecret, setclientSecret] = useState<string | undefined>();
  const [loading, setloading] = useState<boolean>();
  const [locale, setLocale] = useState<string>("en");

  //Get the locales from cookies for navigate based on the locals
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSub(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setclientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      seterrorMessege(submitError.message);
      setloading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/${locale}/payments/paymentsuccess`, //To Do
      },
    });

    if (error) {
      seterrorMessege(error.message);
    } else {
    }
  };
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="min-w-full min-h-[300px] flex justify-center items-center">
        <div className="w-full flex justify-center ">
          <Image alt="Loader" src={Loader} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex flex-row w-full  p-4">
          {/* Left Side: Ad Details */}
          <div className="w-1/2 p-4 border-r-1 border-gray-200">
            <div className="p-4 border-gray-200">
              <div className="bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-wide border-b pb-4">
                  Ad Details
                </h2>
                <div className="py-4 border-b border-gray-200">
                  <span className="block font-semibold text-gray-600">
                    Ad Title:
                  </span>
                  <span className="text-gray-800">{Ad?.adName}</span>
                </div>

                <div className="py-4 border-b border-gray-200 ">
                  <span className="block font-semibold text-gray-600">
                    Payment:
                  </span>
                  <div className="flex flex-col justify-center mt-3 space-y-3">
                    <span className="text-gray-800 text-bodysmall">
                      &nbsp;&nbsp;&nbsp;&nbsp;Ad Fee : ${amount}
                    </span>
                    <span className="text-gray-800 text-bodysmall">
                      &nbsp;&nbsp;&nbsp;&nbsp;Tax Fee: 00.00
                    </span>
                    <span className="text-gray-800 text-bodysmall">
                      &nbsp;&nbsp;&nbsp;&nbsp;Aditionl Fee: 00.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Gateway */}
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-2 rounded-md shadow-md"
            >
              {clientSecret && <PaymentElement />}
              {errorMessege && <div>{errorMessege}</div>}
              <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
              >
                {!loading ? `Pay $${amount}` : "Processing...."}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Checkout;
