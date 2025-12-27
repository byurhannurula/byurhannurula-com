export function HeroGradient() {
  return (
    <div className="pointer-events-none absolute -left-4 top-0 h-28 w-px overflow-hidden">
      <div
        className="h-full w-full animate-pulse"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.6), transparent)",
        }}
      />
    </div>
  )
}
