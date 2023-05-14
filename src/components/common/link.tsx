import { ReactNode } from 'react';

import { cn } from '@/utils';

export type BaseLinkProps = {
  href: string;
  blank?: boolean;
  className?: string;
  children?: ReactNode;
};

export function BaseLink({
  children,
  href,
  className,
  blank = true,
  ...props
}: BaseLinkProps) {
  const isBlank = blank
    ? {
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {};

  return (
    <a href={href} className={cn(className)} {...isBlank} {...props}>
      {children}
    </a>
  );
}

export function StyleLink({ className, ...props }: BaseLinkProps) {
  return (
    <BaseLink
      className={cn(
        'underline decoration-[2.5px] underline-offset-4',
        'text-zinc-700 decoration-zinc-700 dark:text-zinc-400 dark:decoration-zinc-400',
        'dark:hover:text-emerald-500 dark:hover:decoration-emerald-500',
        'hover:text-emerald-500 hover:decoration-emerald-500',
        'transition-colors duration-300',
        className
      )}
      {...props}
    />
  );
}
