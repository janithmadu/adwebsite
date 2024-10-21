"use client";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";
import { useNewAddContext } from "../../contexts/AddContext";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function Select({
  lable,
  id,
  description,
  required,
  type,
  minLength,
  min,
  max,
  errorMsg,
  SelectData,
}: any) {
  const [locale, setLocale] = useState("en");

  const { updateNewAdd, newAdd } = useNewAddContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateNewAdd({ ...newAdd, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  return (
    <div className="flex flex-col">
      <label className="text-grayscale900">{lable}</label>
      <select
        className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
        name={id}
        id={id}
        onChange={handleInputChange}
        defaultValue={newAdd[id]}
        
      >
        <option >Select</option>
        {SelectData?.map((selectData: any) => {
          return (
            <option key={selectData.id} value={selectData.id}>
              {selectData?.title[locale]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
