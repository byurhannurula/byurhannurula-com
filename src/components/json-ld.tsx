import { SITE_CONFIG } from "@/config";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  url: string;
  tags?: string[];
}

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  author = SITE_CONFIG.author.name,
  image,
  url,
  tags = [],
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`,
      },
    }),
    ...(tags.length > 0 && {
      keywords: tags.join(", "),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebsiteJsonLdProps {
  url?: string;
  name?: string;
  description?: string;
}

export function WebsiteJsonLd({
  url = SITE_CONFIG.url,
  name = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
}: WebsiteJsonLdProps = {}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
      sameAs: [
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.twitter,
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.mastodon,
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface PersonJsonLdProps {
  name?: string;
  url?: string;
  jobTitle?: string;
  description?: string;
}

export function PersonJsonLd({
  name = SITE_CONFIG.author.name,
  url = SITE_CONFIG.url,
  jobTitle = "Full-Stack Software Engineer",
  description = SITE_CONFIG.description,
}: PersonJsonLdProps = {}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    description,
    email: SITE_CONFIG.author.email,
    sameAs: [
      SITE_CONFIG.social.github,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.mastodon,
      SITE_CONFIG.social.instagram,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
