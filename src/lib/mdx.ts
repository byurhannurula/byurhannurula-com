// Note: This file is for server-side MDX processing only
// For client-side usage, use the API routes or server actions

export interface MDXPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    excerpt: string
    readingTime: number
    coverImage?: string
    tags: string[]
  }
  content: string
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Helper function to format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  }
  return date.toLocaleDateString("en-US", options)
}
