"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { cn } from "@/lib/utils";

type ImageSize = "default" | "wide" | "wider" | "full";

interface MDXImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
  size?: ImageSize;
  priority?: boolean;
  blurDataURL?: string;
}

const sizeClasses: Record<ImageSize, string> = {
  default: "",
  wide: "md:-mx-16 lg:-mx-24",
  wider: "relative left-1/2 right-1/2 -ml-[42vw] -mr-[42vw] w-[84vw] max-w-6xl",
  full: "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen !rounded-none",
};

export function MDXImage({
  src,
  alt,
  caption,
  className = "",
  width,
  height,
  size = "default",
  priority = false,
  blurDataURL,
}: MDXImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <span
        className={cn("not-prose my-6 block", sizeClasses[size], className)}
      >
        <span className="relative block">
          <span
            className={cn(
              "relative block cursor-zoom-in overflow-hidden transition-opacity hover:opacity-90",
              size === "full" ? "" : "rounded-lg"
            )}
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={src}
              alt={alt}
              width={width || 1200}
              height={height || 800}
              sizes={
                size === "full"
                  ? "100vw"
                  : size === "wider"
                    ? "(max-width: 1536px) 84vw, 1536px"
                    : size === "wide"
                      ? "(max-width: 1024px) 100vw, 1024px"
                      : "(max-width: 768px) 100vw, 768px"
              }
              className={cn(
                "h-auto w-full transition-all duration-500",
                !(isLoaded || priority) && "scale-105 blur-lg",
                isLoaded && "scale-100 blur-0"
              )}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
              onLoad={handleLoad}
            />
          </span>

          {/* Caption below image */}
          {(caption || alt) && (
            <span
              className={cn(
                "mt-3 block text-center text-muted-foreground text-xs",
                size === "full" && "px-6"
              )}
            >
              {caption || alt}
            </span>
          )}
        </span>
      </span>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src, alt }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}

// Image Grid component for multiple images
type GridSize = "default" | "wide" | "wider" | "full";

interface ImageGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  size?: GridSize;
  className?: string;
}

const gridSizeClasses: Record<GridSize, string> = {
  default: "",
  wide: "md:-mx-16 lg:-mx-24",
  wider: "relative left-1/2 right-1/2 -ml-[42vw] -mr-[42vw] w-[84vw] max-w-6xl",
  full: "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-6",
};

export function ImageGrid({
  children,
  columns = 2,
  size = "default",
  className = "",
}: ImageGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div
      className={`not-prose my-6 grid gap-4 ${gridCols[columns]} ${gridSizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
}

// Grid Item - simplified image for use in grids
interface GridImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "auto";
  blurDataURL?: string;
}

export function GridImage({
  src,
  alt,
  aspectRatio = "auto",
  blurDataURL,
}: GridImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  };

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div
        className={cn(
          "cursor-zoom-in overflow-hidden rounded-lg",
          aspectClasses[aspectRatio]
        )}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            !isLoaded && "scale-105 blur-lg",
            isLoaded && "scale-100 blur-0 hover:scale-105"
          )}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
        />
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src, alt }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
