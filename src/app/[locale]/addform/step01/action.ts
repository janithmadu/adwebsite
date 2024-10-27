"use server";

import { client } from "@/lib/sanity";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const stepOpneFormAction: any = async (
  prevState: any,
  formData: FormData
) => {

  let CategoryID
  if (formData.get("category")) {
    CategoryID = JSON.parse(formData.get("category") as string)


  }


  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

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

  const formDataObject: FormType = {
    name: formData?.get("name") as string,
    category: CategoryID.id,
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
  };



  // Retrieve the files from formData
  const images = formData.getAll("image");

  // Upload images asynchronously using Promise.all

  // Validate form data using Zod
  const ZodValidations = SchemaAdPostForm.safeParse({
    ...formDataObject,
    images: images, // Add uploaded images to the form data for validation
  });

  if (!ZodValidations.success) {
    return {
      ...prevState,
      data: { ...prevState.data, formDataObject },
      zodErrors: ZodValidations.error.flatten().fieldErrors,
      message: "Missing required fields",
      status: false,
    };
  }

  const uploadedImages = await Promise.all(
    images.map(async (image: any) => {
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
          console.error(`Failed to upload image: ${image.name}`, error);
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
      payment:false
    };

    const response = await client.create(newAd);
    if (response) {
      return {
        ...prevState,
        data: { ...prevState.data, formDataObject },
        zodErrors: null,
        message: "Almost There! Confirm Your Payment to Go Live!",
        status: true,
        response: response
      };
    }
  } catch (error) {
    console.error("Error creating new ad:", error);
  }
};
