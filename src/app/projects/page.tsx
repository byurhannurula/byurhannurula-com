"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

import { PageWrapper } from "@/components/page-wrapper"

type ProjectCategory = "all" | "dev" | "side" | "homelab" | "3dprint"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  category: ProjectCategory
  tags: string[]
  github?: string
  url?: string
  featured?: boolean
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "dev", label: "Development" },
    { key: "side", label: "Side Projects" },
    { key: "homelab", label: "Homelab" },
    { key: "3dprint", label: "3D Printing" },
  ]

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12">
        <h1 className="text-2xl font-medium">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Things I&apos;ve built, tinkered with, and experimented on.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">No projects in this category yet.</p>
      )}
    </PageWrapper>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-muted/30">
      {/* Image */}
      {project.image ? (
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={375}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <span className="text-4xl opacity-30">🔧</span>
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-primary">
          {project.category === "dev" && "Development"}
          {project.category === "side" && "Side Project"}
          {project.category === "homelab" && "Homelab"}
          {project.category === "3dprint" && "3D Printing"}
        </div>
        <h3 className="mb-1 font-medium">{project.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-3.5" />
              <span>Code</span>
            </Link>
          )}
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="size-3.5" />
              <span>View</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// Project data - replace with your actual projects
const projects: Project[] = [
  // Development Projects
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "This website you're looking at. Built with Next.js 15, TypeScript, and Tailwind CSS.",
    category: "dev",
    tags: ["Next.js", "TypeScript", "Tailwind", "MDX"],
    github: "https://github.com/byurhannurula/portfolio",
    url: "https://byurhannurula.com",
  },
  {
    id: "recheck",
    title: "ReCheck Platform",
    description: "Blockchain-based document verification and secure data exchange platform.",
    category: "dev",
    tags: ["React", "TypeScript", "Blockchain", "Web3"],
  },

  // Side Projects
  {
    id: "dotfiles",
    title: "Dotfiles",
    description: "My personal dotfiles for macOS - Neovim, Zsh, Tmux, and more.",
    category: "side",
    tags: ["Shell", "Neovim", "Lua", "Zsh"],
    github: "https://github.com/byurhannurula/dotfiles",
  },

  // Homelab
  {
    id: "homelab",
    title: "Homelab Infrastructure",
    description:
      "Self-hosted services running on Proxmox - media server, DNS, monitoring, and more.",
    category: "homelab",
    tags: ["Proxmox", "Docker", "Networking", "Linux"],
  },
  {
    id: "pihole",
    title: "Pi-hole DNS",
    description: "Network-wide ad blocking and local DNS resolution for all devices.",
    category: "homelab",
    tags: ["Pi-hole", "DNS", "Raspberry Pi", "Networking"],
  },

  // 3D Printing
  {
    id: "desk-organizer",
    title: "Desk Organizer",
    description: "Custom designed desk organizer for cables, pens, and small items.",
    category: "3dprint",
    tags: ["Fusion 360", "PLA", "Functional"],
  },
  {
    id: "phone-stand",
    title: "Phone Stand",
    description: "Minimalist phone stand with cable management.",
    category: "3dprint",
    tags: ["Fusion 360", "PETG", "Functional"],
  },
]
