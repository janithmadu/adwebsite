import { PostAd } from "@/lib/categoryInterface";
import React from "react";
import { ProfileAdCard } from "./ProfileAdCard";
import Image from "next/image";
import NoItem from "../../../../../public/rb_127823.png";
import PaginationComponent from "../AdsPriview/PaginationComponet/PaginationComponet";

interface MainProfileProps {
  UserAds: PostAd[]; // Expecting an array of PostAd objects
  resultCount:number
}

const MyAds: React.FC<MainProfileProps> = ({ UserAds,resultCount }) => {
  const PageSize = 10;
  return (
    <>
      <h1 className="text-grayscale900 font-bold text-bodyxl mb-3">My Ads</h1>
      <div
        className={` ${UserAds?.length > 0 ? "min-w-full  grid grid-cols-1 xl:grid-cols-2 gap-3 " : "grid grid-cols-1"}`}
      >
        {UserAds.length > 0 ? (
          UserAds.map((ad: PostAd, index: number) => {
            return (
              <div key={index} className="">
                <ProfileAdCard
                id={ad._id}
                  title={ad.adName}
                  category={ad.categoryTitle}
                  subcategory="Mobile Phones"
                  price={ad.price}
                  image={ad?.photos[0]?.asset?.url || "/"}
                  timestamp={ad._createdAt}
                  delteActive={true}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4 relative">
            <Image
              src={NoItem}
              alt="No Ads Available"
              width={160}
              height={160}
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Oops! No Pending Payment Ads.
            </h2>
          </div>
        )}
      </div>
      {UserAds.length > 0 && (
        <div className="min-w-full flex justify-center mt-6">
          <PaginationComponent TotoleCount={resultCount} PageSisze={PageSize} />
        </div>
      )}
    </>
  );
};

export default MyAds;
