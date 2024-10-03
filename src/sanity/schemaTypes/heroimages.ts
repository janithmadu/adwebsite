import { Rule } from "sanity";

export default {
    name: 'heroImage',
    title: 'Hero Image',
    type: 'document',
    fields: [
      {
        name: 'imageName',
        title: 'Image Name',
        type: 'string',
        description: 'The name of the hero image',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'altText',
        title: 'Alt Text',
        type: 'string',
        description: 'Alternative text for the image, for accessibility',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enables image cropping in the studio
        },
        description: 'Upload the hero image',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        options: {
          // Set initial value to current date/time when the document is created
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm:ss',
          calendarTodayLabel: 'Today',
          readOnly: true, 
        },
      }
    ],
  };
  