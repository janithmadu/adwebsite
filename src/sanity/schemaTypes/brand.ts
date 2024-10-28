import { Rule } from "sanity";

export default {
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Brand Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English Title",
          type: "string",
          validation: (Rule: Rule) => Rule.required().min(2).max(50),
        },
        {
          name: "ar",
          title: "Arabic Title",
          type: "string",
          validation: (Rule: Rule) => Rule.required().min(2).max(50),
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en", // Slug will be generated from the English title
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "subcategory" }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) => Rule.max(200),
    },
    {
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping
      },
      
    },
  ],
};
