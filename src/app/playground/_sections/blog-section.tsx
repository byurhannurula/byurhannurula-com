import {
  BlogCardHome,
  BlogPostItem,
  PostStats,
  ShareButtons,
} from "@/components/blog";

import { samplePosts } from "../_data/sample-post";
import { Section, SubBlock } from "./section";

const SAMPLE_TAGS = ["homelab", "networking", "docker", "k8s", "self-hosting"];

export function BlogSection() {
  return (
    <Section
      id="blog"
      title="Blog Components"
      description="Post lists, cards, tags, share, and stats."
      className="space-y-12"
    >
      <SubBlock
        label="Post list item (dotted, animated arrow)"
        className="space-y-4"
      >
        {samplePosts.map((post) => (
          <BlogPostItem key={post.slug} post={post} />
        ))}
      </SubBlock>

      <SubBlock label="Home card (with views)" className="space-y-6">
        {samplePosts.map((post, i) => (
          <BlogCardHome key={post.slug} post={post} views={(i + 1) * 421} />
        ))}
      </SubBlock>

      <div className="grid gap-12 sm:grid-cols-2">
        <SubBlock label="Tag chips">
          <div className="flex flex-wrap gap-2">
            {SAMPLE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted px-3 py-1 text-muted-foreground text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </SubBlock>

        <SubBlock label="Post stats (views + like)">
          <PostStats
            slug="playground-demo"
            initialViews={1234}
            initialLikes={56}
          />
        </SubBlock>
      </div>

      <SubBlock label="Share buttons">
        <ShareButtons
          title="Building a UniFi Homelab from Scratch"
          url="/notes/playground-demo"
        />
      </SubBlock>
    </Section>
  );
}
