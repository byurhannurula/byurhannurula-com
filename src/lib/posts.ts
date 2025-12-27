import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  coverImage?: string
  tags: string[]
  toc?: boolean
  tocStyle?: "inline" | "sidebar"
  featured?: boolean
}

export interface Post {
  slug: string
  content: string
  frontmatter: PostFrontmatter
  readingTime: string
}

export function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

export function getSinglePost(slug: string): Post {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post with slug "${slug}" not found`)
  }

  const fileContents = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(fileContents)

  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): Omit<Post, "content">[] {
  const postsDirectory = path.join(process.cwd(), "content/blog")
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf-8")
      const { content, data } = matter(fileContents)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        readingTime: calculateReadingTime(content),
      }
    })

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })

  return posts
}

export function getFeaturedPost(): Omit<Post, "content"> | null {
  const posts = getAllPosts()
  return posts.find((post) => post.frontmatter.featured) || null
}

export interface GroupedPosts {
  year: number
  months: {
    month: string
    posts: Omit<Post, "content">[]
  }[]
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap((post) => post.frontmatter.tags)
  return Array.from(new Set(allTags)).sort()
}

export function getPostsGroupedByDate(tag?: string): GroupedPosts[] {
  const posts = getAllPosts()

  const filteredPosts = tag ? posts.filter((post) => post.frontmatter.tags.includes(tag)) : posts

  const grouped: { [year: number]: { [month: string]: Omit<Post, "content">[] } } = {}

  filteredPosts.forEach((post) => {
    const date = new Date(post.frontmatter.date)
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

  return Object.entries(grouped)
    .map(([year, months]) => ({
      year: parseInt(year),
      months: Object.entries(months).map(([month, posts]) => ({
        month,
        posts: posts.sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        ),
      })),
    }))
    .sort((a, b) => b.year - a.year)
}
