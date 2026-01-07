import { cn } from "@/lib/utils";

export function Table({ children, className, ...props }: any) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table
        {...props}
        className={cn("w-full border-collapse text-sm", className)}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className, ...props }: any) {
  return (
    <thead {...props} className={cn("bg-muted/50", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }: any) {
  return (
    <tbody {...props} className={cn("[&>tr:last-child]:border-0", className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, ...props }: any) {
  return (
    <tr
      {...props}
      className={cn(
        "border-border/50 border-b transition-colors hover:bg-muted/30",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHeader({ children, className, ...props }: any) {
  return (
    <th
      {...props}
      className={cn(
        "px-4 py-3 text-left font-semibold text-foreground text-sm",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className, ...props }: any) {
  return (
    <td
      {...props}
      className={cn("px-4 py-3 text-muted-foreground text-sm", className)}
    >
      {children}
    </td>
  );
}
