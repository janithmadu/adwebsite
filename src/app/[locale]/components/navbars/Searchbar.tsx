"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import SearcICon from "../../../../../public/fi_search.svg";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

interface SearchStyle{
  searchStyle:string
}

const Searchbar = (searchStyle:SearchStyle) => {
 
  
  const t = useTranslations("TopNav");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setQuery(searchText);

    if (searchText.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchText }),
      });

   

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="relative">
        <Image
          alt="Search Icon"
          src={SearcICon}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className= {`${searchStyle.searchStyle} px-10 min-w-full  xl:min-w-[536px] lg:min-w-[536px] min-h-[52px] border-[#EBEEF7] border rounded-[5px]`}
          placeholder={t("SearchBarPlaceHolder")}
        />
      </div>

      {query && (
        <div className="absolute z-10 bg-white shadow-md rounded-lg mt-16 w-full xl:min-w-[536px] lg:min-w-[536px] max-h-60 overflow-auto">
          {loading && <p className="p-2 text-gray-500">Loading.....</p>}
          {!loading && results.length === 0 && (
            <p className="p-2 text-gray-500">No results found</p>
          )}
          {results.map((item: any) => (
            <Link key={item._id} href={`/${locale}/ads/${item._id}`}>
              <div
                
                className="p-3 border-b cursor-pointer hover:bg-gray-100 flex gap-x-3"
              >
                <Image
                  width={50}
                  height={50}
                  alt="sdf"
                  src={item.image[0].url}
                />
                <div className="flex gap-y-1 flex-col">
                  <h3 className="font-bold">{item.adName}</h3>
                  <div className="flex gap-x-1 text-bodytiny font-semibold">
                    <h3 className="">{item.Currency}</h3>
                    <h3 className="">{item.price}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
