import { z } from "zod";

export const SchemaAdPostForm = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  category: z
    .string()
    .min(1, "Select the right category for your ad.")
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid category.",
    }),
  subcategory: z
    .string()
    .min(1, "Pick the perfect subcategory to refine your listing.")
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid subcategory.",
    }),
  price: z.coerce.number().min(1, "Set a fair price for your item."),
  brands: z
    .string()
    .optional()
    ,
  model: z
    .string()
    .optional()
    ,
  conditions: z
    .string()
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid conditions.",
    }),
  authenticity: z
    .string()
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid authenticity.",
    }),
  mobileNumbe: z.string().min(10, "Enter a contact number."),
  Currency: z
    .string()
    .min(1, "State the currency for payment.")
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid Currency.",
    }),
  description: z.string().min(1, "Description is required"),
  options: z.array(z.string()).min(1, "Please select at least one option"),
  image: z
    .array(
      z.object({
        _key: z.string(),
        url: z.string().url(), // Ensures url is a valid URL
        altText: z.string().optional(), // Alt text can be optional
      })
    )
    .optional(),
  country: z
    .string()
    .min(1, "Select your country.")
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid country.",
    }),
  state: z
    .string()
    .min(1, "Select your state.")
    .refine((value) => value !== "DEFAULT", {
      message: "Please select a valid state.",
    }),
  negotiable: z.boolean().optional(),
});

export const SchemaUpdatePostForm = z.object({
  name: z
    .string()
    .min(2, "Name  must be at least 2 characters")
    .max(100, "Name must be at most 50 characters"),
  category: z
    .string()
    .min(1, "Select the right category for your ad.")
    .refine((value) => value === "DEFAULT", {
      message: "Please select a valid category",
    }),
  subcategory: z
    .string()
    .min(1, "Pick the perfect subcategory to refine your listing."),
  price: z.coerce.number().min(1, "Set a fair price for your item."),
  brand: z.string().optional(),
  model: z.string().optional(),
  conditions: z.string().optional(),
  authenticity: z.string().optional(),
  mobile: z.string().min(10, "Enter a contact number."),
  Currency: z.string().min(1, "State the currency for payment."),
  description: z.string().min(1, "Description is required"),
  image: z
    .array(z.instanceof(File))
    .refine(
      (files) =>
        files.every((file) => ["image/jpeg", "image/png"].includes(file.type)),
      { message: "Only .jpg and .png files are allowed." }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be less than 10MB.",
    }),
  options: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  country: z.string().min(1, "Slect Your Country."),
  state: z.string().min(1, "Slect Your State."),
  negotiable: z.boolean({
    required_error: "Negotiable Need",
  }),
});

export type FormType = z.infer<typeof SchemaAdPostForm>;
