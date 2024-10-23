import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "hkxjit8b",
  dataset: "test",
  apiVersion: "2022-03-25",
  useCdn: true,
  token:"sk5HZSfdPAJepVFVeXVV2rFElxkDOCdp6J8cbiNB9BXHqoTuv8CgYG6acmgLEQUT3QB05HuoV4Fqt45Zp8BwXchYEy1z4s7jE1CicOEqF9IUJu3izSGJ9JO5vSzOPR2jzOo7yvQQ3s2GO3mwLOTt9rYEmjAMiBw9SKCjLFosw88GfzsNFnFQ",
});

const imageUrl = imageUrlBuilder(client);

export function urlFor(source: any) {
  return imageUrl.image(source);
}
