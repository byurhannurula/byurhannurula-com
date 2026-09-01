"use client";

import Image from "next/image";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useState,
} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { splitIntoRows } from "@/lib/gallery-rows";
import { cn } from "@/lib/utils";

type ImageSize = "default" | "wide" | "wider" | "full";

interface MDXImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** String, not number: MDX drops JSX expression attributes on these tags. */
  width?: number | string;
  height?: number | string;
  size?: ImageSize;
  priority?: boolean;
  blurDataURL?: string;
}

/**
 * A bled figure crosses container-editorial's dashed side rules. Painting the
 * page background behind it, with vertical padding, cuts those rules cleanly a
 * few pixels clear of the image rather than leaving them clipped at its edge.
 * Written out per variant: Tailwind only scans literal class strings, and a
 * responsive prefix applies to one class, not to an interpolated group.
 */
const sizeClasses: Record<ImageSize, string> = {
  default: "",
  wide: "md:relative md:-mx-16 md:bg-background md:py-3 lg:-mx-24",
  wider:
    "relative right-1/2 left-1/2 -mr-[42vw] -ml-[42vw] w-[84vw] max-w-6xl bg-background py-3",
  full: "relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen bg-background py-3 !rounded-none",
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
              size === "full" ? "" : "rounded-md"
            )}
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={src}
              alt={alt}
              width={Number(width) || 1200}
              height={Number(height) || 800}
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
  /**
   * Accepted for authoring compatibility but no longer read: rows are derived
   * from the image count, the way Ghost does it.
   */
  columns?: string | number;
  size?: GridSize;
  className?: string;
}

type GridColumns = 2 | 3 | 4 | "2" | "3" | "4";

/**
 * A justified gallery: rows of images that share a height and together fill
 * the width exactly, with nothing cropped.
 *
 * Each image gets `flex: <aspect-ratio> 1 0%` and renders at its natural
 * height, so a row's height falls out as `rowWidth / sum(ratios)`. There is
 * deliberately no row-height variable -- pinning a height is what forces a
 * crop. Matches Ghost's gallery card, which is where this pattern comes from.
 *
 * Ratios come from `width`/`height`, filled in at build time by
 * `remarkImageDimensions`, so authors write only `src` and `alt`. If they are
 * missing the row still renders and each image corrects its own ratio on load.
 */

/** The gallery's own measure, wider than prose but short of full bleed. */
const GALLERY_MAX = 1040;
const GALLERY_WIDTH = `w-[min(100vw-2rem,${GALLERY_MAX}px)]`;
const BLED = `relative right-1/2 left-1/2 -translate-x-1/2 ${GALLERY_WIDTH} bg-background py-3`;

const gridSizeClasses: Record<GridSize, string> = {
  default: "",
  wide: BLED,
  wider: BLED,
  full: "relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen bg-background px-6 py-3",
};

/** 3:2, used only until a real ratio is known. */
const FALLBACK_RATIO = 1.5;

function ratioOf(props: { width?: number | string; height?: number | string }) {
  const w = Number(props.width);
  const h = Number(props.height);
  return w > 0 && h > 0 ? w / h : FALLBACK_RATIO;
}

export function ImageGrid({
  children,
  size = "default",
  className = "",
}: ImageGridProps) {
  // Filtered, not raw: MDX leaves whitespace text nodes between the tags, and
  // counting those as images splits a 3-image gallery into two rows.
  const rows = splitIntoRows(
    Children.toArray(children).filter(isValidElement<GridImageProps>)
  );

  return (
    <div
      className={cn(
        "not-prose my-6 flex flex-col gap-0.5",
        gridSizeClasses[size],
        className
      )}
    >
      {rows.map((row, index) => {
        const ratios = row.map((child) => ratioOf(child.props));
        const total = ratios.reduce((sum, r) => sum + r, 0);
        return (
          <div
            // Rows are positional and a gallery is static.
            // biome-ignore lint/suspicious/noArrayIndexKey: no stable id available
            key={index}
            className="flex items-start gap-0.5"
          >
            {row.map((child, column) =>
              cloneElement(child, { widthFraction: ratios[column] / total })
            )}
          </div>
        );
      })}
    </div>
  );
}

interface GridImageProps {
  src: string;
  alt: string;
  /**
   * Intrinsic size. Strings, not numbers: this MDX pipeline drops JSX
   * expression attributes. Normally supplied by `remarkImageDimensions`.
   */
  width?: number | string;
  height?: number | string;
  /**
   * Share of the row's width this image takes, injected by ImageGrid. Only the
   * row knows it, and without it every image would request the full row width.
   */
  widthFraction?: number;
  blurDataURL?: string;
}

export function GridImage({
  src,
  alt,
  width,
  height,
  widthFraction = 1,
  blurDataURL,
}: GridImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // Only used when the build could not resolve the image: the row is laid out
  // on a guess, then corrected once the browser knows the real shape.
  const [measured, setMeasured] = useState<number | null>(null);

  const intrinsic = Number(width) > 0 && Number(height) > 0;
  const ratio = intrinsic
    ? Number(width) / Number(height)
    : (measured ?? FALLBACK_RATIO);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      if (!intrinsic && naturalWidth && naturalHeight) {
        setMeasured(naturalWidth / naturalHeight);
      }
      setIsLoaded(true);
    },
    [intrinsic]
  );

  return (
    <>
      <button
        type="button"
        aria-label={`Open image: ${alt}`}
        className="block cursor-zoom-in appearance-none overflow-hidden rounded-md border-0 bg-transparent p-0"
        style={{ flex: `${ratio} 1 0%` }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={Number(width) || 1500}
          height={Number(height) || 1000}
          // An image is only its share of the row, so asking for the whole
          // row's width would over-fetch every tile in a multi-image gallery.
          sizes={`(max-width: ${GALLERY_MAX}px) ${Math.round(widthFraction * 100)}vw, ${Math.round(GALLERY_MAX * widthFraction)}px`}
          className={cn(
            "block h-auto w-full transition-[filter] duration-500",
            isLoaded ? "blur-0" : "blur-lg"
          )}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
        />
      </button>
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
