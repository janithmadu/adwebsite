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

function AdsCategory({Categories,subcateId}:any) {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  
  return (
    <>
      {Categories.map((category: any, item: any) => {
        return (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Image
                  alt="categoryImages"
                  width={40}
                  height={40}
                  src={category.imageUrl}
                />
                {category.title?.[locale]}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {category.subcategories.map((subcate: any, index: any) => {
                  

                    return (
                      <>
                        <AddSubcategory
                          subcatotitle={subcate.title[locale]}
                          subcatoId={subcate._id}
                        />
                      </>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}

export default AdsCategory;
