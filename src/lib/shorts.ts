import fs from "fs"
import path from "path"
import matter from "gray-matter"

const shortsDirectory = path.join(process.cwd(), "content/shorts")

export interface Short {
  slug: string
  content: string
  frontmatter: {
    title: string
    description: string
    date: string
    tags: string[]
    language?: string
  }
}

export function getAllShorts(): Omit<Short, "content">[] {
  if (!fs.existsSync(shortsDirectory)) {
    return []
  }

  const files = fs.readdirSync(shortsDirectory)
  const shorts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(shortsDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContent)

      return {
        slug: file.replace(".mdx", ""),
        frontmatter: {
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || new Date().toISOString().split("T")[0],
          tags: data.tags || [],
          language: data.language || "typescript",
        },
      }
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())

  return shorts
}

export function getSingleShort(slug: string): Short {
  const filePath = path.join(shortsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Short not found: ${slug}`)
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    content,
    frontmatter: {
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      language: data.language || "typescript",
    },
  }
}

export function getAllShortTags(): string[] {
  const shorts = getAllShorts()
  const tags = shorts.flatMap((short) => short.frontmatter.tags)
  return Array.from(new Set(tags)).sort()
}
