"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdsBySub, getPostAds } from "@/app/[locale]/actions/getAds";
import Image from "next/image";
import AdCard from "../../Ads/AdCard";
import PaginationComponent from "../PaginationComponet/PaginationComponet";

export default function FilterBySubs() {
  const [ads, setAds] = useState<any>([]);
  const [adsCount, setAdsCounts] = useState<any>();
  const searchParams = useSearchParams();
  const PageSize = 50;

  useEffect(() => {
    const subcategoryQuery = searchParams.get("subcategories");
    const queryObject = Object.fromEntries(searchParams.entries());

    console.log(!queryObject.maxPrice);

    if (
      queryObject.subcategories ||
      queryObject.subOptions ||
      queryObject.minPrice ||
      queryObject.maxPrice
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
          ads.map((ad: any) => {
            return <AdCard GetAds={ad} />;
          })
        ) : (
          <p>No ad</p>
        )}
      </div>
      <div className="min-w-full flex justify-center ">
      <PaginationComponent TotoleCount={adsCount} PageSisze={PageSize} />
      </div>
    </>
  );
}
