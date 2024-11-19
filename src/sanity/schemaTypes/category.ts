import { Rule } from 'sanity';

export default {
  name: 'category',
  title: 'Category',
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
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
      validation: (Rule: Rule) => Rule.max(200),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'adCount',
      title: 'Ad Count',
      type: 'number',
      description: 'Number of ads associated with this category',
      validation: (Rule: Rule) => Rule.min(0),
      initialValue: 0, // Set default value to 0
    },
  ],
};
