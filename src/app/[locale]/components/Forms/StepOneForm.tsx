"use client";

import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useFormState } from "react-dom";
import { FromErrors } from "@/lib/types";
import { stepOpneFormAction } from "../../addform/step01/action";
import { toast, useToast } from "@/hooks/use-toast";
import { Authenticity, ConditionList, Currency } from "@/lib/statics";
import { useNewAddContext } from "../../contexts/AddContext";
import { getSubCategoriesByID } from "../../actions/getSubCategories";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getModelsById } from "../../actions/getModels";
import { getbrandsById } from "../../actions/getBrands";

const initiateState: FromErrors = {};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function StepOneForm({ GetCategory }: any) {
  const [serverError, formAction] = useFormState<any>(
    stepOpneFormAction,
    initiateState
  );
  const [subCategories, setsubCategories] = useState<any | undefined>();
  const [subBrands, setsubBrands] = useState<any | undefined>();
  const [Models, setModels] = useState<any | undefined>();
  const serverErrorPre: any = serverError?.errors?.message;
  const [locale, setLocale] = useState<any>("en");
  const { updateNewAdd, newAdd } = useNewAddContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateNewAdd({ ...newAdd, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (serverErrorPre) {
      if (serverErrorPre === "Required") {
        toast({
          title: "Action Need",
          description: serverError?.errors?.path[0] + "\t" + serverErrorPre,
        });
      } else {
        toast({
          title: "Action Need",
          description: serverErrorPre,
        });
      }
    }
  }, [serverError]);

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  useEffect(() => {
    const getSubCategory = async () => {
      if (newAdd.category) {
        const response = await getSubCategoriesByID(newAdd.category);
        setsubCategories(response);
      } else {
        setsubCategories([]);
      }
    };
    getSubCategory();
  }, [newAdd]);

  useEffect(() => {
    const getModels = async () => {
      if (newAdd.category) {
        const response = await getModelsById(newAdd.subcategory);
        setModels(response);
      } else {
        setModels([]);
      }
    };
    getModels();
  }, [newAdd]);

  useEffect(() => {
    const getModels = async () => {
      if (newAdd.category) {
        const response = await getModelsById(newAdd.subcategory);
        setModels(response);
      } else {
        setModels([]);
      }
    };
    getModels();
  }, [newAdd]);

  useEffect(() => {
    const getBrands = async () => {
      if (newAdd.category) {
        const response = await getbrandsById(newAdd.subcategory);
        setsubBrands(response);
      } else {
        setsubBrands([]);
      }
    };
    getBrands();
  }, [newAdd]);

  return (
    <div className="mt-[32px] flex flex-col gap-y-[20px] ">
      <form action={formAction} className="flex flex-col gap-y-[20px] ">
        <Input
          lable="Ad Name"
          description="Ad name"
          min={2}
          type="text"
          id="name"
        />

        <div className="flex justify-between">
          <div className="flex flex-col ">
            <label className="text-grayscale900">Category</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="category"
              id="category"
              onChange={handleInputChange}
              defaultValue={newAdd.category}
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {GetCategory?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData.id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Subcategory</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="subcategory"
              id="subcategory"
              defaultValue={newAdd.category}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Subcategory
              </option>
              {subCategories?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData._id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Brands</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="brand"
              id="brand"
              defaultValue={newAdd.category}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Brands
              </option>
              {subBrands?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData._id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Models</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="model"
              id="model"
              defaultValue={newAdd.category}
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Models
              </option>
              {Models?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData._id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Conditions</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="conditions"
              id="conditions"
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select Conditions
              </option>
              {ConditionList?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData.id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex gap-x-1">
            <div className="flex flex-col">
              <label className="text-grayscale900">Currency</label>
              <select
                className="max-w-[151px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                name="Currency"
                id="Currency"
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  LKR
                </option>
                {Currency?.map((selectData: any) => {
                  return (
                    <option key={selectData.id} value={selectData.id}>
                      {selectData?.title[locale]}
                    </option>
                  );
                })}
              </select>
            </div>
            <Input
              lable="Ad Prices (USD)"
              description="Pick a good price - what would you pay?"
              id="price"
              className="min-w-[354px]"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Authenticity</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="Authenticity"
              id="Authenticity"
              onChange={handleInputChange}
            >
              <option value="" disabled selected>
                Select an Authenticity
              </option>
              {Authenticity?.map((selectData: any) => {
                return (
                  <option key={selectData.id} value={selectData.id}>
                    {selectData?.title[locale]}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-between">
            <Input
              lable="Mobile Number"
              description="Ex: +96*********"
              id="mobile"
              className="min-w-[451px]"
            />
          </div>
        </div>

        <div className="min-w-full flex justify-end">
          <button
            className={`min-w-[193px] min-h-[58px] bg-primary500 text-white rounded-[6px] flex justify-center items-center gap-x-[12px]}`}
            type="submit"
          >
            <span>Next Steps</span> <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default StepOneForm;
