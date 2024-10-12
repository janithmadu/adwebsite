"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAdsBySub, getPostAds } from "@/app/[locale]/actions/getAds";
import Image from "next/image";
import AdCard from "../../Ads/AdCard";

export default function FilterBySubs() {
  const [ads, setAds] = useState<any>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const subcategoryQuery = searchParams.get("subcategories");
    const queryObject = Object.fromEntries(searchParams.entries());

    if (Object.keys(queryObject).length !== 0) {
      const getAdsBySubs = async () => {
        const subads = await getAdsBySub(queryObject);

        setAds(subads);
      };
      getAdsBySubs();
    } else {
      const getAllBySubs = async () => {
        const subads = await getPostAds();

        setAds(subads);
      };

      getAllBySubs();
    }
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 xl:ml-14 md:gap-x-36 gap-x-32 gap-y-6  lg:grid-cols-2 xl:grid-cols-3  sm:grid-cols-2 xl:gap-x-32 place-items-center place-content-center ">
      {ads.length > 0 ? (
        ads.map((ad: any) => {
          return <AdCard GetAds={ad} />;
        })
      ) : (
        <p>No ad</p>
      )}
    </div>
  );
}
