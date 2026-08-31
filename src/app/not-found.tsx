"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUGGESTIONS = [
  { path: "/", label: "home" },
  { path: "/notes", label: "notes" },
  { path: "/projects", label: "projects" },
  { path: "/uses", label: "uses" },
  { path: "/about", label: "about" },
] as const;

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="py-16 font-mono text-[13.5px]">
      <h1 className="sr-only">Page not found</h1>

      <div className="space-y-1">
        <p>
          <span className="text-primary">byurhan@web</span>
          <span className="text-muted-foreground">:~$</span>{" "}
          <span>cd {pathname}</span>
        </p>
        <p className="text-muted-foreground">
          bash: cd: {pathname}: No such file or directory
        </p>
      </div>

      <div className="mt-8 space-y-1">
        <p>
          <span className="text-primary">byurhan@web</span>
          <span className="text-muted-foreground">:~$</span> <span>ls</span>
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
          {SUGGESTIONS.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="link-inline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8">
        <span className="text-primary">byurhan@web</span>
        <span className="text-muted-foreground">:~$</span>{" "}
        <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-foreground motion-safe:animate-[caret_1.06s_steps(1)_infinite]" />
      </p>
    </div>
  );
}
