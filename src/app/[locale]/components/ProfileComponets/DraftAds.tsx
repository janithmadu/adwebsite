import { PostAd } from "@/lib/categoryInterface";
import React from "react";
import { ProfileAdCard } from "./ProfileAdCard";
import NoItem from "../../../../../public/rb_127823.png";
import Image from "next/image";
interface MainProfileProps {
  UserAds: PostAd[]; // Expecting an array of PostAd objects
}

// function getCookie(name: string) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
// }

const DraftAds: React.FC<MainProfileProps> = ({ UserAds }) => {
  // const [locale, setLocale] = useState("en");
  // useEffect(() => {
  //   const cookieLocale = getCookie("NEXT_LOCALE") || "en";
  //   setLocale(cookieLocale);
  // }, []);

  return (
    <div
      className={` ${UserAds?.length > 0 ? "min-w-full  grid grid-cols-2 gap-3 " : "grid grid-cols-1"}`}
    >
      {UserAds.length > 0 ? (
        UserAds.map((ad: PostAd, index: number) => {
          return (
            <div key={index} className="">
              <ProfileAdCard
                title={ad.adName}
                category={ad.categoryTitle}
                subcategory="Mobile Phones"
                price={ad.price}
                image={ad?.photos[0]?.asset?.url || "/"}
                timestamp={ad._createdAt}
                paymentPending={true}
                adprice={ad.category.price}
                id={ad._id}
              />
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center text-gray-500 space-y-4 relative">
          <Image src={NoItem} alt="No Ads Available" width={160} height={160} />
          <h2 className="text-2xl font-semibold text-gray-700">
            Oops! No Pending Payment Ads.
          </h2>
        </div>
      )}
    </div>
  );
};

export default DraftAds;
