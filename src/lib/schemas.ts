import { z } from "zod";

export const stepOneSChema = z.object({
  name: z
    .string()
    .min(2, "Name  must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  category: z.string().min(1, "You need  to select a category"),
  subcategory: z.string().min(1, "You need  to select a subcategory"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  brand: z.string().min(1, "Brand must be at least 1 character"),
  model: z.string().min(1, "Model must be at least 1 character"),
  conditions: z.string().min(1, "Conditions must be at least 1 character"),
  Authenticity: z.string().min(1, "Authenticity must be at least 1 character"),
  mobile:z.coerce.number().min(10, "Mobile Number  must be at least 10 digits"),


});

export const NewAddSchema = z.object({
  ...stepOneSChema.shape,
});

export const newAddsInitialValuesSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  price: z.coerce.number().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  conditions: z.string().optional(),
  Authenticity: z.string().optional(),
  mobile:z.coerce.number().optional(),
});

export type NewAdd = z.infer<typeof NewAddSchema>;

export type newAddsInitialValuesType = z.infer<typeof newAddsInitialValuesSchema>;
