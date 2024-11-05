"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/[locale]/components/badge";
import { Card, CardContent } from "@/app/[locale]/components/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getRelativeTime } from "../../actions/relativeTime";

interface ProductCardProps {
  title: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  timestamp: string;
  id?: string;
  paymentPending?: boolean;
  adprice?: number;
}
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function ProfileAdCard({
  title,
  category,
  subcategory,
  price,
  image,
  timestamp,
  id,
  paymentPending,
  adprice,
}: ProductCardProps) {
  const [locale, setLocale] = useState("en");
  const router = useRouter();
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(timestamp));
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(timestamp));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timestamp]);

  const PaymentPendingPay = () => {
    localStorage.setItem("AdID", id as string);
    Swal.fire({
      title: "Action Required: Payment Pending",
      text: `Pay Your Pending Payment of ${adprice} USD`,
      icon: "info",
      confirmButtonText: `Pay ${adprice} USD`,
      allowOutsideClick: false,
      allowEscapeKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/${locale}/payments`); // Redirect to payments page on confirm
      }
    });
  };

  return (
    <div className="relative">
      <div className="min-w-full flex justify-end p-1 ">
        {paymentPending ? (
          <button
            type="button"
            className="cursor-pointer bg-danger600 p-[4px] rounded-full text-white"
            onClick={PaymentPendingPay}
          >
            Payment Pending
          </button>
        ) : null}
      </div>
      <Link
        href={`${locale ? `/${locale}` : ""}/ads/${id}`}
        className="block transition-transform hover:-translate-y-1 "
      >
        <Card className="overflow-hidden border-0 shadow-lg ">
          <CardContent className="p-0">
            <div className="flex gap-4 p-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={image || "/"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 96px) 100vw, 96px"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-600">{category}</span>
                    {subcategory && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {subcategory}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center sm:justify-between sm:max-w-[700px] 2xl:min-w-[360px] lg:min-w-[520px] sm:min-w-[360px]  max-w-[600px] gap-x-[10px]">
                  <span className=" text-bodytiny sm:text-lg font-semibold text-green-600">
                    Rs {price.toLocaleString()}
                  </span>
                  <Badge
                    variant="secondary"
                    className=" text-[0.7rem] sm:text-xs font-normal"
                  >
                    {relativeTime}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
