import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com", "gravatar.com"], // Add this line
  },
};

export default withNextIntl(nextConfig);
