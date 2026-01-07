export interface Short {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
    language?: string;
  };
}
