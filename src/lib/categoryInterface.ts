export interface Category {
    title: {
      en: string; // English title
      ar: string; // Arabic title
    };
    slug: {
      current: string; // Current slug string
    };
    image?: {
      _type: 'image'; // Specify the type
      asset: {
        _ref: string; // Reference to the image asset
        _type: 'reference'; // Asset type
      };
    };
    description?: {
      en: string; // English description
      ar: string; // Arabic description
    };
    price: number; // Price of the category
  
    // Optional: Define GetCategory method if needed
    GetCategory:any
  }

  export interface Subcategory {
    _id: string; // Document ID
    _type: 'subcategory'; // Type of the document
    title: {
      en: string; // English title
      ar: string; // Arabic title
    };
    slug: {
      _type: 'slug'; // Type of the slug
      current: string; // Slug string
    };
    category: {
      _type: 'reference'; // Reference type
      _ref: string; // Reference ID to the category document
    };
    image?: {
      _type: 'image'; // Type of the image
      asset: {
        _ref: string; // Reference ID to the image asset
      };
    };
    description?: {
      en: string; // English description
      ar: string; // Arabic description
    };

  }
  



// Define the Brand interface for the main document structure
export interface Brand {
  title: {
    en: string;  // English Title
    ar: string;  // Arabic Title
  };
  slug: {
    _type: 'slug';      // Type of the slug
    current: string;    // Slug string
  };
  subcategory: {
    _type: 'reference'; // Reference type
    _ref: string;       // Reference ID to subcategory
  };
  description?: string; // Optional description field
  logo?: {
    _type: 'image';      // Type of the image
    asset: {
      _type: 'reference'; // Reference type for the asset
      _ref: string;       // Reference ID to the image asset
    };
  };
  subBrands:any
}


export interface Option {
    title: {
      en: string; // English title
      ar: string; // Arabic title
    };
    slug: {
      _type: 'slug'; // Type of the slug
      current: string; // Actual slug value
    };
    values: Array<{
      en: string; // English value
      ar: string; // Arabic value
    }>; // An array of option values
    subcategories: Array<{
      _type: 'reference'; // Type indicating it's a reference
      _ref: string; // Reference ID to the subcategory
    }>; // Array of references to subcategories
  }
  

  export interface Model {
    title: {
      en: string; // English title with a length between 2 and 50 characters
      ar: string; // Arabic title with a length between 2 and 50 characters
    };
    slug: {
      _type: 'slug'; // Type of the slug
      current: string; // Slug value generated from the English title
    };
    subcategory: {
      _type: 'reference'; // Type indicating it's a reference
      _ref: string; // Reference ID for subcategory
    };
    description?: string; // Optional description with a maximum length of 200 characters
  }

  export interface FormStateNew {
    ZodError: null | string;
    data: {
      name: string;
      category: string;
      subcategory: string;
      price: string;
      brand: string;
      model: string;
      conditions: string;
      authenticity: string;
      mobile: string;
      description: string;
      image: string;
      options: string;
    };
    message: string | null; // Message to show if required fields are missing
    response: {
      Currency: string;
      _createdAt: string;
      _id: string;
      _rev: string;
      _type: string;
      [key: string]: any; // Allows additional fields that might be part of the response
    };
    status: boolean;
    zodErrors?: {
      [key: string]: string[]; // Error messages for fields, stored in arrays
    };
  }
  
  
  
  
  