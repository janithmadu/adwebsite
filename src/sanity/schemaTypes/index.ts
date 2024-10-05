import { type SchemaTypeDefinition } from "sanity";
import category from "./category";
import subcategory from "./subcategory";
import model from "./model";
import hero from "./hero";
import heroimages from "./heroimages";
import ads from "./ads";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, subcategory, model,hero,heroimages,ads],
};
