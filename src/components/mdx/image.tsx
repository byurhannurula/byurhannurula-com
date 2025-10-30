"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface MDXImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  width?: number
  height?: number
}

export function MDXImage({ src, alt, caption, className = "", width, height }: MDXImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span className={`not-prose my-8 block ${className}`}>
        <span className="relative block">
          <span
            className="relative block cursor-zoom-in overflow-hidden rounded-lg transition-opacity hover:opacity-90"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={src}
              alt={alt}
              width={width || 1200}
              height={height || 800}
              sizes="(max-width: 768px) 100vw, 800px"
              className="h-auto w-full"
            />
          </span>

          {/* Caption below image */}
          {(caption || alt) && (
            <span className="mt-3 block text-center text-xs text-muted-foreground">
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
  )
}
