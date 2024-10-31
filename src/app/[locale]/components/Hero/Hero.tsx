"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
                <Image
                  alt="image"
                  src={image.imageUrl}
                  width={1920}
                  height={446}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
