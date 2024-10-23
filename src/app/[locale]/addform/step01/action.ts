"use server";

import { client } from "@/lib/sanity";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";

export const stepOpneFormAction: any = async (
  prevState: any,
  formData: FormData
) => {
  const priceEntry = formData?.get("price");
  const price: number | null = priceEntry
    ? parseFloat(priceEntry as string)
    : null;

  const options = formData?.getAll("options");
  const parsedValuesArray = options.map((item) => {
    if (typeof item === "string") {
      return JSON.parse(item); // Parse each string entry
    }
    return null; // Handle non-string entries (if any), or customize as needed
  });

  console.log(formData);

  const formDataObject: FormType = {
    name: formData?.get("name") as string,
    category: formData.get("category") as string,
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
      brand: formDataObject.brand,
      model: formDataObject.model,
      condition: formDataObject.conditions,
      Currency: formDataObject.Currency,
      authenticity: formDataObject.authenticity,
      options: parsedValuesArray,
      price: formDataObject.price,
      negotiable: true,
      description: formDataObject.description,
      features: ["5G Support", "Fast Charging", "Water Resistant"],
      photos: uploadedImages,
      phoneNumber: formDataObject.mobile,
      country: formDataObject.country,
      state: formDataObject.state,
    };

    const response = await client.create(newAd);
    console.log("New ad created:", response);
  } catch (error) {
    console.error("Error creating new ad:", error);
  }
};
