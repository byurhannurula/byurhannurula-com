export interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  readingTime: number
  coverImage?: string
  tags: string[]
  content?: string
}

import { getContentForPost } from "./blog-content"

// Blog posts - currently empty, ready for real content
export const blogPosts: BlogPost[] = [
  // Add your real blog posts here when ready
  // Example structure:
  // {
  //   title: "Your Post Title",
  //   slug: "your-post-slug",
  //   date: "01 Jan",
  //   excerpt: "Brief description of your post...",
  //   readingTime: 5,
  //   coverImage: "https://example.com/image.jpg",
  //   tags: ["Technology", "Development"],
  //   content: "Full post content here..."
  // }
]

export const getLatestPosts = (count: number = 5): BlogPost[] => {
  return blogPosts.slice(0, count)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

// Helper function to parse date and get year/month
const parseDate = (dateStr: string) => {
  const currentYear = new Date().getFullYear()
  const [day, month] = dateStr.split(" ")

  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }

  const monthIndex = monthMap[month]
  const date = new Date(currentYear, monthIndex, parseInt(day))

  // If the date is in the future, assume it's from the previous year
  if (date > new Date()) {
    date.setFullYear(currentYear - 1)
  }

  return date
}

export interface GroupedPosts {
  year: number
  months: {
    month: string
    posts: BlogPost[]
  }[]
}

export const getPostsGroupedByDate = (): GroupedPosts[] => {
  const grouped: { [year: number]: { [month: string]: BlogPost[] } } = {}

  blogPosts.forEach((post) => {
    const date = parseDate(post.date)
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
        posts: posts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()),
      })),
    }))
    .sort((a, b) => b.year - a.year) // Most recent year first
}
