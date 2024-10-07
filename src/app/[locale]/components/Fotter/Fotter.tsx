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
function Fotter() {
  return (
    <div className="min-w-full min-h-[696px] bg-grayscale900">
      <div className="min-w-full min-h-full  border-b border-grayscale800">
        <div className="max-h-[208]  container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10">
          <div className=" flex lg:flex-row flex-col items-center py-[50px] justify-between gap-5 ">
            <div className="flex   flex-col space-y-[20px] lg:mb-0 max-w-[424px]">
              <h1 className=" lg:text-start text-center  text-heading02 text-grayscalewhite ">
                Subscribe to our newsletter
              </h1>
              <p className=" lg:text-start text-center text-wrap text-bodymedium text-grayscalewhite">
                Vestibulum consectetur placerat tellus. Sed faucibus fermentum
                purus, at facilisis.
              </p>
            </div>

            <div className="relative flex space-x-4 ">
              {/* Search Icon Image */}
              <Envelope className=" absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 min-w-[34px] min-h-[34px] " />
              {/* Search Icon Image End*/}

              {/* Search Bar */}
              <input
                type="text"
                className="  md:inline px-10 xl:min-w-[633px] md:min-w-[533px] lg:min-w-[380px] max-w-[210px]  min-h-[68px] rounded-[5px] bg-grayscale800"
                placeholder=""
              />
              {/* Search Bar End */}

              <button className="text-heading04 text-grayscalewhite min-w-[113px] min-h-[50px] bg-primary500 rounded-[4px] ">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="   items-center min-h-[414px] flex flex-col justify-center ">
        <div className="min-h-[216px]  min-w-full flex items-center  ">
          <div className="container mx-auto  px-5  lg:px-20 xl:px-64 md:px-10  grid  lg:grid-cols-4  md:grid-cols-2  xl:grid-cols-5 min-w-full lg:place-items-center  min-h-[216px]">
            <div className="min-w-[347px] max-h-[216px]  flex justify-start items-center">
              <div className="flex flex-col min-h-[216px] space-y-[32px]">
                <h1 className="text-heading02 font-bold text-grayscalewhite">
                  <span className="text-primary600">G</span>oshop
                </h1>

                <div className="min-w-[347px] min-h-[120px]">
                  <div className="max-w-[312px] max-h-[47px] flex flex-col space-y-[12px]">
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </p>
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      Phone: (405) 555-0128
                    </p>
                    <p className="text-bodymedium text-grayscale500 text-wrap">
                      Mail: Adfinity@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">Supports</h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                <h1 className="text-grayscale500 text-bodymedium">Contact</h1>
                <h1 className="text-grayscale500 text-bodymedium">FAQs</h1>
                <h1 className="text-grayscale500 text-bodymedium">
                  Pricing Plans
                </h1>
                <h1 className="text-grayscale500 text-bodymedium">Sitemap</h1>
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">
                Quick Links
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                <h1 className="text-grayscale500 text-bodymedium">Contact</h1>
                <h1 className="text-grayscale500 text-bodymedium">FAQs</h1>
                <h1 className="text-grayscale500 text-bodymedium">
                  Pricing Plans
                </h1>
                <h1 className="text-grayscale500 text-bodymedium">Sitemap</h1>
              </div>
            </div>
            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">Category</h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[8px] flex-col">
                <h1 className="text-grayscale500 text-bodymedium">Contact</h1>
                <h1 className="text-grayscale500 text-bodymedium">FAQs</h1>
                <h1 className="text-grayscale500 text-bodymedium">
                  Pricing Plans
                </h1>
                <h1 className="text-grayscale500 text-bodymedium">Sitemap</h1>
              </div>
            </div>

            <div className="min-w-[175px] min-h-[216px] flex flex-col space-y-[32px]  justify-center items-start ">
              <h1 className="text-grayscalewhite text-bodylarge">
                Download our app
              </h1>
              <div className="min-w-[94px] min-h-[152px] flex space-y-[32px] flex-col">
                <div className="flex space-x-[16px]">
                  <Image alt="AppStore" src={AppStore} />
                  <Image alt="AppStore" src={AppStore} />
                </div>

                <div className="flex space-x-[12px]">
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
      <div className="container mx-auto  px-5  lg:px-20 xl:px-56 md:px-10   min-w-full  min-h-[72px] bg-grayscale800 flex items-center justify-between ">
        <h1 className="text-bodymedium text-gray-500">Adfinity - Classified Listing © 2024. Design by <span className="text-grayscalewhite">Infinite Open</span></h1>
        <div className="flex text-grayscale500 space-x-[29px]" >
          <Link href="" >Privacy Policy</Link>
          <Link href="" >Terms & Condition</Link>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
