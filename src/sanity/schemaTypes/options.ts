import { Rule } from "sanity";

export default {
  name: 'option',
  title: 'Option',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en', // Use the English title for slug generation
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'values',
      title: 'Option Values',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          title: 'Value',
          fields: [
            { name: 'en', title: 'English Value', type: 'string' },
            { name: 'ar', title: 'Arabic Value', type: 'string' },
          ],
        },
      ],
      description: 'Define possible values for this option (e.g., Petrol, Diesel for Fuel Type).',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'subcategory' }] }], // Allow multiple references to subcategories
      description: 'Link this option to multiple subcategories.',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
