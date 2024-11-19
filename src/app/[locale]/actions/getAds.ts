import { PostAd } from "@/lib/categoryInterface";
import { client } from "@/sanity/lib/client";

export interface Params {
  subcategoryId: {
    category?: string;
    subcategories?: string;
    subOptions?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number;
    limit: number;
    resultcount?: number;
  };
}

export interface Result {
  result: PostAd[]; // Adjust the type based on your actual data structure
  resultCount: number; // Change this to match the property name used in the return object
}

export async function getPostAds(data: Params): Promise<Result> {
  const start = (data?.subcategoryId?.page - 1) * data?.subcategoryId?.limit;

  const query = `*[_type == "postAd" && payment == true] | order(_createdAt desc) [${start}...${start + data.subcategoryId.limit}] {
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
      photos[] {
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
      Currency,
      _createdAt,
      image,
    }`;

  const queryCount = `count(*[_type == "postAd" && payment == true])`;

  const result = await client.fetch(query);

  const resultCount = await client.fetch(queryCount); // Change this to match 'resultCount'

  return {
    result,
    resultCount, // Ensure this uses camel case
  };
}

export async function getAllPostAds() {


  const query = `*[_type == "postAd" && payment == true] | order(_createdAt desc) {
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
      photos[] {
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
      Currency,
      _createdAt,
      image,
    }`;

  

  const result = await client.fetch(query);


  return {
    result,

  };
}

export async function getAdsBySub({ subcategoryId }: Params) {
  if (!subcategoryId) {
    throw new Error("subcategoryId is required");
  }

  const start = (subcategoryId.page - 1) * subcategoryId.limit;
  let query = ``;
  let params: Record<string, unknown> = {};
  let queryCount = ``;

  // Ensure subcategoryId values are parsed for price ranges
  const parsedMinPrice = subcategoryId.minPrice
    ? subcategoryId.minPrice || 0
    : undefined;
  const parsedMaxPrice = subcategoryId.maxPrice
    ? subcategoryId.maxPrice || Number.MAX_SAFE_INTEGER
    : undefined;

  if (
    parsedMinPrice !== undefined &&
    parsedMaxPrice !== undefined &&
    subcategoryId.subOptions &&
    subcategoryId.subcategories &&
    subcategoryId.category
  ) {
    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug && $options in options[].value && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id, adName, category->{_id, title, slug}, subcategory->{_id, title}, brand, model, condition, authenticity, tags, price, negotiable, description, features, photos[]{asset->{_id, url}}, phoneNumber, backupPhoneNumber, email, website, country, city, state, location, mapLocation, Currency, _createdAt,image
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug && $options in options[].value && price >= $minPrice && price <= $maxPrice])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      categorySlug: subcategoryId.category,
    };
  } else if (subcategoryId.subcategories && subcategoryId.category) {
    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id, adName, category->{_id, title, slug}, subcategory->{_id, title}, brand, model, condition, authenticity, tags, price, negotiable, description, features, photos[]{asset->{_id, url}}, phoneNumber, backupPhoneNumber, email, website, country, city, state, location, mapLocation, Currency, _createdAt,image,
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      categorySlug: subcategoryId.category,
    };
  } else if (subcategoryId.subOptions && subcategoryId.category) {
    query = `*[_type == "postAd" && payment == true && category->slug.current == $categorySlug && $options in options[].value] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id, adName, category->{_id, title, slug}, subcategory->{_id, title}, brand, model, condition, authenticity, tags, price, negotiable, description, features, photos[]{asset->{_id, url}}, phoneNumber, backupPhoneNumber, email, website, country, city, state, location, mapLocation, Currency, _createdAt,image
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && category->slug.current == $categorySlug && $options in options[].value])`;

    params = {
      categorySlug: subcategoryId.category,
      options: subcategoryId.subOptions,
    };
  } else if (subcategoryId.category) {
    query = `*[_type == "postAd" && payment == true && category->slug.current == $categorySlug] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id,
      adName,
      category->{
        _id,
        title,
        slug
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
      photos[] {
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
      Currency,
       _createdAt,
       image
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && category->slug.current == $categorySlug])`;

    params = {
      categorySlug: subcategoryId.category, // Only slug parameter
    };
  } else if (subcategoryId.subcategories) {
    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id, adName, category->{_id, title}, subcategory->{_id, title}, brand, model, condition, authenticity, tags, price, negotiable, description, features, photos[]{asset->{_id, url}}, phoneNumber, backupPhoneNumber, email, website, country, city, state, location, mapLocation, Currency, _createdAt,image
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
    };
  } else if (parsedMinPrice !== undefined && parsedMaxPrice !== undefined) {
    query = `*[_type == "postAd" && payment == true && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + subcategoryId.limit}] {
      _id, adName, category->{_id, title}, subcategory->{_id, title}, brand, model, condition, authenticity, tags, price, negotiable, description, features, photos[]{asset->{_id, url}}, phoneNumber, backupPhoneNumber, email, website, country, city, state, location, mapLocation, Currency, _createdAt,image
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && price >= $minPrice && price <= $maxPrice])`;

    params = {
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
    };
  } else {
    return null;
  }

  try {
    const result = await client.fetch(query, params);
    const resultCount = await client.fetch(queryCount, params);

    return {
      result,
      resultCount,
    };
  } catch (error) {
    return error;
  }
}

