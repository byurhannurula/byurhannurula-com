import { ReactNode } from "react"

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`pb-16 pt-24 ${className}`}>
      <div className="mx-auto max-w-screen-md px-6">{children}</div>
    </div>
  )
}
