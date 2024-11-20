import React from "react";
import { getAllCategory } from "../../actions/getCategories";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cookies } from "next/headers";
import { Category } from "@/lib/categoryInterface";
import HomePageAdContainer from "./HomePageAdContainer";
import { GetAdByCategory } from "../../actions/getAds";

export default async function HomePagecard() {
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
              <CarouselPrevious className="bg-primary600 text-white hidden md:flex   " />
              <CarouselNext className="bg-primary600 text-white hidden md:flex" />
            </Carousel>
          </div>
        </div>
      ))}
    </>
  );
}
