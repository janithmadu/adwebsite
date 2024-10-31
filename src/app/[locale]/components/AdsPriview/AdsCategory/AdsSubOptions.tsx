"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const AdsSubOptions = ({ Options }: any) => {
  const [locale, setLocale] = useState("en");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hold selected subcategories based on the query parameters
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);

  // Sync checkboxes with the URL query parameters
  useEffect(() => {
    const querySubOptions = searchParams.get("subOptions");
    if (querySubOptions) {
      setSelectedSubOptions(querySubOptions.split(","));
    } else {
      setSelectedSubOptions([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, optionValue: string) => {
    const isChecked = e.target.checked;
    let updatedSubOptions = [...selectedSubOptions];

    if (isChecked) {
      updatedSubOptions.push(optionValue);
    } else {
      updatedSubOptions = updatedSubOptions.filter((id) => id !== optionValue);
    }

    setSelectedSubOptions(updatedSubOptions);

    // Get existing query parameters and convert them to an object
    const params = new URLSearchParams(window.location.search);

    // Set or update the subOptions parameter
    if (updatedSubOptions.length > 0) {
      params.set("subOptions", updatedSubOptions.join(","));
    } else {
      params.delete("subOptions");
    }

    // Update the URL with all query parameters
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      {Options.map((option: any, index: number) => {
        return (
          <div key={index}>

          <Accordion  type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{option.title?.[locale]}</AccordionTrigger>
              <AccordionContent>
                {option?.values?.map((value: any) => {
                  const optionValue = value[locale];
                  return (
                    <ul key={value[locale]} className="no-bullets">
                    <li>
                      <label className="inline-flex items-center ">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedSubOptions.includes(optionValue)}
                          onChange={(e) => handleOptionChange(e, optionValue)}
                          />
                        <span className="ml-2">{optionValue}</span>
                      </label>
                    </li>
                    </ul>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
                </div>
        );
      })}
    </>
  );
};

export default AdsSubOptions;
