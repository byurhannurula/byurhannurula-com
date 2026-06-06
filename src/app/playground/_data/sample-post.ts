import type { Post } from "@/lib/server";

// Fake posts for showcasing blog components without touching real content.
export const samplePosts: Omit<Post, "content">[] = [
  {
    slug: "playground-demo",
    readingTime: "6 min read",
    frontmatter: {
      title: "Building a UniFi Homelab from Scratch",
      date: "31 May 2026",
      excerpt:
        "A complete guide to my home network: gateway, access points, VLANs, and the lessons learned wiring it all together.",
      tags: ["homelab", "networking"],
      coverImage: "/assets/images/unifi-ucg-ultra.jpg",
    },
  },
  {
    slug: "playground-demo-2",
    readingTime: "4 min read",
    frontmatter: {
      title: "Kubernetes Locally with k3d",
      date: "18 Apr 2026",
      excerpt:
        "Spinning up a throwaway cluster on a laptop, plus a tiny GitOps loop to keep it honest.",
      tags: ["k8s", "devops"],
    },
  },
  {
    slug: "playground-demo-3",
    readingTime: "8 min read",
    frontmatter: {
      title: "Docker Best Practices I Actually Use",
      date: "02 Mar 2026",
      excerpt:
        "Multi-stage builds, non-root users, and keeping images small without losing your mind.",
      tags: ["docker", "containers"],
    },
  },
];
