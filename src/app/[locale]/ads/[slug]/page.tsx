import Image from "next/image";
import HeaderSection from "../../components/Ads/SingleAds/HeaderSection";
import ImageGallery from "../../components/Ads/SingleAds/ImageGallery";
import ContactSection from "../../components/Ads/SingleAds/ContactSection";
import SellerInfo from "../../components/Ads/SingleAds/SellerInfo";
import Map from "../../components/Ads/SingleAds/Map";
import DescriptionAds from "../../components/Ads/SingleAds/DescriptionAds";
import Reletedads from "../../components/Ads/SingleAds/Reletedads";
import { getAdById } from "../../actions/getAds";
import { Heart, IdentificationBadge } from "@phosphor-icons/react/dist/ssr";
import PriceSection from "../../components/Ads/SingleAds/PriceSection";

export const revalidate = 1;

export default async function AdDetailsPage({ searchParams }: any) {
  console.log(searchParams);
  
  const GetAdByID = await getAdById("e20883c2-2125-4d9d-9ef9-12f2edbff100");
  const adTitile = GetAdByID[0]?.adName;
  const AddCratedDate = GetAdByID[0]?._createdAt;
  const Price = GetAdByID[0]?.price;
  const currency = GetAdByID[0]?.Currency;
  const Options = GetAdByID[0]?.options;
  const Description = GetAdByID[0]?.description;

  return (
    <div className="container mx-auto  px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-10 flex ">
      <div className="flex-1 min-w-[872px] flex flex-col gap-x-[36px] ">
        <HeaderSection Titile={adTitile} CreatedDate={AddCratedDate} />

        <ImageGallery Images={GetAdByID[0].photos} />
        <DescriptionAds Options={Options} Description={Description} />
      </div>

      <div className="flex-1  min-w-[424px]">
        <div className="w-[424px]  border  py-[36px] rounded-[12px]">
          <PriceSection Price={Price} Currency={currency} />
          <div className="px-[32px] mt-[32px]">
            {/* Contact Buttons */}
            <ContactSection />
          </div>

          <div className="mt-[32px]">
            <div className="px-[32px] border-t border-b mt-[32px] py-[32px]">
              <SellerInfo />
            </div>

            <div className="px-[32px] py-[32px] flex flex-col gap-y-[18px]">
              <h1 className="text-grayscale900 text-bodylarge">Ads Location</h1>
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
