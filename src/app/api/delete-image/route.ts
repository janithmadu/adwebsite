import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(reqest: Request) {
  const addata = await reqest.json();

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  cloudinary.uploader.destroy(addata.id);

  return NextResponse.json({ status: true });
}
