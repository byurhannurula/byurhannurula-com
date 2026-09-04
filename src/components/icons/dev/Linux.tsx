import type { SVGProps } from "react";

/*
 * devicon's linux-original, served as a file rather than inlined.
 *
 * The artwork is 194KB of gradient-shaded Tux. As a component it shipped twice
 * on every page that renders it -- once in the HTML and again in the RSC
 * payload -- which made /about a 788KB document and its hydration a ~900ms
 * long task, for a mark drawn at 16px.
 *
 * Nothing is lost by moving it out: unlike every other icon here it is full
 * colour, so it never inherited currentColor and had no reason to be inline.
 * As a file it is fetched once, cached, and costs the document nothing.
 */
export default function Linux({ className }: SVGProps<SVGSVGElement>) {
  return (
    // biome-ignore lint/performance/noImgElement: see the comment above
    <img
      alt=""
      className={className}
      decoding="async"
      loading="lazy"
      src="/assets/icons/linux.svg"
    />
  );
}
