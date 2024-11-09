"use server";

import { AdFormState, PostAd } from "@/lib/categoryInterface";
import { client } from "@/lib/sanity";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";
export type ApiResponse = {
  ZodError: null; // Adjust as necessary for the actual error type
  data: {
    name: string;
    category: string;
    subcategory: string;
    price: number;
    brand: string;
    model: string;
    conditions: string;
    authenticity: string;
    mobile: string;
    description: string;
    image: string;
    options: string[];
    formDataObject: {
      name: string;
      subcategory: string;
      price: number | null; // Assuming price can be null
      brand: string;
      model: string;
      conditions: string;
      authenticity: string;
      Currency: string;
      description: string;
      options: string[];
      mobile: string;
      country: string;
      state: string;
      negotiable: boolean;
      features: string[]; // Adjust type as needed
    };
  };
  message: string;
  status: boolean;
  response: {
    Currency: string;
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
  };
  zodErrors: {
    [key: string]: string[]; // Key is the field name, value is an array of error messages
  };
};

export interface AdResponse {
  currency: string; // Example: "LKR"
  adName: string; // Example: "sdfsdf"
  authenticity: string; // Example: "original"
  brand: string; // Example: "Apple"
  category: {
    _ref: string; // Example: '391061fe-50f0-4ba7-84bd-8ed9d579f1ac'
    _type: string; // Example: 'reference'
  };
  condition: string; // Example: "new"
  country: string; // Example: "Sri Lanka"
  description: string; // Example: "dfsdf"
  features: string[]; // Example: ['']
  model: string; // Example: "Huawei Mate X3"
  negotiable: boolean; // Example: true
  options: Array<object>; // Adjust type based on the structure of the objects in options
  payment: boolean; // Example: false
  phoneNumber: string; // Example: "0701780146"
  photos: Array<object>; // Adjust type based on the structure of the photo objects
  price: number; // Example: 333
  state: string; // Example: "Anuradhapura District"
  subcategory: {
    _ref: string; // Example: 'e33e9820-c65a-4de2-9244-f33dc4f6f27f'
    _type: string; // Example: 'reference'
  };
  user: {
    _ref: string; // Example: 'kp_52d41e1c41ef4fc7bd070e4791a9810a'
    _type: string; // Example: 'reference'
  };
  _createdAt: string; // Example: "2024-11-02T17:57:44Z"
  _id: string; // Example: "8gU1OR3RiIHTk90NnPDUsa"
  _rev: string; // Example: "8gU1OR3RiIHTk90NnPDUqP"
  _type: string; // Example: "postAd"
  _updatedAt: string; // Example: "2024-11-02T17:57:44Z"
}

export const stepOpneFormAction = async (
  prevSatte: undefined,
  formData: FormData
) => {


  



  const submisstions = parseWithZod(formData, {
    schema: SchemaAdPostForm,
  });

  if (submisstions.status !== "success") {
    return submisstions.reply();
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const priceEntry = formData?.get("price");
  const price: number | null = priceEntry
    ? parseFloat(priceEntry as string)
    : null;

  const options = formData?.getAll("options");
  const parsedValuesArray = options.map((item) => {
    if (typeof item === "string" && item) {
      return JSON?.parse(item); // Parse each string entry
    }
    return null; // Handle non-string entries (if any), or customize as needed
  });

  const features = formData?.getAll("features");
  const Negotiable = formData.get("negotiable");
  let NegotiableValue;
  if (Negotiable == "on") {
    NegotiableValue = true;
  } else {
    NegotiableValue = false;
  }

  let CategoryID;

  if (formData.get("category")) {
    CategoryID = JSON.parse(formData.get("category") as string);
  }

  const image = formData.getAll("image") as File[]; 

  const formDataObject: FormType = {
    name: formData?.get("name") as string,
    category: CategoryID?.id,
    subcategory: formData.get("subcategory") as string,
    price: price as number,
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    conditions: formData.get("conditions") as string,
    authenticity: formData.get("authenticity") as string,
    Currency: formData.get("Currency") as string,
    description: formData.get("description") as string,
    options: options.filter(
      (option): option is string => typeof option === "string"
    ),
    mobile: formData.get("mobile") as string,
    country: formData.get("country") as string,
    state: formData.get("state") as string,
    negotiable: NegotiableValue as boolean,
    features: features.filter(
      (option): option is string => typeof option === "string"
    ),
    image,
  };

  const uploadedImages = await Promise.all(
    formDataObject.image.map(async (image: FormDataEntryValue) => {
      if (image instanceof File) {
        try {
          const imageData = await client.assets.upload("image", image, {
            filename: image.name, // Use the file's name for the filename
          });
          return {
            _key: imageData._id,
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageData._id, // Store the uploaded image reference
            },
          };
        } catch (error) {
        
          return null; // Handle errors (you can handle this differently based on your use case)
        }
      }
    })
  );

  try {
    const newAd = {
      _type: "postAd",
      adName: formDataObject.name,
      category: {
        _type: "reference",
        _ref: formDataObject.category, // Replace with the actual category document ID
      },
      subcategory: {
        _type: "reference",
        _ref: formDataObject.subcategory, // Replace with the actual subcategory document ID
      },
      user: {
        _type: "reference",
        _ref: user.id, // Replace with the actual subcategory document ID
      },
      brand: formDataObject.brand,
      model: formDataObject.model,
      condition: formDataObject.conditions,
      Currency: formDataObject.Currency,
      authenticity: formDataObject.authenticity,
      options: parsedValuesArray,
      price: formDataObject.price,
      negotiable: NegotiableValue,
      description: formDataObject.description,
      features: features,
      photos: uploadedImages,
      phoneNumber: formDataObject.mobile,
      country: formDataObject.country,
      state: formDataObject.state,
      payment: false,
    };

    const response = await client.create(newAd);

    if (response) {
      return {
        ...(prevSatte as any),
        response,
        status: true,
        message: "Almost There! Confirm Your Payment to Go Live!",
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
  
  }
};
