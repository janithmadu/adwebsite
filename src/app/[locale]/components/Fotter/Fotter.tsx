import {
  Envelope,
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import AppStore from "../../../../../public/App Store (2).png";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/logo.png";
import { cookies } from "next/headers";
import { getlimitedCategoryFooter } from "../../actions/getCategories";
import { AppStoreButtons } from "./app-store-buttons";

interface Category {
  id?: string;
  title?: { en: string; ar: string };
  slug?: { current: string };
  imageUrl?: string;
  price?: number;
}

async function Fotter() {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const getLimitedCate = await getlimitedCategoryFooter();
  return (
    <div className="min-w-full min-h-[486px] bg-grayscale900">
      <div className="items-center min-h-[414px] flex flex-col justify-center ">
        <div className="min-h-[216px]  min-w-full flex items-center  ">
          <div className="container mx-auto  p-5  lg:px-20 xl:px-64 md:px-10  grid     sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 min-w-full xl:place-items-center  min-h-[216px]">
            <div className="min-w-[124px] md:min-w-[347px] max-h-[216px]  flex justify-start items-center ">
              <div className="flex flex-col min-h-[216px] space-y-[32px]">
                <h1 className="text-heading02 font-bold text-grayscalewhite">
                  <Image
                    src={Logo}
                    width={100}
                    height={0}
                    className=""
                    alt="Logo"
                  ></Image>
                </h1>

                <div className="min-w-[124px] md:min-w-[347px] min-h-[120px] ">
                  <div className="max-w-[312px] max-h-[47px] flex flex-col space-y-[12px] ">
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      Address: Arzaq Kuwait jahra
                    </p>
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      Phone: 96597397310+
                    </p>
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      Mail: info@q8arzaq.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">Supports</h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                <Link
                  href={`/${locale}/contact`}
                  className="text-grayscale500 text-bodymedium"
                >
                  Contact
                </Link>
                <Link
                  href={`/${locale}/faqs`}
                  className="text-grayscale500 text-bodymedium"
                >
                  FAQs
                </Link>
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">
                Quick Links
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                <Link
                  href={`/${locale}/about`}
                  className="text-grayscale500 text-bodymedium"
                >
                  About Us
                </Link>
                <Link
                  href={`/${locale}/addform/step01`}
                  className="text-grayscale500 text-bodymedium"
                >
                  Post a Ads
                </Link>

                <Link
                  href={`/${locale}/ads?page=1`}
                  className="text-grayscale500 text-bodymedium"
                >
                  All Ads
                </Link>
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">Category</h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col ">
                {getLimitedCate.length === 0 ? (
                  <div className="text-grayscale600  text-heading04 hover:text-grayscale800 hover:font-bold">
                    {" "}
                    You have no category
                  </div>
                ) : (
                  getLimitedCate.map((item: Category, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`${locale ? `/${locale}` : ""}/ads?page=1&category=${item?.slug?.current}`}
                        className="text-grayscale500 text-bodymedium"
                      >
                        {item.title?.[(locale as "en") || "ar"]}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">
                Download our app
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[32px] flex-col ">
                <div className="flex space-x-[16px]">
                <AppStoreButtons />
                </div>

                <div className="flex space-x-[12px] ">
                  <FacebookLogo className="text-gray-500 w-[26px] h-[26px] " />
                  <TwitterLogo className="text-gray-500 w-[26px] h-[26px] " />
                  <FacebookLogo className="text-gray-500 w-[26px] h-[26px] " />
                  <YoutubeLogo className="text-gray-500 w-[26px] h-[26px] " />
                  <LinkedinLogo className="text-gray-500 w-[26px] h-[26px] " />
                  <WhatsappLogo className="text-gray-500 w-[26px] h-[26px] " />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto  px-5  lg:px-20 xl:px-56 md:px-10   min-w-full  min-h-[72px] bg-grayscale800 flex items-center justify-between md:flex-row flex-col text-center md:text-start ">
        <h1 className="text-bodymedium text-gray-500">
          Arzaq - Classified Listing © 2024. Design by{" "}
          <span className="text-grayscalewhite">Infinite Open</span>
        </h1>
        <div className="flex text-grayscale500 space-x-[29px]">
          <Link href={`/${locale}/privacy`}>Privacy Policy</Link>
          <Link href={`/${locale}/terms`}>Terms & Condition</Link>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
