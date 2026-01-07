import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MDXLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MDXLink({ href, children, className }: MDXLinkProps) {
  const isExternal = href?.startsWith("http");
  const _isAnchor = href?.startsWith("#");

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline",
        className
      )}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
      {isExternal && <ExternalLink className="inline h-3 w-3" />}
    </a>
  );
}
