"use client";

import React, { useEffect, useState } from "react";

import { useFormState } from "react-dom";
import { stepOpneFormAction } from "../../addform/step01/action";
import { Authenticity, ConditionList, Currency } from "@/lib/statics";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
import { Loader } from "@googlemaps/js-api-loader";
import LoadingImage from "../../../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
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
    status: false,
  });

  console.log(formState?.zodErrors);

  const [CategoriesID, setCategoriesID] = useState<any | undefined>();
  const [subCategoriesID, setsubCategoriesID] = useState<any | undefined>();
  const [subCategories, setsubCategories] = useState<any | undefined>();
  const [subBrands, setsubBrands] = useState<any | undefined>();
  const [Options, setOptions] = useState<any | undefined>();
  const [Models, setModels] = useState<any | undefined>();
  const [locale, setLocale] = useState<any>("en");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [ImageGet, setImage] = useState<any>([]);
  const [Countries, setCountries] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [State, setState] = useState<any>([]);
  const [PageLoader, setPageLoader] = useState<any>(null);
  const router = useRouter();
  //Get Category ID for retrive subcategories
  const handleInputChange = (e: any) => {
    setCategoriesID(e);
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

  const MapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapInit = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyDN3XsX4sCLXCrWNikpn_NTb2fY3AmgxMw",
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: 6.866042368324042,
        lng: 80.01313805285554,
      };
      const MapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 12,
        mapId: "My_NEXTJS_MAPID",
      };

      const map = new Map(MapRef.current as HTMLDivElement, MapOptions);
      const marker = new Marker({
        map: map,
        position: position,
      });

      map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Get place details using Geocoder
      });
    };
    mapInit();
  }, []);

  useEffect(() => {
    if (formState.status == false) {
      setPageLoader("Error");
    }

    if (formState.status == true) {
      setPageLoader("Loading Done");
      Swal.fire({
        title: "Congratulations!",
        text: formState.message,
        icon: "success",
        confirmButtonText: "Go to Home",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/"); // Redirect to homepage on confirm
        }
      });
    }
  }, [formState]);

  const LoadingHandle = () => {
    setPageLoader("Loading");
  };

  return (
    <div className=" flex flex-col gap-y-[20px] ">
      <div className="min-h-[100px] bg-primary500 rounded-xl">

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
                {GetCategory?.map((selectData: any) => {
                  return (
                    <SelectItem key={selectData.id} value={selectData.id}>
                      {selectData?.title[locale]}
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
                        console.log(value.en);

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
          <div className="flex   gap-x-4">
            <div className="flex flex-col">
              <Select
                name="country"
                onValueChange={(e) => setSelectedCountry(e)}
              >
                <SelectTrigger className="min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
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
                <SelectTrigger className="min-w-[380px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]">
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
        <div className="min-w-full flex justify-end">
          <button
            className={`min-w-[193px] min-h-[58px] bg-primary500 text-white rounded-[6px] flex justify-center items-center gap-x-[12px]}`}
            type="submit"
            onClick={LoadingHandle}
          >
            <span>Next Steps</span> <ArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default StepOneForm;
