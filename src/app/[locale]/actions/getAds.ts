import { client } from "@/sanity/lib/client";

export async function getPostAds() {
  const query = `
    *[_type == "postAd"] {
      _id,
      adName,
      category->{
        _id,
        title
      },
      subcategory->{
        _id,
        title
      },
      brand,
      model,
      condition,
      authenticity,
      tags,
      price,
      negotiable,
      description,
      features,
      photos[]{
        asset->{
          _id,
          url
        }
      },
      phoneNumber,
      backupPhoneNumber,
      email,
      website,
      country,
      city,
      state,
      location,
      mapLocation,
      Currency
    }
  `;
  const result = await client.fetch(query);

  return result;
}

export async function getAdsBySub(subcategoryId: any) {
  const query = `*[_type == "postAd" && subcategory._ref == $subcategoryId]{
    adName,
    "category": category->title,
    "subcategory": subcategory->title,
    brand,
    model,
    condition,
    currency,
    authenticity,
    tags,
    price,
    negotiable,
    description,
    features,
    photos[]{
      asset->{
        url,
        metadata
      }
    },
    phoneNumber,
    backupPhoneNumber,
    email,
    website
  }`;

  const params = {
    subcategoryId: subcategoryId, // Replace with actual subcategory ID
  };

  console.log("Using subcategory ID:", params.subcategoryId);

  client
    .fetch(query, params)
    .then((ads) => {
      console.log("Fetched Ads:", ads);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
