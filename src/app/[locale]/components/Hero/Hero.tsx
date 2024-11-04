"use client";
// components/Hero/Hero.tsx
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export interface Images {
  imageName: string;
  altText: string;
  imageUrl: string;
  createdAt: string;
}

export const Hero: React.FC<{ HeroImages: Images[] }> = ({ HeroImages }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef} dir="ltr">
      <div className="embla__container">
        {HeroImages.map((image, index) => (
          <div key={index} className="embla__slide">
            <Image
              alt={image.altText}
              src={image.imageUrl}
              width={1920}
              height={446}
              layout="responsive"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
