"use client";
import React, { useEffect, useState } from "react";
import { FromErrors } from "@/lib/types";
import { getOptionsByID } from "../../actions/getOptions";
import ImageUpload from "./ImageUpload";
import { useFormState } from "react-dom";
import { stepTowSchema } from "@/lib/schemas";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { stepTowFormAction } from "../../addform/step02/action";
import { useNewAddContext } from "../../contexts/AddContext";

const initiateState: FromErrors = {};

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  base64?: string; // Optional property for Base64 string
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function StepTowForm() {
  const [options, setOptions] = useState<any>();
  const [locale, setLocale] = useState<any>("en");

  const [serverError, formAction] = useFormState<any>(
    stepTowFormAction,
    initiateState
  );
  const serverErrorPre: any = serverError?.errors?.message;

  useEffect(() => {
    const getOptions = async () => {
      const newAdss: any = localStorage.getItem("newDealData");

      const parsedData = JSON.parse(newAdss);

      if (parsedData.subcategory) {
        const response = await getOptionsByID(parsedData.subcategory);
        setOptions(response);
      }
    };

    getOptions();
  }, []);

  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE") || "en";
    setLocale(cookieLocale);
  }, []);

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

  //Image Upload Section

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { updateNewAdd, newAdd } = useNewAddContext();
  const [optionsNew, setoptionsNew] = useState<any>([]);
  const [optionsNewName, setoptionsNewName] = useState<any>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNewAdd({ ...newAdd, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const SelectArray = e.target.value;
    const Name = e.target.name;
    setoptionsNewName(e.target.name);
    setoptionsNew([...optionsNew, { options: Name, value: SelectArray }]);
    updateNewAdd({ ...newAdd, [e.target.name]: { optionsNew } });
  };

  useEffect(() => {
    if (!optionsNew && !optionsNewName) {
      console.log("No data");
    }
    const optionsName: any = "options";
    updateNewAdd({ ...newAdd, [optionsName]: { optionsNew } });
  }, [optionsNew, optionsNewName]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = Array.from(e.target.files || []);
    const fileArray: File[] = Array.from(files);

    const jsonData: FileData[] = fileArray.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    updateNewAdd({ ...newAdd, [e.target.name]: jsonData });
    setImageFiles(files);

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

  

  return (
    <div className="mt-[32px] flex flex-col gap-y-[20px] ">
      <form action={formAction}>
        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            cols={50}
            placeholder="Ad description"
            className="border border-grayscale50 px-[18px] py-[12px] rounded-[5px]"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Options</label>
          <div className="flex gap-x-[20px] flex-wrap min-w-full">
            {options?.map((data: any, index: any) => {
              return (
                <div key={index}>
                  <div>
                    <label className="text-grayscale900">
                      {data?.title[locale]}
                    </label>
                  </div>
                  <select
                    className="min-w-[351px] min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px]"
                    name={data?.title.en}
                    id="options"
                    onChange={handleSelectChange}
                  >
                    {data?.values?.map((values: any, index: any) => {
                      return (
                        <option key={index} value={values[locale]}>
                          {values[locale]}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Images</label>
          {/* Input allows multiple files */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border-[#EDEFF5] rounded-[5px] border p-5 "
            name="image"
          />

          {/* Display previews for all selected images */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {previewUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Selected Image ${index + 1}`}
                  style={{ maxWidth: "100px" }}
                />
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

export default StepTowForm;
