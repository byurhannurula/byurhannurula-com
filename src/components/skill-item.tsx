"use client"

interface SkillItemProps {
  name: string
  delay?: number
}

export function SkillItem({ name, delay = 0 }: SkillItemProps) {
  return (
    <div
      className="animate-fade-in flex items-center gap-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  )
}
