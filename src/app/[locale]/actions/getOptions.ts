import { client } from "@/lib/sanity";

export const getOptionsByID = async (subcategoryId: string) => {
  const query = `*[_type == "option" && references($subcategoryId)] {
  _id,
  title,
  slug,
  values,
  subcategories[]->{
    _id,
    title
  }
}`;

  const params = {
    subcategoryId: subcategoryId,
  };

  try {
    const options = await client.fetch(query, params);
    console.log(options);

    return options;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};
