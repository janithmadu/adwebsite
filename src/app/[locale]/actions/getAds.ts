import { client } from "@/sanity/lib/client";

export async function getPostAds(page: any, limit: any) {
  const start = (page - 1) * limit;

  const query = `
    *[_type == "postAd" && payment == true] | order(_createdAt desc) [${start}...${start + limit}] {
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
      _createdAt
    }
  `;
  const queryCount = `count(*[_type == "postAd" && payment == true])`;

  const result = await client.fetch(query);
  const resultcount = await client.fetch(queryCount);
  return {
    result,
    resultcount,
  };
}

export async function getAdsBySub(subcategoryId: any, page: any, limit: any) {
  console.log(subcategoryId.subcategories);

  const start = (page - 1) * limit;

  console.log();
  if (subcategoryId.subcategories && subcategoryId.category) {
    console.log("Done");
  }

  let query = ``;
  let params: any = {};
  let queryCount = ``;

  if (
    subcategoryId.minPrice &&
    subcategoryId.maxPrice &&
    subcategoryId.subOptions &&
    subcategoryId.subcategories &&
    subcategoryId.category // Add this check for category slug
  ) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0;
    const parsedMaxPrice =
      parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug && $options in options[].value && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
      _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug && $options in options[].value && price >= $minPrice && price <= $maxPrice])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      categorySlug: subcategoryId.category, // Add the slug parameter here
    };
  } else if (subcategoryId.subcategories && subcategoryId.category) {
    

    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && category->slug.current == $categorySlug])`;

    params = {
      subcategoryId: subcategoryId.subcategories,
      categorySlug: subcategoryId.category, // Add the slug parameter here
    };
  } else if (subcategoryId.subOptions && subcategoryId.category) {
    query = `*[_type == "postAd" && payment == true && category->slug.current == $categorySlug && $options in options[].value] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && category->slug.current == $categorySlug && $options in options[].value])`;

    params = {
      categorySlug: subcategoryId.category,
      options: subcategoryId.subOptions,
    };
  } else if (subcategoryId.category) {
    console.log("This is Done");

    query = `*[_type == "postAd" && payment == true && category->slug.current == $categorySlug] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && category->slug.current == $categorySlug])`;

    params = {
      categorySlug: subcategoryId.category, // Only slug parameter
    };
  } else if (subcategoryId.subOptions && subcategoryId.subcategories) {
    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && $options in options[].value] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;
    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId && $options in options[].value])`;

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

    query = `*[_type == "postAd" && payment == true && $options in options[].value && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;
    queryCount = `count(*[_type == "postAd" && payment == true && $options in options[].value && price >= $minPrice && price <= $maxPrice])`;

    params = {
      options: subcategoryId.subOptions,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
    };
  } else if (subcategoryId.subcategories) {
    query = `*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && subcategory._ref == $subcategoryId] )`;

    params = {
      subcategoryId: subcategoryId.subcategories,
    };
  } else if (subcategoryId.subOptions) {
    query = `*[_type == "postAd" && payment == true && $options in options[].value] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;
    queryCount = `count(*[_type == "postAd" && payment == true && $options in options[].value])`;

    params = {
      options: subcategoryId.subOptions,
    };
  } else if (subcategoryId.minPrice && subcategoryId.maxPrice) {
    const parsedMinPrice = parseInt(subcategoryId.minPrice, 10) || 0;
    const parsedMaxPrice =
      parseInt(subcategoryId.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    query = `*[_type == "postAd" && payment == true && price >= $minPrice && price <= $maxPrice] | order(_createdAt desc) [${start}...${start + limit}] {
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
       _createdAt
    }`;

    queryCount = `count(*[_type == "postAd" && payment == true && price >= $minPrice && price <= $maxPrice])`;

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

export async function getAdById(id: any) {
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
        externalId,
        name,
        avatarUrl,
        email,
        verifiedSeller,
        member

      },
    }
  `;

  const params = { id };

  const result = await client.fetch(query, params);
  return result;
}
export async function getAdByIdForPayment(id: any) {
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
    }
  `;

  const params = { id };

  const result = await client.fetch(query, params);
  return result;
}

export async function GetAdByUser(userID: string) {
  const query = `*[_type == "postAd" &&  payment == true && user->externalId == $userExternalId]  | order(_createdAt desc) {
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
      _createdAt
  }`;

  const params = { userExternalId: userID };

  const result = await client.fetch(query, params);

  return result;
}
