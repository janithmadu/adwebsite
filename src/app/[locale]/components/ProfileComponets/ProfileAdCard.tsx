"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/[locale]/components/badge";
import { Card, CardContent } from "@/app/[locale]/components/Card";
import { useEffect, useState } from "react";

interface ProductCardProps {
  title: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  timestamp?: string;
  id?: string;
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
}: ProductCardProps) {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  return (
    <Link
      href={`${locale ? `/${locale}` : ""}/ads/${id}`}
      className="block transition-transform hover:-translate-y-1 "
    >
      <Card className="overflow-hidden border-0 shadow-lg min-w-[500px]">
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 96px) 100vw, 96px"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
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
              <div className="flex items-center justify-between max-w-[700px] min-w-[360px] ">
                <span className="text-lg font-semibold text-green-600">
                  Rs {price.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {timestamp}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
