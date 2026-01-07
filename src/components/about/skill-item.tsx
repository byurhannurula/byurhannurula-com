interface SkillItemProps {
  name: string;
  delay?: number;
}

export function SkillItem({ name, delay = 0 }: SkillItemProps) {
  return (
    <div
      className="flex animate-fade-in items-center gap-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-muted-foreground text-sm">{name}</span>
    </div>
  );
}
