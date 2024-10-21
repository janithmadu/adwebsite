import { z } from "zod";

export const stepOneSChema = z.object({
  name: z
    .string()
    .min(2, "Name  must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  category: z.string().min(1, "Select the right category for your ad."),
  subcategory: z.string().min(1, "Pick the perfect subcategory to refine your listing."),
  price: z.coerce.number().min(1, "Set a fair price for your item."),
  brand: z.string().min(1, "Specify the brand to add value."),
  model: z.string().min(1, "Provide the model for clarity."),
  conditions: z.string().min(1, "Describe the item's condition."),
  Authenticity: z.string().min(1, "Confirm if your item is authentic."),
  mobile: z.coerce.number().min(10, "Enter a contact number."),
  Currency: z.string().min(1, "State the currency for payment."),


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
  mobile: z.coerce.number().optional(),
});

export type NewAdd = z.infer<typeof NewAddSchema>;

export type newAddsInitialValuesType = z.infer<typeof newAddsInitialValuesSchema>;
