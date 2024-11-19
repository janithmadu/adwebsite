import React, { useEffect, useState } from "react";
import { Star, Clock } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { getRelativeTime } from "../../actions/relativeTime";
import Link from "next/link";

interface CarCardProps {
  image?: string;
  location?: string;
  name?: string;
  year?: number;
  km?: string;
  brand?: string;
  price?: number;
  duration?: string;
  featured?: boolean;
  currancy?: string;
  id:string;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function CarCard({
  id,
  image,
  location,
  name,
  year,
  km,
  brand,
  price,
  duration,
  featured,
  currancy,
}: CarCardProps) {
  const [relativeTime, setRelativeTime] = useState(
    getRelativeTime(duration as string)
  );
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(duration as string));
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [duration]);
  return (
    <Link href={`${locale ? `/${locale}` : ""}/ads/${id}`}>
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-h-[370px] w-[310px] md:w-full">
        {featured && (
          <div className="absolute top-4 left-4 z-10 bg-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Featured</span>
          </div>
        )}
        <div className="relative min-h-[170px] overflow-hidden max-w-[370px] md:w-full">
          <CldImage
            width={800}
            height={800}
            src={image as string}
            alt={name as string}
            className="min-w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 px-5 md:px-3">
          <p className="text-sm text-gray-600 mb-2">{location}</p>
          <div className="max-w-[200px]">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-wrap">
              {name}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-sm text-gray-600">{year}</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{km}</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{brand}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex min-w-full justify-between">
              <p className="text-xl font-bold text-blue-600">
                {currancy} {price}
              </p>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{relativeTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
