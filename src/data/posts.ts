// Client-side functions for loading blog posts from API
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: number
  coverImage?: string
  tags: string[]
  content?: string // Raw MDX content for client-side compilation
  rawContent?: string // Raw markdown content for TOC generation
  frontmatter?: {
    title: string
    date: string
    excerpt: string
    readingTime?: number
    coverImage?: string
    tags?: string[]
    toc?: boolean // Table of contents flag
    [key: string]: any
  }
}

export interface GroupedPosts {
  year: number
  months: {
    month: string
    posts: BlogPost[]
  }[]
}

export const getLatestPosts = async (count: number = 5): Promise<BlogPost[]> => {
  try {
    const response = await fetch("/api/blog")
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const posts: BlogPost[] = await response.json()
    return posts.slice(0, count)
  } catch (error) {
    console.error("Error loading latest posts:", error)
    return []
  }
}
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const response = await fetch(`/api/blog/${slug}`)
    if (!response.ok) {
      if (response.status === 404) {
        return undefined
      }
      throw new Error("Failed to fetch post")
    }
    return await response.json()
  } catch (error) {
    console.error("Error loading post by slug:", error)
    return undefined
  }
}
export const getPostsGroupedByDate = async (): Promise<GroupedPosts[]> => {
  try {
    const response = await fetch("/api/blog")
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const posts: BlogPost[] = await response.json()

    // Group posts by year and month
    const grouped: { [year: number]: { [month: string]: BlogPost[] } } = {}

    posts.forEach((post) => {
      const date = new Date(post.date)
      const year = date.getFullYear()
      const month = date.toLocaleString("default", { month: "long" }).toUpperCase()

      if (!grouped[year]) {
        grouped[year] = {}
      }
      if (!grouped[year][month]) {
        grouped[year][month] = []
      }

      grouped[year][month].push(post)
    })

    // Convert to array and sort
    return Object.entries(grouped)
      .map(([year, months]) => ({
        year: parseInt(year),
        months: Object.entries(months).map(([month, posts]) => ({
          month,
          posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        })),
      }))
      .sort((a, b) => b.year - a.year)
  } catch (error) {
    console.error("Error grouping posts by date:", error)
    return []
  }
}
