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

import { getContentForPost } from './blog-content'

export const blogPosts: BlogPost[] = [
  // 2025 Posts
  {
    title: "Bambu Lab H2S vs X1C",
    slug: "bambu-lab-h2s-vs-x1c",
    date: "01 Oct",
    excerpt: "I upgraded my three year old 3d Printer, the Bambu Lab X1C with the newly released H2S. There are multiple",
    readingTime: 8,
    coverImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop",
    tags: ["3D Printing", "Hardware", "Review"],
    content: getContentForPost("bambu-lab-h2s-vs-x1c", ["3D Printing", "Hardware", "Review"]),
  },
  {
    title: "A Week in Billund: LEGO House, LEGOLAND, and Lalandia",
    slug: "week-in-billund-lego",
    date: "30 Aug",
    excerpt: "We spent a week in Billund, Denmark. The home of LEGO. LEGO fans know that Billund has a special place.",
    readingTime: 10,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    tags: ["Travel", "LEGO", "Denmark"],
    content: getContentForPost("week-in-billund-lego", ["Travel", "LEGO", "Denmark"]),
  },
  {
    title: "Hyper Case: Designing my own keyboard case",
    slug: "hyper-case-keyboard-design",
    date: "05 Jul",
    excerpt: "The Hyper case is my latest design project. It's a custom-made case for the Halcyon Elora Split keyboard",
    readingTime: 12,
    coverImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=400&fit=crop",
    tags: ["Design", "Keyboard", "3D Printing"],
    content: getContentForPost("hyper-case-keyboard-design", ["Design", "Keyboard", "3D Printing"]),
  },
  {
    title: "Fujifilm X half: Is it the perfect family camera ?",
    slug: "fujifilm-x-half-review",
    date: "14 Jun",
    excerpt: "When Fujifilm announced the Fujifilm X half, the internet was literally divided into two halves. Some people were disappointed that",
    readingTime: 15,
    coverImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop",
    tags: ["Photography", "Camera", "Review"],
    content: getContentForPost("fujifilm-x-half-review", ["Photography", "Camera", "Review"]),
  },
  {
    title: "Automatic dark mode for Terminal Apps, Revisited",
    slug: "automatic-dark-mode-terminal",
    date: "06 Jun",
    excerpt: "A deep dive into automatically switching terminal applications between light and dark themes based on system preferences.",
    readingTime: 8,
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=400&fit=crop",
    tags: ["Terminal", "macOS", "Automation"],
    content: getContentForPost("automatic-dark-mode-terminal", ["Terminal", "macOS", "Automation"]),
  },
  {
    title: "The Barbican",
    slug: "the-barbican",
    date: "12 May",
    excerpt: "Exploring the architectural marvel that is the Barbican Centre in London and its influence on modern design.",
    readingTime: 6,
    coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
    tags: ["Architecture", "Design", "London"],
    content: getContentForPost("the-barbican", ["Architecture", "Design", "London"]),
  },
  {
    title: "Managing friction",
    slug: "managing-friction",
    date: "08 Apr",
    excerpt: "How reducing friction in daily workflows can dramatically improve productivity and reduce mental overhead.",
    readingTime: 7,
    coverImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=400&fit=crop",
    tags: ["Productivity", "Workflow", "Philosophy"],
    content: getContentForPost("managing-friction", ["Productivity", "Workflow", "Philosophy"]),
  },
  {
    title: "I was wrong about AI Coding",
    slug: "wrong-about-ai-coding",
    date: "26 Mar",
    excerpt: "My evolving perspective on AI-assisted development and how it's changing the way I approach coding problems.",
    readingTime: 10,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    tags: ["AI", "Development", "Opinion"],
    content: getContentForPost("wrong-about-ai-coding", ["AI", "Development", "Opinion"]),
  },
  {
    title: "Plotter Notebook System",
    slug: "plotter-notebook-system",
    date: "24 Feb",
    excerpt: "Building a custom plotting system for generating unique notebook designs and patterns.",
    readingTime: 14,
    coverImage: "/placeholder.svg",
    tags: ["Plotting", "Design", "Automation"],
  },
  {
    title: "The Zettelkasten note taking methodology",
    slug: "zettelkasten-methodology",
    date: "30 Jan",
    excerpt: "Implementing the Zettelkasten method for better knowledge management and connecting ideas.",
    readingTime: 12,
    coverImage: "/placeholder.svg",
    tags: ["Productivity", "Note-taking", "Knowledge"],
  },
  {
    title: "My first lighting design: Block Lamp",
    slug: "block-lamp-design",
    date: "25 Jan",
    excerpt: "Designing and building a minimalist lamp using 3D printing and modern LED technology.",
    readingTime: 9,
    coverImage: "/placeholder.svg",
    tags: ["Design", "3D Printing", "Lighting"],
  },
  {
    title: "Four years at PlanetScale",
    slug: "four-years-planetscale",
    date: "20 Jan",
    excerpt: "Reflecting on my journey at PlanetScale and the lessons learned building database infrastructure.",
    readingTime: 11,
    coverImage: "/placeholder.svg",
    tags: ["Career", "Database", "Reflection"],
  },

  // 2024 Posts
  {
    title: "New homepage design",
    slug: "new-homepage-design",
    date: "04 Nov",
    excerpt: "Redesigning my personal website with a focus on simplicity and better content organization.",
    readingTime: 8,
    coverImage: "/placeholder.svg",
    tags: ["Design", "Web Development", "Portfolio"],
  },
  {
    title: "How I Designed a Dieter Rams inspired iPhone Dock",
    slug: "dieter-rams-iphone-dock",
    date: "23 Sep",
    excerpt: "Creating a minimalist iPhone dock inspired by Dieter Rams' design principles and Braun aesthetics.",
    readingTime: 13,
    coverImage: "/placeholder.svg",
    tags: ["Design", "3D Printing", "Minimalism"],
  },
  {
    title: "My Homelab Setup",
    slug: "my-homelab-setup",
    date: "10 Sep",
    excerpt: "A complete overview of my homelab infrastructure, from hardware to the services I self-host.",
    readingTime: 18,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["Homelab", "Self-hosting", "Infrastructure"],
    content: getContentForPost("my-homelab-setup", ["Homelab", "Self-hosting", "Infrastructure"]),
  },
  {
    title: "A month in Munich",
    slug: "month-in-munich",
    date: "31 Aug",
    excerpt: "Living and working remotely from Munich for a month - experiences, observations, and recommendations.",
    readingTime: 9,
    coverImage: "/placeholder.svg",
    tags: ["Travel", "Remote Work", "Germany"],
  },
  {
    title: "Setting up Cloudflare Tunnels for Secure Home Access",
    slug: "cloudflare-tunnels-homelab",
    date: "15 Jul",
    excerpt: "How I use Cloudflare Tunnels to securely expose my self-hosted services without opening ports on my router.",
    readingTime: 12,
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop",
    tags: ["Homelab", "Security", "Networking"],
    content: getContentForPost("cloudflare-tunnels-homelab", ["Homelab", "Security", "Networking"]),
  },
  {
    title: "My Journey to Digital Privacy: Why I Self-Host Everything",
    slug: "digital-privacy-self-hosting",
    date: "02 Jun",
    excerpt: "The privacy concerns that drove me to build my own homelab and self-host all my digital services.",
    readingTime: 15,
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    tags: ["Privacy", "Self-hosting", "Security"],
    content: getContentForPost("digital-privacy-self-hosting", ["Privacy", "Self-hosting", "Security"]),
  },
  {
    title: "UniFi Network Setup: From Consumer Router to Enterprise",
    slug: "unifi-network-setup",
    date: "18 Apr",
    excerpt: "Upgrading my home network with UniFi gear - UCG Ultra, U6+ access points, and network segmentation for security.",
    readingTime: 20,
    coverImage: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=400&fit=crop",
    tags: ["Networking", "UniFi", "Homelab"],
    content: getContentForPost("unifi-network-setup", ["Networking", "UniFi", "Homelab"]),
  },
  {
    title: "Building a Custom Mechanical Keyboard",
    slug: "custom-mechanical-keyboard",
    date: "05 Mar",
    excerpt: "My journey into the world of custom mechanical keyboards - from switches to keycaps to case design.",
    readingTime: 16,
    coverImage: "/placeholder.svg",
    tags: ["Keyboard", "Hardware", "DIY"],
  },
  {
    title: "Migrating from Google Photos to Immich",
    slug: "google-photos-to-immich",
    date: "14 Feb",
    excerpt: "How I migrated 50,000+ photos from Google Photos to my self-hosted Immich instance.",
    readingTime: 14,
    coverImage: "/placeholder.svg",
    tags: ["Self-hosting", "Privacy", "Photography"],
  },
  {
    title: "The Perfect Home Office Setup",
    slug: "perfect-home-office-setup",
    date: "28 Jan",
    excerpt: "Optimizing my home office for productivity, comfort, and aesthetics during remote work.",
    readingTime: 11,
    coverImage: "/placeholder.svg",
    tags: ["Productivity", "Home Office", "Setup"],
  }
]

export const getLatestPosts = (count: number = 5): BlogPost[] => {
  return blogPosts.slice(0, count)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

// Helper function to parse date and get year/month
const parseDate = (dateStr: string) => {
  const currentYear = new Date().getFullYear()
  const [day, month] = dateStr.split(' ')
  
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
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
  
  blogPosts.forEach(post => {
    const date = parseDate(post.date)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    
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
        posts: posts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
      }))
    }))
    .sort((a, b) => b.year - a.year) // Most recent year first
}
