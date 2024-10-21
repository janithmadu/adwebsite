"use client";
import Image from "next/image";

import React, { useState } from "react";

export const revalidate = 1;

function ImageGallery(Images: any) {
  console.log();

  const [selectedImage, setSelectedImage] = useState("");

  return (
    <div className="">
      <Image
        src={selectedImage || Images?.Images[0]?.asset?.url}
        alt="Main Product Image"
        width={600}
        height={600}
        className="rounded-lg shadow-lg mb-4 "
      />

      {/* Thumbnails */}
      <div className="flex gap-x-2 ">
        {Images?.Images.map((image: any, index: any) => (
          <Image
            key={index}
            src={image.asset?.url}
            alt={`Thumbnail ${index + 1}`}
            width={80}
            height={80}
            className="cursor-pointer  h-20 object-cover"
            onClick={() => setSelectedImage(image.asset?.url)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;