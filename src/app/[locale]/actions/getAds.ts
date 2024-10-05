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
  `
  const result = await client.fetch(query)
  
  return result
}
