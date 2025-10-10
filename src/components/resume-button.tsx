import { FileDown } from "lucide-react"

export function ResumeButton() {
  return (
    <a
      href="/john-doe-resume.pdf" // This would be the path to your actual resume file
      download
      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <FileDown className="h-3.5 w-3.5" />
      Download Resume
    </a>
  )
}
