"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdsBySub, getPostAds } from "@/app/[locale]/actions/getAds";
import Image from "next/image";
import AdCard from "../../Ads/AdCard";
import PaginationComponent from "../PaginationComponet/PaginationComponet";
import LoadingImage from "../../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";

export default function FilterBySubs() {
  const [ads, setAds] = useState<any>([]);
  const [adsCount, setAdsCounts] = useState<any>();
  const searchParams = useSearchParams();
  const PageSize = 50;

  useEffect(() => {
    const subcategoryQuery = searchParams.get("subcategories");
    const queryObject = Object.fromEntries(searchParams.entries());

    console.log(queryObject);

    if (
      queryObject.subcategories ||
      queryObject.subOptions ||
      queryObject.minPrice ||
      queryObject.maxPricec ||
      queryObject.category
    ) {
      const getAdsBySubs = async () => {
        const subads = await getAdsBySub(
          queryObject,
          queryObject?.page,
          PageSize
        );

        setAds(subads?.result);
        setAdsCounts(subads?.resultcount);
      };
      getAdsBySubs();
    } else {
      const getAllBySubs = async () => {
        const subads = await getPostAds(queryObject?.page, PageSize);

        setAds(subads?.result);
        setAdsCounts(subads?.resultcount);
      };

      getAllBySubs();
    }
  }, [searchParams]);

  return (
    <>
  
      <div className="grid grid-cols-1 xl:ml-14 md:gap-x-36 gap-x-32 gap-y-6  lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 xl:gap-x-32 place-items-center place-content-center ">
        {ads?.length > 0 ? (
          ads.map((ad: any, index: number) => {
            return (
              <div key={index}>
                <AdCard GetAds={ad} />
              </div>
            );
          })
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="text-center">
              <Image alt="loader" src={LoadingImage} />
            </div>
          </div>
        )}
      </div>
      <div className="min-w-full flex justify-center ">
        <PaginationComponent TotoleCount={adsCount} PageSisze={PageSize} />
      </div>
    </>
  );
}
