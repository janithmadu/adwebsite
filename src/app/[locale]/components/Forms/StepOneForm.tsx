"use client";

import React, { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { stepOpneFormAction } from "../../addform/step01/action";
import { Authenticity, ConditionList, Currency } from "@/lib/statics";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ZodError } from "zod";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const INITIAL_STATE = {
  ZodError: null,
  data: {
    name: "",
    category: "",
    subcategory: "",
    price: "",
    brand: "",
    model: "",
    conditions: "",
    authenticity: "",
    mobile: "",
    description: "",
    image: "",
    options: "",
  },
  messege: null,
};

function StepOneForm({ GetCategory }: any) {
  const [formState, formAction] = useFormState<any>(stepOpneFormAction, {
    ZodError: null,
    data: {
      name: "",
      category: "",
      subcategory: "",
      price: "",
      brand: "",
      model: "",
      conditions: "",
      authenticity: "",
      mobile: "",
      description: "",
      image: "",
      options: "",
    },
    messege: null,
  });

  const [subCategories, setsubCategories] = useState<any | undefined>();
  const [subBrands, setsubBrands] = useState<any | undefined>();
  const [Models, setModels] = useState<any | undefined>();
  const [locale, setLocale] = useState<any>("en");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [Image, setImage] = useState<any>([]);

  //Get the locales from cookies for navigate based on the locals
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  // //Get the subcategories by Category ID from sanity
  // useEffect(() => {
  //   const getSubCategory = async () => {
  //     if (newAdd.category) {
  //       const response = await getSubCategoriesByID(newAdd.category);
  //       setsubCategories(response);
  //     } else {
  //       setsubCategories([]);
  //     }
  //   };
  //   getSubCategory();
  // }, [newAdd]);

  // //Get the Models by Subcategory ID from sanity
  // useEffect(() => {
  //   const getModels = async () => {
  //     if (newAdd.category) {
  //       const response = await getModelsById(newAdd.subcategory);
  //       setModels(response);
  //     } else {
  //       setModels([]);
  //     }
  //   };
  //   getModels();
  // }, [newAdd]);

  // useEffect(() => {
  //   const getModels = async () => {
  //     if (newAdd.category) {
  //       const response = await getModelsById(newAdd.subcategory);
  //       setModels(response);
  //     } else {
  //       setModels([]);
  //     }
  //   };
  //   getModels();
  // }, [newAdd]);

  // useEffect(() => {
  //   const getBrands = async () => {
  //     if (newAdd.category) {
  //       const response = await getbrandsById(newAdd.subcategory);
  //       setsubBrands(response);
  //     } else {
  //       setsubBrands([]);
  //     }
  //   };
  //   getBrands();
  // }, [newAdd]);

  //Upload Image show it
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = Array.from(e.target.files || []);

    const filePreviews = files.map((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(filePreviews).then((urls) => setPreviewUrls(urls));
  };

  //Remove Uploaded Image
  const handleDeleteImage = (index: number) => {
    const updatedPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedPreviewUrls);

    const updatedPreviewUrlss = Image.filter((_: any, i: any) => i !== index);

    setImage(updatedPreviewUrlss);
  };

  return (
    <div className="mt-[32px] flex flex-col gap-y-[20px] ">
      <form action={formAction} className="flex flex-col gap-y-[20px] ">
        {/* Name */}

        <div className="flex flex-col">
          <label className="text-grayscale900">Ad Name</label>
          <input
            type="text"
            name="name"
            placeholder="Ad name"
            className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
            defaultValue={formState?.data.name}
          ></input>
        </div>

        {/* Name End */}

        {/* Category and  Subcategory*/}
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <label className="text-grayscale900">Category</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="category"
              id="category"
              //onChange={handleInputChange}
            >
              <option value="" defaultValue={formState?.data.category}>
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

              // //
            >
              <option value="">Select Subcategory</option>
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
        {/* Category and  Subcategory End*/}

        {/* Brands and  Models */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Brands</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="brand"
              id="brand"

              // //
            >
              <option value="">Select Brands</option>
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

              // //
            >
              <option value="">Select Models</option>
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

        {/* Brands and  Models End*/}

        {/* Conditions and  Currency */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Conditions</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="conditions"
              id="conditions"
              // //
            >
              <option value="">Select Conditions</option>
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
                // //
              >
                <option value="">LKR</option>
                {Currency?.map((selectData: any) => {
                  return (
                    <option key={selectData.id} value={selectData.id}>
                      {selectData?.title[locale]}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-grayscale900">Ad Prices</label>
              <input
                type="text"
                name="price"
                placeholder="Pick a good price - what would you pay?"
                className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] min-w-[354px]`}
              ></input>
            </div>
          </div>
        </div>
        {/* Conditions and  Currency End*/}

        {/* Authenticity and  Mobile Number*/}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Authenticity</label>
            <select
              className="min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              name="Authenticity"
              id="Authenticity"
              // //
            >
              <option value="">Select an Authenticity</option>
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
            <div className="flex flex-col">
              <label className="text-grayscale900">Mobile Numbe</label>
              <input
                type="text"
                name="mobile"
                placeholder="Ex: +96*********"
                className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] min-w-[451px]`}
              ></input>
            </div>
          </div>
        </div>

        {/* Authenticity and  Mobile Number End*/}

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            cols={50}
            placeholder="Ad description"
            className="border border-grayscale50 px-[18px] py-[12px] rounded-[5px]"
          />
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Options</label>
          <div className="flex gap-x-[20px] flex-wrap min-w-full"></div>
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Images</label>
          {/* Input allows multiple files */}
          <input
            type="file"
            accept="image/*"
            multiple
            className="border-[#EDEFF5] rounded-[5px] border p-5 "
            name="image"
            onChange={handleImageChange}
          />

          {/* Display previews for all selected images */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {previewUrls.map((url, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt={`Selected Image ${index + 1}`}
                  style={{ maxWidth: "100px" }}
                />

                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-[5px] right-[5px] bg-danger700 text-white rounded-full  w-[25px] h-[25px]"
                >
                  <div className="">
                    <h1>X</h1>
                  </div>
                </button>
              </div>
            ))}
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
