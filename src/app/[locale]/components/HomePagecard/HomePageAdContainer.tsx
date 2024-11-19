"use client";
import React, { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { CarouselItem } from "@/components/ui/carousel";
import { GetAdByCategory } from "../../actions/getAds";
import { PostAd } from "@/lib/categoryInterface";

interface CateID {
  cateid: any;
}

const HomePageAdContainer = ({ cateid }: any) => {
  const [ad, setAds] = useState<any>();
  useEffect(() => {
    const getAds = async () => {
      const ads = await GetAdByCategory(cateid);
      setAds(ads);
    };

    getAds();
  }, [cateid]);

  console.log(ad);

  return (
    <>
      {ad?.map((data: PostAd, index: any) => (
        <CarouselItem
          className=" basis-1/1 md:basis-1/3 xl:basis-1/4"
          key={index}
        >
          <CarCard
          id={data._id}
            brand={data.brand}
            duration={data._createdAt}
            image={data.image[0].url}
            location={data.state}
            name={data.adName}
            price={data.price}
            km={data.model}
            currancy={data.Currency}
          />
        </CarouselItem>
      ))}
    </>
  );
};

export default HomePageAdContainer;
