"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { pageAnimations } from "@/lib"
import { PageWrapper } from "@/components/page-wrapper"

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  // Filter projects based on selected tag
  const filteredProjects = projects.filter((project) => {
    return selectedTag ? project.tags.includes(selectedTag) : true
  })

  return (
    <PageWrapper>
      <motion.div {...pageAnimations.container} className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Projects
          </h2>
        </div>
        <h1 className="text-3xl font-light leading-tight md:text-4xl">
          Selected <span className="text-primary">work</span> from the past 5 years.
        </h1>
      </motion.div>

      <motion.div {...pageAnimations.staggerContainer} className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            className={`text-xs font-medium uppercase tracking-wider ${
              selectedTag === null ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`text-xs font-medium uppercase tracking-wider ${
                selectedTag === tag ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div {...pageAnimations.itemWithDelay(0.2)} className="mb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} {...pageAnimations.fastItem(index, 0.3)}>
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium group-hover:text-primary">{project.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageWrapper>
  )
}

// Updated project data
const projects = [
  {
    id: "recheck-platform",
    title: "ReCheck Blockchain Platform",
    description: "A blockchain-based platform for document verification and secure data exchange.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Blockchain", "Web3"],
  },
  {
    id: "ecommerce-system",
    title: "E-commerce System",
    description:
      "A full-featured e-commerce platform with payment processing and inventory management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
  },
  {
    id: "content-management",
    title: "Content Management System",
    description: "A custom CMS built for a media company with advanced publishing workflows.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard for monitoring business metrics and user behavior.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "Node.js", "WebSockets"],
  },
  {
    id: "inventory-system",
    title: "Inventory Management System",
    description:
      "A comprehensive inventory tracking system for retail businesses with barcode scanning.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Express", "MongoDB", "TailwindCSS"],
  },
  {
    id: "document-verification",
    title: "Document Verification API",
    description: "A secure API for verifying document authenticity using blockchain technology.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Node.js", "Express", "Blockchain", "Docker"],
  },
]
