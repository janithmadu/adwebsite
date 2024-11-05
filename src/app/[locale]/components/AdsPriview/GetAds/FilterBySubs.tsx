"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdsBySub, getPostAds } from "@/app/[locale]/actions/getAds";
import Image from "next/image";
import PaginationComponent from "../PaginationComponet/PaginationComponet";
import LoadingImage from "../../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import NoItem from "../../../../../../public/rb_127823.png";
import { PostAd } from "@/lib/categoryInterface";
import { ProfileAdCard } from "../../ProfileComponets/ProfileAdCard";

interface Result {
  result: PostAd[];
  resultCount: number;
}

const isResult = (data: any): data is Result => {
  return (
    data && Array.isArray(data.result) && typeof data.resultCount === "number"
  );
};
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function FilterBySubs() {
  const [ads, setAds] = useState<PostAd[]>([]);
  const [adsCount, setAdsCounts] = useState<number>(0);
  const [adsLoader, setAdsLoader] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const PageSize = 50;
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const queryObject = Object.fromEntries(searchParams.entries());

    const fetchAds = async () => {
      setAdsLoader(true); // Start loader

      const subcategoryId = {
        subcategories: queryObject.subcategories as string,
        subOptions: queryObject.subOptions as string,
        minPrice: parseInt(queryObject.minPrice, 10) || 0,
        maxPrice: parseInt(queryObject.maxPrice, 10) || 0,
        category: queryObject.category as string,
        page: parseInt(queryObject.page, 10) || 1,
        limit: PageSize,
      };

      let subads: Result = { result: [], resultCount: 0 }; // Default value

      if (
        queryObject.subcategories ||
        queryObject.subOptions ||
        queryObject.minPrice ||
        queryObject.maxPrice ||
        queryObject.category
      ) {
        const data = await getAdsBySub({ subcategoryId });
        if (isResult(data)) {
          subads = data;
        }
      } else {
        const data = await getPostAds({ subcategoryId });
        if (isResult(data)) {
          subads = data;
        }
      }

      setAds(subads.result);
      setAdsCounts(subads.resultCount);
      setAdsLoader(false);
    };

    fetchAds();
  }, [searchParams]);

  return (
    <>
      {adsLoader ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-center">
            <Image alt="Loading" src={LoadingImage} width={70} height={70} />
          </div>
        </div>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 xl:ml-14 md:gap-x-36 gap-x-32 lg:gap-y-1 xl:gap-y-6 lg:grid-cols-1  2xl:grid-cols-2 xl:gap-x-32 place-items-center place-content-center  ">
          {ads.map((ad: PostAd, index: number) => (
            <div className="min-w-full" key={index}>
              <ProfileAdCard
                title={ad.adName}
                category={ad.category.title[(locale as "en") || "ar"]}
                image={ad?.photos[0]?.asset?.url || ""}
                price={ad.price}
                timestamp={ad._createdAt}
                id={ad._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4">
          <Image src={NoItem} alt="No Ads Available" width={160} height={160} />
          <h2 className="text-2xl font-semibold text-gray-700">
            Oops! No ads match your search.
          </h2>
          <p className="text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {ads.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={adsCount} PageSisze={PageSize} />
        </div>
      )}
    </>
  );
}
