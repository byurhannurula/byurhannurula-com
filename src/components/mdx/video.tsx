interface VideoProps {
  /** A file in /public or a full URL. */
  src: string;
  /** The still picture shown before play. */
  poster?: string;
  /** Says what the video shows, for a screen reader. */
  title?: string;
  caption?: string;
  /** Pixel size of the video. Only the shape is used; 16 / 9 without it. */
  width?: string | number;
  height?: string | number;
  /** A WebVTT file with captions, when the video has speech. */
  captions?: string;
}

/**
 * A video in a note. Nothing downloads before the reader presses play
 * (`preload="none"`), and the box has its shape from the start.
 */
export function Video({
  src,
  poster,
  title,
  caption,
  width,
  height,
  captions,
}: VideoProps) {
  const w = Number(width);
  const h = Number(height);
  const ratio = w > 0 && h > 0 ? `${w} / ${h}` : '16 / 9';
  return (
    <figure data-reveal className="my-11">
      {/* A clip with speech passes `captions`; a silent screen recording
          has nothing to caption. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={src}
        poster={poster}
        controls
        preload="none"
        playsInline
        aria-label={title}
        style={{ aspectRatio: ratio }}
        className="block w-full rounded-lg bg-sunk object-cover shadow-[0_0_0_1px_var(--line)]"
      >
        {captions ? (
          <track kind="captions" src={captions} srcLang="en" default />
        ) : null}
      </video>
      {caption ? (
        <figcaption className="mt-[0.8rem] text-center label-mono text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
