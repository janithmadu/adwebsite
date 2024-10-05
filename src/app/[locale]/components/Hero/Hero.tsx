"use client";
import Header from "../../public/Header.png";
import Header2 from "../../public/CDiVV6fzg8AG@original.png";
import Header3 from "../../public/f60c6jI2WjKj@original.png";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { getHeroImages } from "../../actions/getHero";

interface HeroImage {
  imageName: string;
  altText: string;
  imageUrl: string;
}

export const revalidate = 1;

export default function Hero(HeroImages: any) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <>
      <div className="embla" ref={emblaRef} dir="ltr">
        <div className="embla__container">
          {HeroImages?.HeroImages?.map((image: any, index: any) => {
            return (
              <div key={index} className="embla__slide">
                <Image alt="image" src={image.imageUrl} width={1920} height={446} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
