import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cookies } from "next/headers";
import Image from "next/image";
import AddSubcategory from "./AddSubcategory";
import { Category } from "@/lib/categoryInterface";

interface Categories {
  Categories: Category[];
}

interface SubcategoryNew {
  _id: string;
  title: string[]; // Updated to string[] to match data structure
}



const AdsCategory: React.FC<Categories> = ({ Categories }) => {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "en") as "en" | "ar";
  const localeIndex = locale === "ar" ? 1 : 0; // Assume the array has `en` at index 0 and `ar` at index 1
  return (
    <>
      {Categories.map((category: Category, index: number) => {
        return (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Image
                  alt="categoryImages"
                  width={40}
                  height={40}
                  src={category?.imageUrl || "/default-image.jpg"}
                />
                {category.title?.[locale as "ar" | "en"]}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {category.subcategories.map((subcate:SubcategoryNew) => {
                    <AddSubcategory
                      subcatotitle={subcate.title[localeIndex]}
                      subcatoId={subcate._id}
                    />;

                    // Handle cases where subcate does not conform to SubcategoryNew
                    return null; // or some fallback UI
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export default AdsCategory;