export async function getAdById(id: string) {
  const query = `
    *[_type == "postAd" && payment == true && _id == $id][0] {
      _id,
      adName,
      category->{
        _id,
        title,
        price
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
      photos[] {
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
      Currency,
      _createdAt,
      options,
      user->{
        _id,
        externalId,
        name,
        avatarUrl,
        email,
        verifiedSeller,
        member,
      

      },
      image,
      viewCount
    }
  `;

  const params = { id };

  const result = await client.fetch(query, params);

  return result;
}
export async function getAdByIdForPayment(id: string) {
  const query = `
    *[_type == "postAd" && payment == false && _id == $id][0] {
      _id,
      adName,
      category->{
        _id,
        title,
        price
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
      photos[] {
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
      Currency,
      _createdAt,
      options,
      user->{
        externalId,
        name,
        avatarUrl,
        email

      },
      image,
    }
  `;

  const params = { id };

  const result = await client.fetch(query, params);
  return result;
}

export async function GetAdByUser(userID: string, page: number, Limit: number) {
  const start = (page - 1) * Limit;

  const queryCount = `count(*[_type == "postAd" && payment == true  && user->externalId == $userExternalId])`;

  const query = `*[_type == "postAd" &&  payment == true && user->externalId == $userExternalId]  | order(_createdAt desc) [${start}...${start + Limit}] {
   _id,
      adName,
      category->{
        _id,
        title,
        slug
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
      photos[] {
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
      Currency,
      _createdAt,
      image
  }`;

  const params = { userExternalId: userID };

  const result = await client.fetch(query, params);
  const resultCount = await client.fetch(queryCount, params);

  return {
    resultCount,
    result,
  };
}

export async function GetAdByUserPayementFalse(
  userID: string,
  page: number,
  Limit: number
) {
  const start = (page - 1) * Limit;
  const query = `*[_type == "postAd" &&  payment == false && user->externalId == $userExternalId]  | order(_createdAt desc) [${start}...${start + Limit}] {
   _id,
      adName,
      category->{
        _id,
        title,
        slug,
        price
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
      photos[] {
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
      Currency,
      _createdAt,
      image
      
  }`;

  const params = { userExternalId: userID };

  const result = await client.fetch(query, params);

  return result;
}

interface CateID {
  cateid: any;
}

export async function GetAdByCategory(cateid:any ) {


  const query = `
    *[_type == "postAd" && category._ref == $cateid &&  payment == true] {
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
      Currency,
      authenticity,
      options,
      price,
      negotiable,
      description,
      features,
      photos[]{
        asset->{
          _id,
          url
        },
        alt
      },
      phoneNumber,
      country,
      state,
      location,
      mapLocation,
      user->{
        _id,
        name
      },
      payment,
      image[],
      viewCount,
      _createdAt,
    }
  `;
  const params = { cateid };
  const result = await client.fetch(query, params);
 
  
  return result
}



