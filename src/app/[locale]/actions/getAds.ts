import { client } from "@/sanity/lib/client";

export async function getPostAds(page: any, limit: any) {
  const start = (page - 1) * limit;

  const query = `
    *[_type == "postAd"] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }
  `;
  const queryCount = `count(*[_type == "postAd"])`;

  const result = await client.fetch(query);
  const resultcount = await client.fetch(queryCount);
  return {
    result,
    resultcount,
  };
}

export async function getAdsBySub(subcategoryId: any, page: any, limit: any) {
  const start = (page - 1) * limit;

  let query = ``;
  let params: any = {};
  let queryCount = ``;

  if (
    subcategoryId.minPrice &&
    subcategoryId.maxPrice &&
    subcategoryId.subOptions &&
    subcategoryId.subcategories
  ) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0;
    const parsedMaxPrice =
      parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    query = `*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;

    queryCount = `count(*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value && price >= $minPrice && price <= $maxPrice])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
    };
  } else if (subcategoryId.subOptions && subcategoryId.subcategories) {
    query = `*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;
    queryCount = `count(*[_type == "postAd" && subcategory._ref == $subcategoryId && $options in options[].value])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      options: subcategoryId.subOptions,
    };
  } else if (
    subcategoryId.subOptions &&
    subcategoryId.minPrice &&
    subcategoryId.maxPrice
  ) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0;
    const parsedMaxPrice =
      parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    query = `*[_type == "postAd" && $options in options[].value && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;
    queryCount = `count(*[_type == "postAd" && $options in options[].value && price >= $minPrice && price <= $maxPrice])`;

    params = {
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
    };
  } else if (subcategoryId.subcategories) {
    query = `*[_type == "postAd" && subcategory._ref == $subcategoryId] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;

    queryCount = `count(*[_type == "postAd" && subcategory._ref == $subcategoryId] )`;

    params = {
      subcategoryId: subcategoryId.subcategories,
    };
  } else if (subcategoryId.subOptions) {
    query = `*[_type == "postAd" && $options in options[].value] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;
    queryCount = `count(*[_type == "postAd" && $options in options[].value])`;

    params = {
      options: subcategoryId.subOptions,
    };
  } else if (subcategoryId.minPrice && subcategoryId.maxPrice) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0;
    const parsedMaxPrice =
      parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    query = `*[_type == "postAd" && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
      Currency
    }`;

    queryCount = `count(*[_type == "postAd" && price >= $minPrice && price <= $maxPrice])`;

    params = {
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
    };
  } else {
    return null;
  }

  const result = await client.fetch(query, params);
  const resultcount = await client.fetch(queryCount, params);
  return {
    result,
    resultcount,
  };
}

export async function getAdById(id: string) {
  const query = `
    *[_type == "postAd" && _id == $AdId]  {
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
      options
    }`;

  const params = {
    AdId: id,
  };
  const result = await client.fetch(query, params);
return result
}
