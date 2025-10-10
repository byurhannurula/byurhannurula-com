"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Camera, Filter } from "lucide-react"

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get unique categories
  const categories = Array.from(new Set(photos.map((photo) => photo.category)))

  // Filter photos based on selected category
  const filteredPhotos = selectedCategory ? photos.filter((photo) => photo.category === selectedCategory) : photos

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-8">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to about
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-[1px] w-12 bg-primary"></div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Photography</h2>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light leading-tight md:text-4xl">
              My <span className="text-primary">photo</span> gallery.
            </h1>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Camera className="h-5 w-5" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-4">
              <button
                className={`text-xs font-medium uppercase tracking-wider ${
                  selectedCategory === null ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`text-xs font-medium uppercase tracking-wider ${
                    selectedCategory === category ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="group cursor-pointer"
                onClick={() => window.open(photo.image, "_blank")}
              >
                <div className="overflow-hidden rounded-lg bg-muted">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-base font-medium">{photo.title}</h3>
                  <p className="text-xs text-muted-foreground">{photo.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Sample photo data
const photos = [
  {
    id: 1,
    title: "Mountain Sunrise",
    location: "Rila Mountains, Bulgaria",
    category: "Landscape",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Urban Geometry",
    location: "Sofia, Bulgaria",
    category: "Urban",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Coastal Sunset",
    location: "Black Sea, Bulgaria",
    category: "Landscape",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Street Life",
    location: "Plovdiv, Bulgaria",
    category: "Urban",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Forest Path",
    location: "Vitosha Mountain, Bulgaria",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "Historic Architecture",
    location: "Veliko Tarnovo, Bulgaria",
    category: "Architecture",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    title: "Misty Valley",
    location: "Rhodope Mountains, Bulgaria",
    category: "Landscape",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    title: "Modern Cityscape",
    location: "Sofia, Bulgaria",
    category: "Urban",
    image: "/placeholder.svg?height=300&width=400",
  },
]
