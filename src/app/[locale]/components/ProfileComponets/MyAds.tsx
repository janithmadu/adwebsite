import { PostAd } from "@/lib/categoryInterface";
import React from "react";
import { ProfileAdCard } from "./ProfileAdCard";

interface MainProfileProps {
  UserAds: PostAd[]; // Expecting an array of PostAd objects
}

const MyAds: React.FC<MainProfileProps> = ({ UserAds }) => {


  return (
    <div className="min-w-full  grid grid-cols-2 gap-3">
      {UserAds.map((ad: PostAd, index: number) => {

        return (
          <div key={index} className="">
            <ProfileAdCard
              title={ad.adName}
              category={ad.categoryTitle}
              subcategory="Mobile Phones"
              price={ad.price}
              image={ad?.photos[0]?.asset?.url }
              timestamp={ad._createdAt}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MyAds;
