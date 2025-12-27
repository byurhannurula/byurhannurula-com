export interface JourneyItem {
  emoji: string
  title: string
  description: string
  year?: string
}

export interface JourneySection {
  label: string
  type: "now" | "past"
  items: JourneyItem[]
}

export const journeyData: JourneySection[] = [
  {
    label: "Now",
    type: "now",
    items: [
      {
        emoji: "💼",
        title: "Software Developer",
        description: "Full-stack development at a startup, building web applications",
        year: "2025",
      },
      // {
      //   emoji: "🖥️",
      //   title: "Homelab Enthusiast",
      //   description:
      //     "Running Proxmox on mini PC, Pi 3B+ for backups, UniFi network setup (UCG Ultra + U6+)",
      //   year: "2024–",
      // },
    ],
  },
  {
    label: "Past",
    type: "past",
    items: [
      {
        emoji: "🏖️",
        title: "Career Break",
        description: "Took time off to recharge and focus on personal projects",
        year: "2024",
      },
      {
        emoji: "👨‍💻",
        title: "Software Developer",
        description: "Full-time position at the startup where I did my internship",
        year: "2020–2023",
      },
      {
        emoji: "💻",
        title: "Internship",
        description: "Started as an intern at a startup during Master's studies",
        year: "2020",
      },
      {
        emoji: "🎓",
        title: "Bachelor's and Master's Degree",
        description: "Computer Systems and Technologies",
        year: "2015–2020",
      },
      {
        emoji: "📚",
        title: "High School",
        description: "Learned Pascal, C, and Visual Basic",
        year: "2010–2015",
      },
      {
        emoji: "🏆",
        title: "Informatics Olympiad",
        description: "3rd place in municipal olympiad for informatics and IT",
        year: "8th grade",
      },
      {
        emoji: "🐣",
        title: "First Lines of Code",
        description: "Started learning HTML/CSS in 6th grade",
        year: "6th grade",
      },
    ],
  },
]
