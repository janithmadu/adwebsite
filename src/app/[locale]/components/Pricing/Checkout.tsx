import { convertToSub } from "@/lib/ConvertToSub";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const Checkout = (amount: any) => {
  console.log(amount.amounts);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessege, seterrorMessege] = useState<any>();
  const [clientSecret, setclientSecret] = useState<any>();
  const [loading, setloading] = useState<boolean>();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSub(amount.amounts) }),
    })
      .then((res) => res.json())
      .then((data) => setclientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    if (!stripe || !elements) {
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
        return_url: `http://localhost:3000/en/payments/paymentsuccess`,
      },
    });

    if (error) {
      seterrorMessege(error);
    } else {
    }
  };
  return (
    <div>
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
          {!loading ? `Pay $${amount.amounts}` : "Processing...."}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
