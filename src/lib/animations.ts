// Unified animation configurations for consistent page transitions
export const pageAnimations = {
  // Main container animations
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },

  // Staggered content animations
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, delay: 0.1 },
  },

  // Individual item animations
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },

  // Delayed item animations (for lists)
  itemWithDelay: (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay },
  }),

  // Fast item animations for lists
  fastItem: (index: number, baseDelay: number = 0.1) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, delay: baseDelay + index * 0.05 },
  }),
}

// Animation variants for framer-motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}
