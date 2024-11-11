"use client";
import Image from "next/image";

import React, { useState } from "react";

export const revalidate = 1;

interface Images {
  images: Array<{
    _key: string;
    url: string; // Ensures URL format
    altText?: string; // Alt text is optional
  }>;
}

interface imagenew {
 url:string
}

function ImageGallery(Images:Images) {
  console.log();
  
  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className=" flex flex-col space-y-5">
      <div className="bg-grayscale20 flex justify-center items-center  min-w-full max-w-full max-h-[600px] rounded-lg overflow-hidden gap-y-10 ">
        <img
          src={selectedImage || Images.images[0].url || "/"}
          alt="Main Product Image"
          className="rounded-lg shadow-lg  min-w-10 max-h-[600px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-x-2 ">
        {Images?.images?.map((image: imagenew, index: number) => (
          <Image
            key={index}
            src={image?.url || ""}
            alt={`Thumbnail ${index + 1}`}
            width={80}
            height={80}
            className="cursor-pointer  h-20 object-cover"
            onClick={() => setSelectedImage(image?.url || "")}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
