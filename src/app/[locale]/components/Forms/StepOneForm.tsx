"use client";

import React, { useActionState, useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { AdResponse, stepOpneFormAction } from "../../addform/step01/action";
import { Authenticity, ConditionList, Currency } from "@/lib/statics";
import { getSubCategoriesByID } from "../../actions/getSubCategories";
import { getModelsById } from "../../actions/getModels";
import { getbrandsById } from "../../actions/getBrands";
import { getOptionsByID } from "../../actions/getOptions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingImage from "../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import FormHeader from "../../../../../public/AdForm.png";
import { FormStateNew, Option, Subcategory } from "@/lib/categoryInterface";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { SchemaAdPostForm } from "@/lib/schemas";
import { useRef } from 'react';
import { AnyARecord } from "dns";


function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
interface CategoryNew {
  id: string;
  title: {
    en: string; // English title
    ar: string; // Arabic title
  };
  slug: {
    current: string; // Current slug string
  };
  imageUrl?: string;
  description?: {
    en: string; // English description
    ar: string; // Arabic description
  };
  price: number; // Price of the category

  // Optional: Define GetCategory method if needed

  subcategories: Array<{
    _id: string;
    title: Array<string>;
    slug: Array<string>;
  }>;
}

const initionlState: FormStateNew = {
  ZodError: null,
  data: {
    name: "",
    category: "",
    subcategory: "",
    price: 0,
    brand: "",
    model: "",
    conditions: "",
    authenticity: "",
    mobile: "",
    description: "",
    image: "",
    options: [],
    formDataObject: {
      name: "",
      subcategory: "",
      price: 0,
      brand: "",
      model: "",
      conditions: "",
      authenticity: "",
      Currency: "",
      description: "",
      options: [],
      mobile: "",
      country: "",
      state: "",
      negotiable: "",
      features: [],
    },
  },
  message: null,
  status: false,
  response: {
    Currency: "",
    _createdAt: "",
    _id: "",
    _rev: "",
    _type: "",
  }, // Initialize response with empty values as needed
  zodErrors: {
    name: [], // Initialize with any required fields
  },
};

interface Countries {
  name?: string;
  code?: string;
}
interface CountriesGet {
  name: {
    common: string;
  };
  cca2?: string;
}

interface StepOneFormProps {
  categories: CategoryNew[]; // Expecting an array of CategoryNew
}

interface State {
  name: string;
}

interface SubCategory {
  _id?: string;
  title: {
    en: string | undefined;
    ar: string | undefined;
  };
}

interface Model {
  _id?: string;
  title: {
    en: string | undefined;
    ar: string | undefined;
  };
  value: {
    en: string | undefined;
    ar: string | undefined;
  };
}

interface Options {
  _id?: string;
  slug: {
    current: string;
    _type: string;
  };
  subcategories: {
    [key: string]: unknown;
  }[];
  title: {
    en: string;
    ar: string;
  };
  values: {
    [key: string]: unknown; // Replace `any` with the specific structure of each value if known
  }[];
}

interface OptionValues {
  ar?: string;
  en?: string;
  _key?: string;
  _type?: string;
}

interface Currency {
  title: {
    en: string | undefined;
    ar: string | undefined;
  };
  value: {
    en: string | undefined;
    ar: string | undefined;
  };
}

interface Brand {
  _id?: string;
  title: {
    en: string;
    ar: string;
  };
  values: {
    [key: string]: unknown; // Replace `any` with the specific structure of each value if known
  }[];
}

const StepOneForm: React.FC<StepOneFormProps> = ({ categories }) => {
  const [CategoriesID, setCategoriesID] = useState<string | undefined>();
  const [subCategoriesID, setsubCategoriesID] = useState<string | undefined>();
  const [subCategories, setsubCategories] = useState<
    Subcategory[] | undefined
  >();
  const [subBrands, setsubBrands] = useState<Brand[] | undefined>();
  const [Options, setOptions] = useState<Option[] | undefined>();
  const [Models, setModels] = useState<Model[] | undefined>();
  const [locale, setLocale] = useState<string>("en");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [ImageGet, setImage] = useState<string[]>([]);
  const [Countries, setCountries] = useState<Countries[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [State, setState] = useState<State[]>([]);
  const [PageLoader, setPageLoader] = useState<string | null>(null);
  const router = useRouter();
  const [features, setFeatures] = useState<string[]>([""]);
  const [AdPrice, setAdPrice] = useState<number>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //Get Category ID for retrive subcategories
  const handleInputChange = (e: string) => {
    const { id, price } = JSON.parse(e);
    setCategoriesID(id);
    setAdPrice(price);
  };

  //Get SubCategory ID for retrive Models,Brands,Options
  const handleSubCategoryChange = (e: string) => {
    setsubCategoriesID(e);
  };

  //Get the locales from cookies for navigate based on the locals
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

  //Get the subcategories by Category ID from sanity
  useEffect(() => {
    const getSubCategory = async () => {
      if (CategoriesID) {
        const response = await getSubCategoriesByID(CategoriesID);

        setsubCategories(response);
      }
    };
    getSubCategory();
  }, [CategoriesID]);

  //Get the Models by Subcategory ID from sanity
  useEffect(() => {
    const getModels = async () => {
      if (subCategoriesID) {
        const response = await getModelsById(subCategoriesID);
        setModels(response);
      }
    };
    getModels();
  }, [subCategoriesID]);

  //Get Brands By Subcategory ID
  useEffect(() => {
    const getBrands = async () => {
      if (subCategoriesID) {
        const response = await getbrandsById(subCategoriesID);
        setsubBrands(response);
      }
    };
    getBrands();
  }, [subCategoriesID]);

  //Get the Options by Subcategory ID from sanity
  useEffect(() => {
    const getOptions = async () => {
      if (subCategoriesID) {
        const response = await getOptionsByID(subCategoriesID);
        setOptions(response);
      }
    };
    getOptions();
  }, [subCategoriesID]);

  //Get Counties
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const countryList = countries.map((country: CountriesGet) => ({
        name: country?.name.common,
        code: country.cca2, // Country code (2-letter)
      }));

      setCountries(countryList);
    };

    getCountries();
  }, []);

  //Get Counties
  useEffect(() => {
    const getStateByCountry = async () => {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: selectedCountry }),
        }
      );
      const data = await response?.json();
      const states = data?.data?.states?.map((state: State) => ({
        name: state.name,
      }));

      setState(states);
    };

    getStateByCountry();
  }, [selectedCountry]);

  //Upload Image show it
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const filePreviews = files.map((file: File) => {
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

    const updatedPreviewUrlss = ImageGet.filter(
      (_: string, i: number) => i !== index
    );

    setImage(updatedPreviewUrlss);
   
  };


  const LoadingHandle = () => {
    setPageLoader("Loading");
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // Function to handle feature change
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Function to remove a feature section
  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const [lastResult, action] = useFormState(stepOpneFormAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: SchemaAdPostForm,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (form.status == "error") {
      setPageLoader("Error");
    }

    if (lastResult?.status == true) {
      setPageLoader("Loading Done");
      Swal.fire({
        title: "Congratulations!",
        text: lastResult?.message ?? "", // Provide a fallback to an empty string if message is null
        icon: "success",
        confirmButtonText: `Pay ${AdPrice} USD`,
        allowOutsideClick: false,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/${locale}/payments`); // Redirect to payments page on confirm
        }
      });

      localStorage.setItem("AdID", lastResult?.response._id);
    }
  });

  return (
    <div className=" flex flex-col gap-y-[20px] ">
      <div className=" min-h-[100px] rounded-xl relative">
        <Image alt="formHeader" src={FormHeader} className="rounded-xl min-h-[100px] min-w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-[32px]">Post Your Ad</h1>
        </div>
      </div>

      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="flex flex-col gap-y-[20px] "
      >
        {/* Name */}

        <div className="flex flex-col">
          <label className="text-grayscale900">Ad Name</label>
          <Input
            type="text"
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
            key={fields.name.key}
            className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
            placeholder="Ad name"
          ></Input>

          <p className="text-red-600">{fields.name.errors}</p>

          {/* Show error for name */}
        </div>

        {/* Name End */}

        {/* Category and  Subcategory*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col ">
            <label className="text-grayscale900">Category</label>
            <Select
              onValueChange={(e) => handleInputChange(e)}
              name={fields.category.name}
              defaultValue={fields.category.initialValue}
              key={fields.category.key}
            >
              <SelectTrigger className="  sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((selectData) => {
                  return (
                    <SelectItem
                      key={selectData?.id}
                      value={JSON.stringify({
                        id: selectData?.id,
                        price: selectData?.price,
                      })}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <p className="text-red-600">{fields.category.errors}</p>

            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Subcategory</label>
            <Select
              onValueChange={(e) => handleSubCategoryChange(e)}
              name={fields.subcategory.name}
              defaultValue={fields.subcategory.initialValue}
              key={fields.subcategory.key}
            >
              <SelectTrigger className="  sm:min-w-[451px]  min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subCategories?.map((selectData: SubCategory) => {
                  return (
                    <SelectItem
                      key={selectData._id}
                      value={selectData._id as string}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-red-600">{fields.subcategory.errors}</p>
            {/* Show error for name */}
          </div>
        </div>
        {/* Category and  Subcategory End*/}

        {/* Brands and  Models */}
        <div className="flex  flex-col lg:flex-row justify-between ">
          <div className="flex flex-col">
            <label className="text-grayscale900">Brands</label>
            <Select
              name={fields.brand.name}
              defaultValue={fields.brand.initialValue}
              key={fields.brand.key}
            >
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Brands" />
              </SelectTrigger>
              <SelectContent>
                {subBrands?.map((selectData: Brand) => {
                  return (
                    <SelectItem
                      key={selectData._id}
                      value={selectData?.title[locale as "en" | "ar"]}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-red-600">{fields.brand.errors}</p>
            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Models</label>
            <Select
              name={fields.model.name}
              defaultValue={fields.model.initialValue}
              key={fields.model.key}
            >
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Models" />
              </SelectTrigger>

              <SelectContent>
                {Models?.map((selectData: Model) => {
                  return (
                    <SelectItem
                      key={selectData._id}
                      value={selectData?.title[locale as "en" | "ar"] as string}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-red-600">{fields.model.errors}</p>
            {/* Show error for name */}
          </div>
        </div>

        {/* Brands and  Models End*/}

        {/* Conditions and  Currency */}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Conditions</label>
            <Select
              name={fields.conditions.name}
              defaultValue={fields.conditions.initialValue}
              key={fields.conditions.key}
            >
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Conditions" />
              </SelectTrigger>
              <SelectContent>
                {ConditionList?.map((selectData: Model) => {
                  return (
                    <SelectItem
                      key={selectData?.title[locale as "en" | "ar"]}
                      value={selectData?.value[locale as "en" | "ar"] as string}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-red-600">{fields.conditions.errors}</p>
            {/* Show error for name */}
          </div>

          <div className="flex gap-x-1">
            <div className="flex flex-col">
              <label className="text-grayscale900">Currency</label>
              <Select
                name={fields.Currency.name}
                defaultValue={fields.Currency.initialValue}
                key={fields.Currency.key}
              >
                <SelectTrigger className="max-w-[151px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>

                <SelectContent>
                  {Currency?.map((selectData: Currency) => {
                    return (
                      <SelectItem
                        key={selectData?.title[locale as "en" | "ar"]}
                        value={
                          selectData?.title[locale as "en" | "ar"] as string
                        }
                      >
                        {selectData?.title[locale as "en" | "ar"]}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <p className="text-red-600">{fields.Currency.errors}</p>
            </div>

            <div className="flex flex-col">
              <label className="text-grayscale900">Ad Prices</label>
              <Input
                type="text"
                name="price"
                placeholder="Pick a good price - what would you pay?"
                className={` max-w-[180px] sm:min-w-[354px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
              ></Input>
               <p className="text-red-600">{fields.Currency.errors}</p>
            </div>
          </div>
         
        </div>
        
        {/* Conditions and  Currency End*/}

        {/* Authenticity and  Mobile Number*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Authenticity</label>
            <Select
              name={fields.authenticity.name}
              defaultValue={fields.authenticity.initialValue}
              key={fields.authenticity.key}

              // //
            >
              <SelectTrigger className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select an Authenticity" />
              </SelectTrigger>

              <SelectContent>
                {Authenticity?.map((selectData: Model) => {
                  return (
                    <SelectItem
                      key={selectData?.title[locale as "en" | "ar"]}
                      value={selectData?.value[locale as "en" | "ar"] as string}
                    >
                      {selectData?.title[locale as "en" | "ar"]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-red-600">{fields.authenticity.errors}</p>
            {/* Show error for name */}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-grayscale900">Mobile Numbe</label>
              <Input
                type="text"
                name={fields.mobile.name}
                defaultValue={fields.mobile.initialValue}
                key={fields.mobile.key}
                placeholder="Ex: +96*********"
                className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] sm:min-w-[451px]`}
              ></Input>
              <p className="text-red-600">{fields.mobile.errors}</p>
              {/* Show error for name */}
            </div>
          </div>
        </div>

        {/* Authenticity and  Mobile Number End*/}

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Description</label>
          <textarea
            id="description"
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
            key={fields.description.key}
            rows={5}
            cols={50}
            placeholder="Ad description"
            className="border border-grayscale50 px-[18px] py-[12px] rounded-[5px]"
          />
          <p className="text-red-600">{fields.description.errors}</p>
          {/* Show error for name */}
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Options</label>
          <div className="flex gap-x-[20px] flex-wrap min-w-full">
            {Options?.map((option: Options, index: number) => {
              return (
                <div className="flex flex-col" key={index}>
                  <label className="text-grayscale900">
                    {option.title[locale as "en" | "ar"]}
                  </label>
                  <Select name={fields.options.name} key={fields.options.key}>
                    <SelectTrigger className="min-w-[351px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                      <SelectValue
                        placeholder={`Select ${option.title[locale as "en" | "ar"]}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {option.values?.map(
                        (value: OptionValues, index: number) => {
                          return (
                            <SelectItem
                              key={index}
                              value={JSON.stringify({
                                _key: value.en,
                                key: option.title[locale as "en" | "ar"],
                                value: value.en,
                              })}
                            >
                              {value[locale as "en" | "ar"]}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
          <p className="text-red-600">{fields.options.errors}</p>
          {/* Show error for name */}
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Images</label>
          {/* Input allows multiple files */}
          <Input
            type="file"
            accept="image/*"
            multiple
            className="    "
            name="image"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
           <p className="text-red-600"><span>{fields.image.errors}</span></p>

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
            {/* {formState?.zodErrors?.image && (
              <p className="text-red-600">{formState?.zodErrors?.image}</p>
            )}{" "} */}
            {/* Show error for name */}
          </div>
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row  gap-x-4">
            <div className="flex flex-col">
              <Select
                name={fields.country.name}
                defaultValue={fields.country.initialValue}
                key={fields.country.key}
                onValueChange={(e: string | undefined) => {
                  if (e !== undefined) {
                    setSelectedCountry(e);
                  }
                }}
              >
                <SelectTrigger className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder={`Select Country`} />
                </SelectTrigger>
                <SelectContent>
                  {Countries.map((country: Countries) => (
                    <SelectItem
                      key={country.code}
                      value={country.name as string}
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-red-600">{fields.country.errors}</p>
            </div>

            <div className="flex flex-col">
              <Select
                name={fields.state.name}
                defaultValue={fields.state.initialValue}
                key={fields.state.key}
              >
                <SelectTrigger className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder={`Select State`} />
                </SelectTrigger>
                <SelectContent>
                  {State?.map((state: State, index: number) => (
                    <SelectItem key={index} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-600">{fields.state.errors}</p>
            </div>

            <div className="flex items-center gap-x-3">
              <Checkbox
                name={fields.negotiable.name}
                defaultValue={fields.negotiable.initialValue}
                key={fields.negotiable.key}
                id="terms1"
              />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Negotiable
              </label>
              <p className="text-red-600">{fields.negotiable.errors}</p>
            </div>
          </div>
          {/* <div className="min-w-full min-h-[348px] rounded-[8px]" ref={MapRef} /> */}
        </div>
        <div>
          <label className="text-grayscale900">Ad Features</label>

          {/* Render feature input fields */}
          {features.map((feature, index) => (
            <div key={index} className="mb-4 flex gap-x-5 items-center">
              <Input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                name="features"
              />
              <button
                onClick={() => removeFeature(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Button to add a new feature */}
          <button
            onClick={addFeature}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="button"
          >
            Add Feature
          </button>
        </div>
        <div className="min-w-full flex justify-end">
          <button
            className={`min-w-[193px] min-h-[58px] bg-primary500 text-white rounded-[6px] flex justify-center items-center gap-x-[12px]}`}
            type="submit"
            onClick={LoadingHandle}
          >
            <span>Submit Ad</span>
          </button>
        </div>
      </form>
      <>
        {PageLoader === "Loading" ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="text-center">
              <Image alt="loader" src={LoadingImage} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default StepOneForm;
