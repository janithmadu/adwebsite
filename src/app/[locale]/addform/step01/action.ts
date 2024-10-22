"use server";

import { SchemaAdPostForm } from "@/lib/schemas";

export const stepOpneFormAction: any = (prevState: any, formData: FormData) => {
  const formDataObject = {
    name: formData.get("name"),
    category: formData.get("category"),
    subcategory: formData.get("subcategory"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    conditions: formData.get("conditions"),
    authenticity: formData.get("authenticity"),
    Currency: formData.get("Currency"),
    description: formData.get("description"),
    image: formData.getAll("image"),
    options: formData.get("options"),
  };

 console.log(prevState);
 
 
  

  const ZodValidations = SchemaAdPostForm.safeParse(formDataObject);

  if (!ZodValidations.success) {
    return {
      ...prevState,
      data: { ...prevState?.data, ...formDataObject },
      zodErrors: ZodValidations.error.flatten().fieldErrors,
      message: "Missing  required fields",
    };
  }
};
