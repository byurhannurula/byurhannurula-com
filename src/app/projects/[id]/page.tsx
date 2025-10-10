"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // In a real application, you would fetch the project data based on the ID
  // For this example, we'll find the project in our sample data
  const project = projects.find((p) => p.id === params.id) || projects[0]

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">("overview")

  return (
    <div className="pb-16 pt-24">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-wider text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-mono text-3xl font-medium md:text-4xl">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:bg-muted/80"
              >
                <Github className="h-3.5 w-3.5" />
                View Code
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={project.image || "/placeholder.svg?height=400&width=600"}
              alt={project.title}
              width={720}
              height={405}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="mb-6 flex border-b">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "features"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "tech"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tech Stack
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-base leading-relaxed"
              >
                <p>{project.overview}</p>
                {project.role && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">My Role</h3>
                    <p className="mt-2">{project.role}</p>
                  </div>
                )}
                {project.challenge && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">Challenge</h3>
                    <p className="mt-2">{project.challenge}</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-3 text-base leading-relaxed">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "tech" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {project.techStack.map((category) => (
                  <div key={category.name}>
                    <h3 className="font-mono text-sm font-medium uppercase tracking-wider">
                      {category.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wider">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={350}
                    height={200}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wider">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects
              .filter((p) => p.id !== params.id)
              .slice(0, 2)
              .map((project, index) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group block">
                  <div className="rounded-lg border bg-card p-4 transition-colors hover:border-primary">
                    <h4 className="text-base font-medium group-hover:text-primary">
                      {project.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Updated project data based on user's background
const projects = [
  {
    id: "recheck-platform",
    title: "ReCheck Blockchain Platform",
    description: "A blockchain-based platform for document verification and secure data exchange.",
    tags: ["React", "TypeScript", "Blockchain", "Web3", "Node.js"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://recheck.io",
    githubUrl: "https://github.com/recheck-io",
    overview:
      "ReCheck is a blockchain-based platform that provides secure document verification and data exchange. It allows users to verify the authenticity of documents, securely share sensitive information, and maintain an immutable record of all transactions.",
    role: "As a full-stack developer, I was responsible for implementing both frontend and backend features, ensuring seamless integration with blockchain technologies, and optimizing performance for a smooth user experience.",
    challenge:
      "The main challenge was creating an intuitive interface for complex blockchain operations while ensuring security and performance. We needed to make blockchain technology accessible to non-technical users while maintaining the integrity of the system.",
    features: [
      "Document verification using blockchain technology",
      "Secure data exchange with end-to-end encryption",
      "User authentication and access control",
      "Real-time notifications and updates",
      "Document history and audit trail",
      "Mobile-responsive design for access on any device",
      "Integration with existing document management systems",
      "Advanced search and filtering capabilities",
    ],
    techStack: [
      {
        name: "Frontend",
        items: ["React", "TypeScript", "Redux", "TailwindCSS", "Web3.js"],
      },
      {
        name: "Backend",
        items: ["Node.js", "Express", "MongoDB", "Mongoose"],
      },
      {
        name: "Blockchain",
        items: ["Ethereum", "Smart Contracts", "IPFS", "Metamask Integration"],
      },
    ],
    images: [
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
    ],
  },
  {
    id: "ecommerce-system",
    title: "E-commerce System",
    description:
      "A full-featured e-commerce platform with payment processing and inventory management.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe", "TailwindCSS"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/johndoe/ecommerce",
    overview:
      "This e-commerce platform provides businesses with a complete solution for selling products online. It includes product management, shopping cart functionality, secure checkout with Stripe, and order tracking.",
    role: "I designed and developed the entire application, focusing on creating a seamless shopping experience with fast page loads and responsive design.",
    challenge:
      "The main challenge was creating a scalable and performant solution that could handle high traffic and large product catalogs while maintaining fast page loads and a smooth user experience.",
    features: [
      "Product catalog with categories, filters, and search",
      "User authentication and account management",
      "Shopping cart and wishlist functionality",
      "Secure checkout with Stripe integration",
      "Order history and tracking",
      "Admin dashboard for product and order management",
      "Responsive design for all devices",
      "SEO optimization for better visibility",
    ],
    techStack: [
      {
        name: "Frontend",
        items: ["Next.js", "TypeScript", "TailwindCSS", "React Query"],
      },
      {
        name: "Backend",
        items: ["Node.js", "MongoDB", "Mongoose", "NextAuth.js"],
      },
      {
        name: "Integrations",
        items: ["Stripe API", "Cloudinary", "Vercel"],
      },
    ],
    images: [
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
    ],
  },
  {
    id: "content-management",
    title: "Content Management System",
    description: "A custom CMS built for a media company with advanced publishing workflows.",
    tags: ["React", "Node.js", "Express", "MongoDB", "GraphQL"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com/cms",
    githubUrl: "https://github.com/johndoe/cms",
    overview:
      "This custom content management system was built for a media company to streamline their publishing workflow. It includes features for content creation, editing, approval, scheduling, and analytics.",
    role: "I led the development of the backend API and database architecture, and collaborated with the frontend team to ensure seamless integration.",
    challenge:
      "The client needed a highly customized solution that would integrate with their existing systems while providing a more efficient workflow for their editorial team. The system needed to handle various content types and complex approval processes.",
    features: [
      "Rich text editor with media embedding",
      "Role-based access control",
      "Content versioning and history",
      "Workflow management with approval stages",
      "Scheduled publishing",
      "Content categorization and tagging",
      "SEO tools and recommendations",
      "Analytics dashboard for content performance",
    ],
    techStack: [
      {
        name: "Frontend",
        items: ["React", "Redux", "Draft.js", "Material UI"],
      },
      {
        name: "Backend",
        items: ["Node.js", "Express", "MongoDB", "Mongoose", "GraphQL"],
      },
      {
        name: "DevOps",
        items: ["Docker", "CI/CD", "AWS", "Monitoring"],
      },
    ],
    images: [
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
      "/placeholder.svg?height=200&width=350",
    ],
  },
]
