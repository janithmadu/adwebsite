import { client } from "@/sanity/lib/client";

export const revalidate = 1;

export async function getlimitedCategory() {
  const quary: any = `*[_type == "category"][0...7]`;
  const data = await client.fetch(quary);

  return data;
}

export async function getAllCategory() {
  const quary: any = `*[_type == "category"] {
  "id": _id,
  title {
    en,
    ar
  },
  slug {
    current
  },
  "imageUrl": image.asset->url, // Directly gets the image URL
  description {
    en,
    ar
  }
}
`;
  const data = await client.fetch(quary);

  return data;
}
