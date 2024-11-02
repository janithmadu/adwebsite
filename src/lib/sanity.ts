import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN,
});

const imageUrl = imageUrlBuilder(client);

export function urlFor(source: string) {

  
  return imageUrl.image(source);
}
