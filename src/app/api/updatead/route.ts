import { client } from "@/lib/sanity";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// Define the request handler for updating an ad
export async function PATCH(request: Request) {
  const addata = await request.json();

  const {
    name,
    category,
    subcategory,
    brands,
    conditions,
    Currency,
    price,
    authenticity,
    mobileNumbe,
    description,
    country,
    state,
    options,
    images,
    featurs,
    model,
    negotiable,
  } = addata;

  const SchemaData: FormType = {
    name: name,
    category: category,
    country: country,
    Currency: Currency,
    description: description,
    price: price,
    state: state,
    mobileNumbe: mobileNumbe,
    subcategory: subcategory,
    authenticity: authenticity,
    brands: brands,
    conditions: conditions,
    options: options,
    model: model,
    negotiable: negotiable,
    image: images,
  };

  const resulet = SchemaAdPostForm.safeParse(SchemaData);
  const parsedValuesArray = options.map((item: any) => {
    if (typeof item === "string" && item) {
      return JSON?.parse(item);
    }
    return null;
  });

  try {
    if (!resulet.success) {
      let zodErrors = {};
      resulet.error.issues.forEach((issues) => {
        zodErrors = { ...zodErrors, [issues.path[0]]: issues.message };

        Object.keys(zodErrors).length > 0
          ? { errors: zodErrors }
          : { success: true };
      });
    } else {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      const updateAd = {
        _type: "postAd",
        adName: name,
        category: {
          _type: "reference",
          _ref: category, // Replace with the actual category document ID
        },
        subcategory: {
          _type: "reference",
          _ref: subcategory, // Replace with the actual subcategory document ID
        },
        user: {
          _type: "reference",
          _ref: user.id, // Replace with the actual subcategory document ID
        },
        brand: brands,
        model: model,
        condition: conditions,
        Currency: Currency,
        authenticity: authenticity,
        options: parsedValuesArray,
        price: price,
        negotiable: negotiable,
        description: description,
        features: featurs,
        image: resulet.data?.image,
        phoneNumber: mobileNumbe,
        country: country,
        state: state,
        payment: true,
      };

      const response = await client
        .patch("usBAIdOsFBFLqIqm5KmfB6")
        .set(updateAd)
        .commit();

      if (response) {
        return NextResponse.json({ success: true, res: response });
      }
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ status: error });
  }
}
