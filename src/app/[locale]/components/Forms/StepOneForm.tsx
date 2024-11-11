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
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { compressImage } from "../../actions/ImageComprestion";

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
  const [ImagesArray, setImages] = useState<
    { _key: string; url: string; altText: string }[]
  >([]);
  const [ImageError, setImageError] = useState<boolean>(true);
  const [ImageCountError, setImageCountError] = useState<boolean>(true);
  const [isCompressing, setIsCompressing] = useState(false);
  //Get Category ID for retrive subcategories
  const handleInputChange = (e: string) => {
    const { id, price } = JSON.parse(e);
    setCategoriesID(id);
    setAdPrice(price);
  };

  useEffect(() => {
    if (ImagesArray.length === 0) {
      setImageError(true);
    } else {
      setImageError(false);
    }
    if (ImagesArray.length > 5) {
      setImageCountError(true);
    } else {
      setImageCountError(false);
    }
  }, [ImagesArray]);

  //Get SubCategory ID for retrive Models,Brands,Options
  const handleSubCategoryChange = (e: string) => {
    setOptions([]);
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
        setOptions([]);
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
        // Clear options immediately on subCategoriesID change
        setOptions([]);

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
  const handleRemoveImage = async (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image._key !== id));
    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(SchemaAdPostForm),
  });

  const onSubmit = async (data: FieldValues) => {
    setPageLoader("Loading");
    if (Object.keys(errors).length > 0) {
      setPageLoader("Error");
    }

    if (ImageError || ImageCountError) {
      setPageLoader("Error");
      return null;
    } else {
      const dataToSend = { ...data, images: ImagesArray, featurs: features };
      const CreateAdRes = await fetch("/api/createad", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const CreateAdData = await CreateAdRes.json();

      if (!CreateAdRes.ok && !CreateAdData.success) {
        setPageLoader("Error");
        Swal.fire({
          title: "Error!",
          text: "Ad posting faild due to some error pleace check your inserting data.",
          icon: "error",
          confirmButtonText: `Cancel`,
          allowOutsideClick: true,
          allowEscapeKey: true,
        });
      } else {
        setPageLoader("Error");
        Swal.fire({
          title: "Congratulations!",
          text: "Ad Posting Success!",
          icon: "success",
          confirmButtonText: `Pay ${AdPrice} USD`,
          allowOutsideClick: false,
          allowEscapeKey: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/${locale}/payments`); // Redirect to payments page on confirm
          }
        });
        localStorage.setItem("AdID", CreateAdData.res._id);
      }
    }
  };

  const LoadingHandle = () => {
    if (Object.keys(errors).length > 0) {
      setPageLoader("Error");
    }
  };

  console.log(getValues());

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
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
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
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
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
              defaultValue=""
            >
              <option value="" disabled>
                Select Brands
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
              defaultValue=""
            >
              <option value="" disabled>
                Select Model
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
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
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

            {errors.conditions && (
              <p className="text-red-600">{`${errors.conditions.message}`}</p>
            )}
            {/* Show error for name */}
          </div>

          <div className="flex gap-x-1">
            <div className="flex flex-col">
              <label className="text-grayscale900">{t("Currency")}</label>
              <select
                className="max-w-[151px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                {...register("Currency")}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
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
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
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

            {errors.authenticity && (
              <p className="text-red-600">{`${errors.authenticity.message}`}</p>
            )}
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
                    defaultValue=""
                  >
                    <option value="">Select</option>
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

          <div className="1 max-w-[400px] min-h-[300px] shadow rounded-xl flex justify-center items-center px-4">
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={async (results: any) => {
                const id = results?.info?.public_id;
                const alt = results?.info?.original_filename;
                const imageUrl = results?.info?.secure_url;

                if (imageUrl) {
                  setImages((prevImages) => [
                    ...prevImages,
                    { _key: id, url: imageUrl, altText: alt },
                  ]);
                }
              }}
            >
              {({ open }) => {
                return (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-w-full min-h-[200px] flex justify-center items-center flex-col">
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Upload Images
                    </button>
                    <p className="mt-1 text-xs text-gray-400">
                      Max 5 images, 10MB each
                    </p>
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>

          <div className="flex gap-x-3 mb-2">
            {ImagesArray.map((ImageOptions) => {
              return (
                <div key={ImageOptions._key}>
                  <div className="min-w-full justify-end flex mb-1">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(ImageOptions._key)}
                      className="p-2 flex items-center justify-center bg-red-600 rounded-full text-white text-sm w-3 h-3"
                    >
                      X
                    </button>
                  </div>
                  <CldImage
                    alt={ImageOptions.altText}
                    width={100}
                    height={100}
                    src={ImageOptions.url}
                  />
                </div>
              );
            })}
          </div>

          {ImageError && (
            <p className="text-red-600">Pleace upload at least one image</p>
          )}
          {ImageCountError && (
            <p className="text-red-600">You can upload a maximum of 5 images</p>
          )}
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
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
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
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
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
                type="text"
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
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
          >
            <span>{t("SubmitAd")}</span>
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
