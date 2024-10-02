import { type SchemaTypeDefinition } from "sanity";
import category from "./category";
import subcategory from "./subcategory";
import model from "./model";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, subcategory, model],
};
