import {
  Callout,
  GridImage,
  ImageGrid,
  MDXImage,
  MDXLink,
  MDXRenderer,
  Mermaid,
} from "@/components/mdx";

import {
  CALLOUT_TYPES,
  GRID_COLUMNS,
  IMAGE_SIZES,
  SAMPLE_MDX,
} from "../_data/showcase";
import { Section, SubBlock } from "./section";

const DEMO_IMAGE = "/assets/images/macbook-pro-14.jpg";
const GRID_IMAGES = [
  "/assets/images/unifi-ucg-ultra.jpg",
  "/assets/images/raspberry-pi-3b.jpg",
  "/assets/images/sony-wh1000xm4.jpg",
  "/assets/images/keyboard.jpg",
];

export async function MdxSection() {
  return (
    <Section
      id="mdx"
      title="MDX Elements"
      description="Everything available inside a note: callouts, code, tables, images, grids, diagrams, links."
      className="space-y-12"
    >
      <SubBlock label="Callouts" className="space-y-3">
        {CALLOUT_TYPES.map((type) => (
          <Callout key={type} type={type} title={`${type} callout`}>
            This is a {type} callout demonstrating the border, tint, and icon.
          </Callout>
        ))}
      </SubBlock>

      <SubBlock label="Links">
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <MDXLink href="/notes">Internal link</MDXLink>
          <MDXLink href="https://example.com">
            External link (auto icon)
          </MDXLink>
        </p>
      </SubBlock>

      {IMAGE_SIZES.map((size) => (
        <SubBlock key={size} label={`Image — size="${size}"`}>
          <MDXImage
            src={DEMO_IMAGE}
            alt={`Demo image, ${size} size`}
            caption={`size="${size}" — default = column width, wide/wider/full break out`}
            size={size}
            width={1200}
            height={700}
          />
        </SubBlock>
      ))}

      <SubBlock label="Image grids (2 / 3 / 4 columns)" className="space-y-6">
        {GRID_COLUMNS.map((columns) => (
          <ImageGrid key={columns} columns={columns}>
            {GRID_IMAGES.slice(0, columns).map((src) => (
              <GridImage
                key={src}
                src={src}
                alt="Grid demo"
                aspectRatio="square"
              />
            ))}
          </ImageGrid>
        ))}
      </SubBlock>

      <SubBlock label="Mermaid diagram">
        <Mermaid
          chart={`graph TD;
  A[Request] --> B{Cached?};
  B -- Yes --> C[Serve from CDN];
  B -- No --> D[Render];
  D --> E[Store in cache];
  E --> C;`}
        />
      </SubBlock>

      <SubBlock label="Full prose document (rendered MDX)">
        <div className="prose max-w-2xl" data-mdx-content>
          <MDXRenderer source={SAMPLE_MDX} />
        </div>
      </SubBlock>
    </Section>
  );
}
