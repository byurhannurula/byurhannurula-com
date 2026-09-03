import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MDXLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MDXLink({ href, children, className }: MDXLinkProps) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      // Colour by destination: the accent leaves the site, the inbound hue
      // stays on it. The icon says the same thing for anyone who cannot use
      // the hue, so neither carries it alone.
      className={cn(
        "link-inline font-medium",
        !isExternal && "link-internal",
        className
      )}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
      {isExternal && (
        <ExternalLink className="ml-0.5 inline size-3 align-[-0.125em]" />
      )}
    </a>
  );
}
