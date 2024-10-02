import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "hkxjit8b",
  dataset: "test",
  apiVersion: "2022-03-25",
  useCdn: true,
});

const imageUrl = imageUrlBuilder(client);

export function urlFor(source: any) {
  return imageUrl.image(source);
}
