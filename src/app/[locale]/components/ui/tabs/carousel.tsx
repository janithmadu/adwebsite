"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: UseCarouselParameters[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;

      setPrevBtnDisabled(!api.canScrollPrev());
      setNextBtnDisabled(!api.canScrollNext());
    }, []);

    React.useEffect(() => {
      if (!emblaApi) return;

      onSelect(emblaApi);
      emblaApi.on("select", () => onSelect(emblaApi));
      emblaApi.on("reInit", () => onSelect(emblaApi));

      if (setApi) {
        setApi(emblaApi);
      }
    }, [emblaApi, setApi, onSelect]);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-lg bg-black"
        >
          <div className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          )}>
            {React.Children.map(children, (child) => (
              <div
                className={cn(
                  "min-w-0 flex-[0_0_100%]",
                  orientation === "horizontal" ? "pl-4" : "pt-4",
                )}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn(
            "absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-black/80 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-black disabled:opacity-0",
            prevBtnDisabled && "opacity-0"
          )}
          disabled={prevBtnDisabled}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className={cn(
            "absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-black/80 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-black disabled:opacity-0",
            nextBtnDisabled && "opacity-0"
          )}
          disabled={nextBtnDisabled}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export { Carousel };