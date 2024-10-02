import { Rule } from "sanity";

export default {
  name: "model",
  title: "Model",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Model Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
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
  ],
};
