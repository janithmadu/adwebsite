"use client";

import React, { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { stepOpneFormAction } from "../../addform/step01/action";
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

import { parseWithZod } from "@conform-to/zod";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { CldUploadWidget } from "next-cloudinary";
import { FieldValues, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

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
  const t = useTranslations("TopNav");
  const [ImagesArray, setImages] = useState<string[]>([]);
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

  // useEffect(() => {
  //   if (form.status == "error") {
  //     setPageLoader("Error");
  //   }

  //   if (lastResult?.status == true) {
  //     setPageLoader("Loading Done");
  //     Swal.fire({
  //       title: "Congratulations!",
  //       text: lastResult?.message ?? "", // Provide a fallback to an empty string if message is null
  //       icon: "success",
  //       confirmButtonText: `Pay ${AdPrice} USD`,
  //       allowOutsideClick: false,
  //       allowEscapeKey: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push(`/${locale}/payments`); // Redirect to payments page on confirm
  //       }
  //     });

  //     localStorage.setItem("AdID", lastResult?.response._id);
  //   }
  // });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    getValues,
  } = useForm({
    resolver:zodResolver(SchemaAdPostForm)
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    
    const dataToSend = { ...data, images: ImagesArray, featurs: features };
    await fetch("/api/createad", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className=" flex flex-col gap-y-[20px] ">
      <div className=" min-h-[100px] rounded-xl relative">
        <Image
          alt="formHeader"
          src={FormHeader}
          className="rounded-xl min-h-[100px] min-w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-[32px]">{t("PostYourAd")}</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[20px] "
      >
        {/* Name */}

        <div className="flex flex-col">
          <label className="text-grayscale900">{t("AdName")}</label>
          <Input
            {...register("name")}
            type="text"
            name="name"
            className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
            placeholder={t("AdName")}
          ></Input>

          {errors.name && (
            <p className="text-red-600">{`${errors.name.message}`}</p>
          )}

          {/* Show error for name */}
        </div>

        {/* Name End */}

        {/* Category and  Subcategory*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col ">
            <label className="text-grayscale900">{t("Category")}</label>
            <select
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              {...register("category")}
              onChange={(e) => handleInputChange(e.target.value)}
            >
              <option value="" disabled selected>
                {t("SelectCategory")}
              </option>
              {categories?.map((selectData) => (
                <option
                  key={selectData?.id}
                  value={JSON.stringify({
                    id: selectData?.id,
                    price: selectData?.price,
                  })}
                >
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-600">{`${errors.category.message}`}</p>
            )}
            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">{t("Subcategory")}</label>
            <select
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              {...register("subcategory")}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
            >
              <option value="" disabled selected>
                {t("SelectCategory")}
              </option>
              {subCategories?.map((selectData: SubCategory) => (
                <option key={selectData._id} value={selectData._id as string}>
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="text-red-600">{`${errors.subcategory.message}`}</p>
            )}
            {/* Show error for name */}
          </div>
        </div>
        {/* Category and  Subcategory End*/}

        {/* Brands and  Models */}
        <div className="flex  flex-col lg:flex-row justify-between ">
          <div className="flex flex-col">
            <label className="text-grayscale900">{t("Brands")}</label>
            <select
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              {...register("brands")}
            >
              <option value="" disabled selected>
                {t("SelectBrand")}
              </option>
              {subBrands?.map((selectData: Brand) => (
                <option
                  key={selectData._id}
                  value={selectData?.title[locale as "en" | "ar"]}
                >
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>

            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">{t("Models")}</label>
            <select
            {...register("model")}
              name="model"
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
            >
              <option value="" disabled selected>
                {t("SelectModels")}
              </option>
              {Models?.map((selectData: Model) => (
                <option
                  key={selectData._id}
                  value={selectData?.title[locale as "en" | "ar"] as string}
                >
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>

            {/* <p className="text-red-600">{fields.model.errors}</p> */}
            {/* Show error for name */}
          </div>
        </div>

        {/* Brands and  Models End*/}

        {/* Conditions and  Currency */}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">{t("Conditions")}</label>
            <select
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              {...register("conditions")}
            >
              <option value="" disabled selected>
                {t("SelectConditions")}
              </option>
              {ConditionList?.map((selectData: Model) => (
                <option
                  key={selectData?.title[locale as "en" | "ar"]}
                  value={selectData?.value[locale as "en" | "ar"] as string}
                >
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>

            {/* <p className="text-red-600">{fields.conditions.errors}</p> */}
            {/* Show error for name */}
          </div>

          <div className="flex gap-x-1">
            <div className="flex flex-col">
              <label className="text-grayscale900">{t("Currency")}</label>
              <select
                className="max-w-[151px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                {...register("Currency")}
              >
                <option value="" disabled selected>
                  {t("Currency")}
                </option>
                {Currency?.map((selectData: Currency) => (
                  <option
                    key={selectData?.title[locale as "en" | "ar"]}
                    value={selectData?.title[locale as "en" | "ar"] as string}
                  >
                    {selectData?.title[locale as "en" | "ar"]}
                  </option>
                ))}
              </select>

              {errors.Currency && (
                <p className="text-red-600">{`${errors.Currency.message}`}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-grayscale900">{t("AdPrices")}</label>
              <Input
                type="text"
                {...register("price")}
                name="price"
                placeholder={t("Pickagoodprice-whatwouldyoupay?")}
                className={` max-w-[180px] sm:min-w-[354px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
              ></Input>
              {errors.price && (
                <p className="text-red-600">{`${errors.price.message}`}</p>
              )}
            </div>
          </div>
        </div>

        {/* Conditions and  Currency End*/}

        {/* Authenticity and  Mobile Number*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">{t("Authenticity")}</label>
            <select
              {...register("authenticity")}
              className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
            >
              <option value="" disabled selected>
                {t("SelectanAuthenticity")}
              </option>
              {Authenticity?.map((selectData: Model) => (
                <option
                  key={selectData?.title[locale as "en" | "ar"]}
                  value={selectData?.value[locale as "en" | "ar"] as string}
                >
                  {selectData?.title[locale as "en" | "ar"]}
                </option>
              ))}
            </select>

            {/* <p className="text-red-600">{fields.authenticity.errors}</p> */}
            {/* Show error for name */}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-grayscale900">{t("MobileNumbe")}</label>
              <Input
                type="text"
                {...register("mobileNumbe")}
                placeholder="Ex: +96*********"
                className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] sm:min-w-[451px]`}
              ></Input>
              {errors.mobileNumbe && (
                <p className="text-red-600">{`${errors.mobileNumbe.message}`}</p>
              )}
              {/* Show error for name */}
            </div>
          </div>
        </div>

        {/* Authenticity and  Mobile Number End*/}

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">{t("Addescription")}</label>
          <textarea
            id="description"
            rows={5}
            cols={50}
            placeholder={t("Addescription")}
            className="border border-grayscale50 px-[18px] py-[12px] rounded-[5px]"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-600">{`${errors.description.message}`}</p>
          )}

          {/* Show error for name */}
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">{t("Options")}</label>
          <div className="flex gap-x-[20px] flex-wrap min-w-full">
            {Options?.map((option: Options, index: number) => {
              return (
                <div className="flex flex-col" key={index}>
                  <label className="text-grayscale900">
                    {option.title[locale as "en" | "ar"]}
                  </label>
                  <select
                    {...register(`options.${index}`)}
                   
                    className="min-w-[351px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                  >
                    <option value="" disabled selected>
                      {`Select ${option.title[locale as "en" | "ar"]}`}
                    </option>
                    {option.values?.map(
                      (value: OptionValues, index: number) => (
                        <option
                          key={index}
                          value={JSON.stringify({
                            _key: value.en,
                            key: option.title[locale as "en" | "ar"],
                            value: value.en,
                          })}
                        >
                          {value[locale as "en" | "ar"]}
                        </option>
                      )
                    )}
                  </select>

                  {errors.options && (
            <p className="text-red-600">{`${errors.options.message}`}</p>
          )}
                </div>
              );
            })}
          </div>

          {/* Show error for name */}
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">{t("Images")}</label>

          <div>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={async (results: any) => {
                const imageUrl = results?.info?.secure_url;
                if (imageUrl) {
                  setImages((prevImages) => [...prevImages, imageUrl]);
                  const formData = new FormData();
                  formData.append("image", JSON.stringify(ImagesArray));
                }
              }}
            >
              {({ open }) => {
                return <button onClick={() => open()}>Upload Images</button>;
              }}
            </CldUploadWidget>
          </div>

          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row  gap-x-4">
            <div className="flex flex-col">
              <select
                {...register("country")}
                name="country"
                className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                onChange={(e) => {
                  const selectedCountry = e.target.value;
                  if (selectedCountry) {
                    setSelectedCountry(selectedCountry);
                  }
                }}
              >
                <option value="" disabled selected>
                  {t("SelectCountry")}
                </option>
                {Countries.map((country: Countries) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              {errors.country && (
                <p className="text-red-600">{`${errors.country.message}`}</p>
              )}
            </div>

            <div className="flex flex-col">
              <select
                {...register("state")}
                name="state"
                className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
              >
                <option value="" disabled selected>
                  {t("SelectState")}
                </option>
                {State?.map((state: State, index: number) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>

              {errors.state && (
                <p className="text-red-600">{`${errors.state.message}`}</p>
              )}
            </div>

            <div className="flex items-center gap-x-3">
              <Checkbox name="negotiable" id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("Negotiable")}
              </label>
              {/* <p className="text-red-600">{fields.negotiable.errors}</p> */}
            </div>
          </div>
          {/* <div className="min-w-full min-h-[348px] rounded-[8px]" ref={MapRef} /> */}
        </div>
        <div>
          <label className="text-grayscale900">{t("AdFeatures")}</label>

          {/* Render feature input fields */}
          {features.map((feature, index) => (
            <div key={index} className="mb-4 flex gap-x-5 items-center">
              <Input
                {...register("feature")}
                type="text"
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                name="features"
                value={feature}
              />
              <button
                onClick={() => removeFeature(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {t("Remove")}
              </button>
            </div>
          ))}

          {/* Button to add a new feature */}
          <button
            onClick={addFeature}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="button"
          >
            {t("AdFeatures")}
          </button>
        </div>
        <div className="min-w-full flex justify-end">
          <button
            className={`min-w-[193px] min-h-[58px] bg-primary500 text-white rounded-[6px] flex justify-center items-center gap-x-[12px]}`}
            type="submit"
            onClick={LoadingHandle}
          >
            <span>{t("SubmitAd")}</span>
          </button>
        </div>
      </form>
      {/* <>
        {PageLoader === "Loading" ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="text-center">
              <Image alt="loader" src={LoadingImage} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </> */}
    </div>
  );
};

export default StepOneForm;
