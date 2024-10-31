"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdsBySub, getPostAds } from "@/app/[locale]/actions/getAds";
import Image from "next/image";
import AdCard from "../../Ads/AdCard";
import PaginationComponent from "../PaginationComponet/PaginationComponet";
import LoadingImage from "../../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import NoItem from "../../../../../../public/rb_127823.png"

export default function FilterBySubs() {
  const [ads, setAds] = useState<any>([]);
  const [adsCount, setAdsCounts] = useState<any>();
  const [adsLoader, setAdsLoader] = useState(false);
  const searchParams = useSearchParams();
  const PageSize = 50;

  useEffect(() => {
    const queryObject = Object.fromEntries(searchParams.entries());

    const fetchAds = async () => {
      setAdsLoader(true); // Start loader

      let subads;
      if (
        queryObject.subcategories ||
        queryObject.subOptions ||
        queryObject.minPrice ||
        queryObject.maxPrice ||
        queryObject.category
      ) {
        subads = await getAdsBySub(queryObject, queryObject?.page, PageSize);
      } else {
        subads = await getPostAds(queryObject?.page, PageSize);
      }

      setAds(subads?.result || []);
      setAdsCounts(subads?.resultcount);
      setAdsLoader(false); // Stop loader
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
      ) : ads?.length > 0 ? (
        <div className="grid grid-cols-1 xl:ml-14 md:gap-x-36 gap-x-32 gap-y-6 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 xl:gap-x-32 place-items-center place-content-center">
          {ads.map((ad: any, index: number) => (
            <div key={index}>
              <AdCard GetAds={ad} />
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

      {ads?.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={adsCount} PageSisze={PageSize} />
        </div>
      )}
    </>
  );
}
