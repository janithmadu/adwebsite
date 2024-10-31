

export default {
  name: "hero",
  type: "document",
  fields: [
    {
      name: "ImageName",
      title: "Image Name",
      type: "string",
    },
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
