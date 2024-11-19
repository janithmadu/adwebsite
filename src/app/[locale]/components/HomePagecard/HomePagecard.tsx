import React from "react";
import { getAllCategory } from "../../actions/getCategories";

interface HomePagecardInterface {
  imageUrl: string;
  title: string;
  location: string;
  specs: string;
  price: number;
  duration: string;
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarCard } from "./CarCard";
import { cookies } from "next/headers";
import { Category } from "@/lib/categoryInterface";
import HomePageAdContainer from "./HomePageAdContainer";
import {
  GetAdByCategory,
  getAllPostAds,
  getPostAds,
} from "../../actions/getAds";

const cars = [
  {
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800",
    location: "Mubarak Al-Kabeer",
    name: "كامارو موديل ٢٠١٦ LE١ لون احمر",
    year: 2016,
    km: 146,
    color: "Red",
    price: "4,600 KWD",
    duration: "3 Day",
    featured: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1558383817-6a5d00b668ce?auto=format&fit=crop&w=800",
    location: "Hawalli",
    name: "سييرا دينالي HD SLE وايت ٢٥٠٠",
    year: 2017,
    km: 30,
    color: "Black",
    price: "9,000 KWD",
    duration: "3 Day",
    featured: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800",
    location: "West Abu Ftrah",
    name: "باترول VTC سفاري",
    year: 2016,
    km: 145,
    color: "Black",
    price: "5,400 KWD",
    duration: "12 Hour",
  },
  {
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800",
    location: "Mubarak Al-Kabeer",
    name: "نيسان باترول سفاري",
    year: 2009,
    km: 390,
    color: "White",
    price: "3,300 KWD",
    duration: "1 Month",
    featured: true,
  },
];

export default async function HomePagecard({
  imageUrl,
  title,
  location,
  specs,
  price,
  duration,
}: HomePagecardInterface) {
  const category = await getAllCategory();
  const cookieStore = cookies();
  const locale: string = cookieStore.get("NEXT_LOCALE")?.value || "en";

  // Fetch ads for all categories
  const categoriesWithAds = await Promise.all(
    category.map(async (category: Category) => {
      const ads = await GetAdByCategory(category.id); // Assuming this function fetches ads for a given category
      return ads.length > 0 ? category : null; // Include only categories with ads
    })
  );

  // Filter out null values (categories without ads)
  const filteredCategories = categoriesWithAds.filter(Boolean);

  return (
    <>
      {filteredCategories.map((data: Category, index: number) => (
        <div
          key={index}
          className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3 "
        >
          <div className="flex flex-col gap-y-3">
            <h1 className="text-bodyxl font-bold">
              All in{" "}
              <span className="text-primary600">
                {data.title[(locale as "en") || "ar"]}
              </span>
            </h1>
            <Carousel>
              <CarouselContent className="-ml-4">
                <HomePageAdContainer cateid={data.id} />
              </CarouselContent>
              <CarouselPrevious className="bg-primary600 text-white   "/>
              <CarouselNext className="bg-primary600 text-white " />
            </Carousel>
          </div>
        </div>
      ))}
    </>
  );
}
