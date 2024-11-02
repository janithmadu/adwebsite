"use client";

import React, { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { ApiResponse, stepOpneFormAction } from "../../addform/step01/action";
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
import {
  Brand,
  FormStateNew,
  Model,
  Option,
  Subcategory,
} from "@/lib/categoryInterface";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();

 
}
interface CategoryNew {
  
 GetCategory:{
  id:string;
  title: {
    en: string; // English title
    ar: string; // Arabic title
  };
  slug: {
    current: string; // Current slug string
  };
  imageUrl?:string;
  description?: {
    en: string; // English description
    ar: string; // Arabic description
  };
  price: number; // Price of the category

  // Optional: Define GetCategory method if needed

  subcategories:Array<{
    _id:string;
    title:Array<string>
    slug:Array<string>

  }>
 }
 }



const initionlState = {
  
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
        name:"",
        subcategory: "",
        price:"",
        brand:"",
        model: "",
        conditions: "",
        authenticity: "",
        Currency: "",
        description: "",
        options: "",
        mobile: "",
        country: "",
        state: "",
        negotiable: "",
        features:[],
      }
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
  
}

interface Countries{
  name?: string;
  code?:string
}
const  StepOneForm:React.FC<CategoryNew> = ( {GetCategory} )=>{

 
  
  const formActionWrapper = async (prevState: ApiResponse, formData: FormData) => {
    // Call your existing action and pass the parameters
    return await stepOpneFormAction(prevState, formData);
  };

  const [formState, formAction] = useFormState<FormStateNew>(
    stepOpneFormAction,
    initionlState,
  );

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
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [State, setState] = useState<any>([]);
  const [PageLoader, setPageLoader] = useState<string | null>(null);
  const router = useRouter();
  const [features, setFeatures] = useState<string[]>([""]);
  const [AdPrice, setAdPrice] = useState<number>();




  //Get Category ID for retrive subcategories
  const handleInputChange = (e: any) => {
    const { id, price } = JSON.parse(e);
    setCategoriesID(id);
    setAdPrice(price);
  };

  //Get SubCategory ID for retrive Models,Brands,Options
  const handleSubCategoryChange = (e: any) => {
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
      const countryList = countries.map((country: any) => ({
        name: country.name.common,
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
      const states = data?.data?.states?.map((state: any) => ({
        name: state.name,
      }));

      setState(states);
    };

    getStateByCountry();
  }, [selectedCountry]);

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

    const updatedPreviewUrlss = ImageGet.filter(
      (_: any, i: any) => i !== index
    );

    setImage(updatedPreviewUrlss);
  };

  useEffect(() => {
    if (formState.status == false) {
      setPageLoader("Error");
    }

    if (formState.status == true) {
      setPageLoader("Loading Done");
      Swal.fire({
        title: "Congratulations!",
        text: formState.message ?? "", // Provide a fallback to an empty string if message is null
        icon: "success",
        confirmButtonText: `Pay ${AdPrice} USD`,
        allowOutsideClick: false,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/${locale}/payments`); // Redirect to payments page on confirm
        }
      });

      localStorage.setItem("AdID", formState.response._id);
    }
  }, [formState]);

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

  console.log(Countries);
  

  return (
    <div className=" flex flex-col gap-y-[20px] ">
      <div className="min-h-[100px] bg-primary500 rounded-xl relative">
        <Image alt="formHeader" src={FormHeader} className="rounded-xl" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-[32px]">Post Your Ad</h1>
        </div>
      </div>

      <form action={formAction} className="flex flex-col gap-y-[20px] ">
        {/* Name */}

        <div className="flex flex-col">
          <label className="text-grayscale900">Ad Name</label>
          <Input
            type="text"
            name="name"
            placeholder="Ad name"
            className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
          ></Input>
          {formState?.zodErrors?.name && (
            <p className="text-red-600">{formState?.zodErrors?.name}</p>
          )}{" "}
          {/* Show error for name */}
        </div>

        {/* Name End */}

        {/* Category and  Subcategory*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col ">
            <label className="text-grayscale900">Category</label>
            <Select onValueChange={(e) => handleInputChange(e)} name="category">
              <SelectTrigger className="  sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {GetCategory?.map((selectData: CategoryNew) => {
                  return (
                    <SelectItem
                      key={selectData.GetCategory.id}
                      value={JSON.stringify({
                        id: selectData.GetCategory.id,
                        price: selectData.GetCategory.price,
                      })}
                    >
                      {selectData?.GetCategory.title[locale as "en"  | "ar"]}

                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.category && (
              <p className="text-red-600">{formState?.zodErrors?.category}</p>
            )}{" "}
            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Subcategory</label>
            <Select
              onValueChange={(e) => handleSubCategoryChange(e)}
              name="subcategory"
            >
              <SelectTrigger className="  sm:min-w-[451px]  min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subCategories?.map((selectData: any) => {
                  return (
                    <SelectItem key={selectData.id} value={selectData._id}>
                      {selectData?.title[locale]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.subcategory && (
              <p className="text-red-600">
                {formState?.zodErrors?.subcategory}
              </p>
            )}{" "}
            {/* Show error for name */}
          </div>
        </div>
        {/* Category and  Subcategory End*/}

        {/* Brands and  Models */}
        <div className="flex  flex-col lg:flex-row justify-between ">
          <div className="flex flex-col">
            <label className="text-grayscale900">Brands</label>
            <Select name="brand">
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Brands" />
              </SelectTrigger>
              <SelectContent>
                {subBrands?.map((selectData: any) => {
                  return (
                    <SelectItem
                      key={selectData.id}
                      value={selectData?.title[locale]}
                    >
                      {selectData?.title[locale]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.brand && (
              <p className="text-red-600">{formState?.zodErrors?.brand}</p>
            )}{" "}
            {/* Show error for name */}
          </div>

          <div className="flex flex-col">
            <label className="text-grayscale900">Models</label>
            <Select name="model">
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Models" />
              </SelectTrigger>

              <SelectContent>
                {Models?.map((selectData: any) => {
                  return (
                    <SelectItem
                      key={selectData.id}
                      value={selectData?.title[locale]}
                    >
                      {selectData?.title[locale]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.model && (
              <p className="text-red-600">{formState?.zodErrors?.model}</p>
            )}{" "}
            {/* Show error for name */}
          </div>
        </div>

        {/* Brands and  Models End*/}

        {/* Conditions and  Currency */}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Conditions</label>
            <Select name="conditions">
              <SelectTrigger className=" sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select Conditions" />
              </SelectTrigger>
              <SelectContent>
                {ConditionList?.map((selectData: any) => {
                  return (
                    <SelectItem
                      key={selectData?.title[locale]}
                      value={selectData?.value[locale]}
                    >
                      {selectData?.title[locale]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.conditions && (
              <p className="text-red-600">{formState?.zodErrors?.conditions}</p>
            )}{" "}
            {/* Show error for name */}
          </div>

          <div className="flex gap-x-1">
            <div className="flex flex-col">
              <label className="text-grayscale900">Currency</label>
              <Select name="Currency">
                <SelectTrigger className="max-w-[151px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>

                <SelectContent>
                  {Currency?.map((selectData: any) => {
                    return (
                      <SelectItem
                        key={selectData?.title[locale]}
                        value={selectData?.title[locale]}
                      >
                        {selectData?.title[locale]}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-grayscale900">Ad Prices</label>
              <Input
                type="text"
                name="price"
                placeholder="Pick a good price - what would you pay?"
                className={` max-w-[180px] sm:min-w-[354px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] `}
              ></Input>
            </div>
          </div>
        </div>
        {/* Conditions and  Currency End*/}

        {/* Authenticity and  Mobile Number*/}
        <div className="flex  flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <label className="text-grayscale900">Authenticity</label>
            <Select
              name="authenticity"

              // //
            >
              <SelectTrigger className="sm:min-w-[451px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                <SelectValue placeholder="Select an Authenticity" />
              </SelectTrigger>

              <SelectContent>
                {Authenticity?.map((selectData: any) => {
                  return (
                    <SelectItem
                      key={selectData?.title[locale]}
                      value={selectData?.value[locale]}
                    >
                      {selectData?.title[locale]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {formState?.zodErrors?.authenticity && (
              <p className="text-red-600">
                {formState?.zodErrors?.authenticity}
              </p>
            )}{" "}
            {/* Show error for name */}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-grayscale900">Mobile Numbe</label>
              <Input
                type="text"
                name="mobile"
                placeholder="Ex: +96*********"
                className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] sm:min-w-[451px]`}
              ></Input>
              {formState?.zodErrors?.mobile && (
                <p className="text-red-600">{formState?.zodErrors?.mobile}</p>
              )}{" "}
              {/* Show error for name */}
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
          {formState?.zodErrors?.description && (
            <p className="text-red-600">{formState?.zodErrors?.description}</p>
          )}{" "}
          {/* Show error for name */}
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Options</label>
          <div className="flex gap-x-[20px] flex-wrap min-w-full">
            {Options?.map((option: any, index: any) => {
              return (
                <div className="flex flex-col" key={index}>
                  <label className="text-grayscale900">
                    {option.title[locale]}
                  </label>
                  <Select name="options">
                    <SelectTrigger className="min-w-[351px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                      <SelectValue
                        placeholder={`Select ${option.title[locale]}`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {option.values?.map((value: any, index: any) => {
                        return (
                          <SelectItem
                            key={index}
                            value={JSON.stringify({
                              _key: value.en,
                              key: option.title[locale],
                              value: value.en,
                            })}
                          >
                            {value[locale]}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {formState?.zodErrors?.options && (
                    <p className="text-red-600">
                      {formState?.zodErrors?.options}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {formState?.zodErrors?.options && (
            <p className="text-red-600">{formState?.zodErrors?.options}</p>
          )}{" "}
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
            {formState?.zodErrors?.image && (
              <p className="text-red-600">{formState?.zodErrors?.image}</p>
            )}{" "}
            {/* Show error for name */}
          </div>
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row  gap-x-4">
            <div className="flex flex-col">
              <Select
                name="country"
                onValueChange={(e: any) => setSelectedCountry(e)}
              >
                <SelectTrigger className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder={`Select Country`} />
                </SelectTrigger>
                <SelectContent>
                  {Countries.map((country: any) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formState?.zodErrors?.country && (
                <p className="text-red-600">{formState?.zodErrors?.country}</p>
              )}
            </div>

            <div className="flex flex-col">
              <Select name="state">
                <SelectTrigger className="sm:min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
                  <SelectValue placeholder={`Select State`} />
                </SelectTrigger>
                <SelectContent>
                  {State?.map((state: any, index: any) => (
                    <SelectItem key={index} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState?.zodErrors?.state && (
                <p className="text-red-600">{formState?.zodErrors?.state}</p>
              )}
            </div>

            <div className="flex items-center gap-x-3">
              <Checkbox name="negotiable" id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Negotiable
              </label>
              {formState?.zodErrors?.state && (
                <p className="text-red-600">
                  {formState?.zodErrors?.negotiable}
                </p>
              )}
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
}

export default StepOneForm;
