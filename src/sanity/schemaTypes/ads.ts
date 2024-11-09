// Sanity schema for "Post Ad"
import { Rule } from "sanity";
export default {
  name: "postAd",
  title: "Post Ad",
  type: "document",
  fields: [
    {
      name: "adName",
      title: "Ad Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
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
      name: "brand",
      title: "Brand",
      type: "string",
    },
    {
      name: "model",
      title: "Model",
      type: "string",
    },
    {
      name: "condition",
      title: "Condition",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Used", value: "used" },
        ],
      },
    },

    {
      name: "Currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "LKR", value: "LKR" },
          { title: "USD", value: "USD" },
        ],
      },
    },
    {
      name: "authenticity",
      title: "Authenticity",
      type: "string",
      options: {
        list: [
          { title: "Original", value: "original" },
          { title: "Copy", value: "copy" },
        ],
      },
    },
    {
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Key", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    },
    {
      name: "price",
      title: "Ad Prices (USD)",
      type: "number",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "negotiable",
      title: "Negotiable",
      type: "boolean",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "features",
      title: "Feature (optional)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "photos",
      title: "Upload Photos",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },

    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: [
          { title: "Afghanistan", value: "Afghanistan" },
          { title: "Albania", value: "Albania" },
          { title: "Algeria", value: "Algeria" },
          { title: "Andorra", value: "Andorra" },
          { title: "Angola", value: "Angola" },
          { title: "Antigua and Barbuda", value: "Antigua and Barbuda" },
          { title: "Argentina", value: "Argentina" },
          { title: "Armenia", value: "Armenia" },
          { title: "Australia", value: "Australia" },
          { title: "Austria", value: "Austria" },
          { title: "Azerbaijan", value: "Azerbaijan" },
          { title: "Bahamas", value: "Bahamas" },
          { title: "Bahrain", value: "Bahrain" },
          { title: "Bangladesh", value: "Bangladesh" },
          { title: "Barbados", value: "Barbados" },
          { title: "Belarus", value: "Belarus" },
          { title: "Belgium", value: "Belgium" },
          { title: "Belize", value: "Belize" },
          { title: "Benin", value: "Benin" },
          { title: "Bhutan", value: "Bhutan" },
          { title: "Bolivia", value: "Bolivia" },
          { title: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
          { title: "Botswana", value: "Botswana" },
          { title: "Brazil", value: "Brazil" },
          { title: "Brunei", value: "Brunei" },
          { title: "Bulgaria", value: "Bulgaria" },
          { title: "Burkina Faso", value: "Burkina Faso" },
          { title: "Burundi", value: "Burundi" },
          { title: "Cabo Verde", value: "Cabo Verde" },
          { title: "Cambodia", value: "Cambodia" },
          { title: "Cameroon", value: "Cameroon" },
          { title: "Canada", value: "Canada" },
          {
            title: "Central African Republic",
            value: "Central African Republic",
          },
          { title: "Chad", value: "Chad" },
          { title: "Chile", value: "Chile" },
          { title: "China", value: "China" },
          { title: "Colombia", value: "Colombia" },
          { title: "Comoros", value: "Comoros" },
          {
            title: "Congo (Congo-Brazzaville)",
            value: "Congo (Congo-Brazzaville)",
          },
          { title: "Congo (Congo-Kinshasa)", value: "Congo (Congo-Kinshasa)" },
          { title: "Costa Rica", value: "Costa Rica" },
          { title: "Croatia", value: "Croatia" },
          { title: "Cuba", value: "Cuba" },
          { title: "Cyprus", value: "Cyprus" },
          { title: "Czech Republic", value: "Czech Republic" },
          { title: "Denmark", value: "Denmark" },
          { title: "Djibouti", value: "Djibouti" },
          { title: "Dominica", value: "Dominica" },
          { title: "Dominican Republic", value: "Dominican Republic" },
          { title: "Ecuador", value: "Ecuador" },
          { title: "Egypt", value: "Egypt" },
          { title: "El Salvador", value: "El Salvador" },
          { title: "Equatorial Guinea", value: "Equatorial Guinea" },
          { title: "Eritrea", value: "Eritrea" },
          { title: "Estonia", value: "Estonia" },
          { title: "Eswatini", value: "Eswatini" },
          { title: "Ethiopia", value: "Ethiopia" },
          { title: "Fiji", value: "Fiji" },
          { title: "Finland", value: "Finland" },
          { title: "France", value: "France" },
          { title: "Gabon", value: "Gabon" },
          { title: "Gambia", value: "Gambia" },
          { title: "Georgia", value: "Georgia" },
          { title: "Germany", value: "Germany" },
          { title: "Ghana", value: "Ghana" },
          { title: "Greece", value: "Greece" },
          { title: "Grenada", value: "Grenada" },
          { title: "Guatemala", value: "Guatemala" },
          { title: "Guinea", value: "Guinea" },
          { title: "Guinea-Bissau", value: "Guinea-Bissau" },
          { title: "Guyana", value: "Guyana" },
          { title: "Haiti", value: "Haiti" },
          { title: "Honduras", value: "Honduras" },
          { title: "Hungary", value: "Hungary" },
          { title: "Iceland", value: "Iceland" },
          { title: "India", value: "India" },
          { title: "Indonesia", value: "Indonesia" },
          { title: "Iran", value: "Iran" },
          { title: "Iraq", value: "Iraq" },
          { title: "Ireland", value: "Ireland" },
          { title: "Israel", value: "Israel" },
          { title: "Italy", value: "Italy" },
          { title: "Jamaica", value: "Jamaica" },
          { title: "Japan", value: "Japan" },
          { title: "Jordan", value: "Jordan" },
          { title: "Kazakhstan", value: "Kazakhstan" },
          { title: "Kenya", value: "Kenya" },
          { title: "Kiribati", value: "Kiribati" },
          { title: "Kuwait", value: "Kuwait" },
          { title: "Kyrgyzstan", value: "Kyrgyzstan" },
          { title: "Laos", value: "Laos" },
          { title: "Latvia", value: "Latvia" },
          { title: "Lebanon", value: "Lebanon" },
          { title: "Lesotho", value: "Lesotho" },
          { title: "Liberia", value: "Liberia" },
          { title: "Libya", value: "Libya" },
          { title: "Liechtenstein", value: "Liechtenstein" },
          { title: "Lithuania", value: "Lithuania" },
          { title: "Luxembourg", value: "Luxembourg" },
          { title: "Madagascar", value: "Madagascar" },
          { title: "Malawi", value: "Malawi" },
          { title: "Malaysia", value: "Malaysia" },
          { title: "Maldives", value: "Maldives" },
          { title: "Mali", value: "Mali" },
          { title: "Malta", value: "Malta" },
          { title: "Marshall Islands", value: "Marshall Islands" },
          { title: "Mauritania", value: "Mauritania" },
          { title: "Mauritius", value: "Mauritius" },
          { title: "Mexico", value: "Mexico" },
          { title: "Micronesia", value: "Micronesia" },
          { title: "Moldova", value: "Moldova" },
          { title: "Monaco", value: "Monaco" },
          { title: "Mongolia", value: "Mongolia" },
          { title: "Montenegro", value: "Montenegro" },
          { title: "Morocco", value: "Morocco" },
          { title: "Mozambique", value: "Mozambique" },
          { title: "Myanmar", value: "Myanmar" },
          { title: "Namibia", value: "Namibia" },
          { title: "Nauru", value: "Nauru" },
          { title: "Nepal", value: "Nepal" },
          { title: "Netherlands", value: "Netherlands" },
          { title: "New Zealand", value: "New Zealand" },
          { title: "Nicaragua", value: "Nicaragua" },
          { title: "Niger", value: "Niger" },
          { title: "Nigeria", value: "Nigeria" },
          { title: "North Korea", value: "North Korea" },
          { title: "North Macedonia", value: "North Macedonia" },
          { title: "Norway", value: "Norway" },
          { title: "Oman", value: "Oman" },
          { title: "Pakistan", value: "Pakistan" },
          { title: "Palau", value: "Palau" },
          { title: "Panama", value: "Panama" },
          { title: "Papua New Guinea", value: "Papua New Guinea" },
          { title: "Paraguay", value: "Paraguay" },
          { title: "Peru", value: "Peru" },
          { title: "Philippines", value: "Philippines" },
          { title: "Poland", value: "Poland" },
          { title: "Portugal", value: "Portugal" },
          { title: "Qatar", value: "Qatar" },
          { title: "Romania", value: "Romania" },
          { title: "Russia", value: "Russia" },
          { title: "Rwanda", value: "Rwanda" },
          { title: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
          { title: "Saint Lucia", value: "Saint Lucia" },
          {
            title: "Saint Vincent and the Grenadines",
            value: "Saint Vincent and the Grenadines",
          },
          { title: "Samoa", value: "Samoa" },
          { title: "San Marino", value: "San Marino" },
          { title: "Sao Tome and Principe", value: "Sao Tome and Principe" },
          { title: "Saudi Arabia", value: "Saudi Arabia" },
          { title: "Senegal", value: "Senegal" },
          { title: "Serbia", value: "Serbia" },
          { title: "Seychelles", value: "Seychelles" },
          { title: "Sierra Leone", value: "Sierra Leone" },
          { title: "Singapore", value: "Singapore" },
          { title: "Slovakia", value: "Slovakia" },
          { title: "Slovenia", value: "Slovenia" },
          { title: "Solomon Islands", value: "Solomon Islands" },
          { title: "Somalia", value: "Somalia" },
          { title: "South Africa", value: "South Africa" },
          { title: "South Korea", value: "South Korea" },
          { title: "South Sudan", value: "South Sudan" },
          { title: "Spain", value: "Spain" },
          { title: "Sri Lanka", value: "Sri Lanka" },
          { title: "Sudan", value: "Sudan" },
          { title: "Suriname", value: "Suriname" },
          { title: "Sweden", value: "Sweden" },
          { title: "Switzerland", value: "Switzerland" },
          { title: "Syria", value: "Syria" },
          { title: "Taiwan", value: "Taiwan" },
          { title: "Tajikistan", value: "Tajikistan" },
          { title: "Tanzania", value: "Tanzania" },
          { title: "Thailand", value: "Thailand" },
          { title: "Timor-Leste", value: "Timor-Leste" },
          { title: "Togo", value: "Togo" },
          { title: "Tonga", value: "Tonga" },
          { title: "Trinidad and Tobago", value: "Trinidad and Tobago" },
          { title: "Tunisia", value: "Tunisia" },
          { title: "Turkey", value: "Turkey" },
          { title: "Turkmenistan", value: "Turkmenistan" },
          { title: "Tuvalu", value: "Tuvalu" },
          { title: "Uganda", value: "Uganda" },
          { title: "Ukraine", value: "Ukraine" },
          { title: "United Arab Emirates", value: "United Arab Emirates" },
          { title: "United Kingdom", value: "United Kingdom" },
          {
            title: "United States of America",
            value: "United States of America",
          },
          { title: "Uruguay", value: "Uruguay" },
          { title: "Uzbekistan", value: "Uzbekistan" },
          { title: "Vanuatu", value: "Vanuatu" },
          { title: "Vatican City", value: "Vatican City" },
          { title: "Venezuela", value: "Venezuela" },
          { title: "Vietnam", value: "Vietnam" },
          { title: "Yemen", value: "Yemen" },
          { title: "Zambia", value: "Zambia" },
          { title: "Zimbabwe", value: "Zimbabwe" },
        ],
      },
    },
    {
      name: "state",
      title: "State",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "mapLocation",
      title: "Map Location (optional)",
      type: "geopoint",
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "payment",
      title: "payment",
      type: "boolean",
    },
    {
      name: "asset",
      title: "Asset",
      type: "object",
      fields: [
        {
          name: "imageId",
          title: "Image ID",
          type: "string",
          description: "Unique identifier for the image asset",
        },
        {
          name: "imageUrl",
          title: "Image URL",
          type: "url",
          description: "URL of the image asset",
        },
      ],
    },


  ],



};
