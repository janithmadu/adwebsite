import { client } from "@/sanity/lib/client";
import { log } from "console";

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

  if (subcategoryId.minPrice && subcategoryId.maxPrice && subcategoryId.subOptions && subcategoryId.subcategories) {


    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0; // Default to 0 if minPrice is not a valid number
    const parsedMaxPrice = parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER; // Default to a large number if maxPrice is not valid

    const query = `*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value && price >= $minPrice && price <= $maxPrice] {
      _id,
      adName,
      category-> {
        _id,
        title
      },
      subcategory-> {
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
      photos[] {
        asset-> {
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
    }`;

    const params = {
      subcategoryId: subcategoryId.subcategories, // Replace with actual subcategory ID
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice
    };

    const result = await client.fetch(query, params);

    return result;
  }
  else if (subcategoryId.subOptions && subcategoryId.subcategories) {
    console.log("Done 5");

    const query = `*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value] {
      _id,
      adName,
      category-> {
        _id,
        title
      },
      subcategory-> {
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
      photos[] {
        asset-> {
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
    }`;

    const params = {
      subcategoryId: subcategoryId.subcategories, // Replace with actual subcategory ID
      options: subcategoryId.subOptions,

    };

    const result = await client.fetch(query, params);

    return result;
  }
  else if (subcategoryId.subOptions && subcategoryId.minPrice && subcategoryId.maxPrice) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0; // Default to 0 if minPrice is not a valid number
    const parsedMaxPrice = parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER; // Default to a large number if maxPrice is not valid
    const query = `*[_type == "postAd" && $options in options[].value && price >= $minPrice && price <= $maxPrice] {
      _id,
      adName,
      category-> {
        _id,
        title
      },
      subcategory-> {
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
      photos[] {
        asset-> {
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
    }`;

    const params = {
      options: subcategoryId.subOptions, // Replace with actual subcategory ID
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice
    };

    const result = await client.fetch(query, params);

    return result;
  }

  else if (subcategoryId.subcategories) {
    console.log("Done1");

    const query = `*[_type == "postAd" && subcategory._ref == $subcategoryId]{
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
  }`;

    const params = {
      subcategoryId: subcategoryId.subcategories, // Replace with actual subcategory ID
    };

    const result = await client.fetch(query, params);

    return result;
  }

  else if (subcategoryId.subOptions) {

    const query = `*[_type == "postAd" && $options in options[].value] {
      _id,
      adName,
      category-> {
        _id,
        title
      },
      subcategory-> {
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
      photos[] {
        asset-> {
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
    }`;

    const params = {
      options: subcategoryId.subOptions, // Replace with actual subcategory ID
    };

    const result = await client.fetch(query, params);

    return result;
  }

  else if (subcategoryId.minPrice && subcategoryId.maxPrice) {




    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0; // Default to 0 if minPrice is not a valid number
    const parsedMaxPrice = parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER; // Default to a large number if maxPrice is not valid
    const query = `
    *[_type == "postAd" && price >= $minPrice && price <= $maxPrice]{
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

    const params = {
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice
    };

    const result = await client.fetch(query, params);



    return result
  }
  else {
    return null

  }

}
