'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/utils';
import { Icon } from './icon';

export type BaseLinkProps = {
  href: string;
  blank?: boolean;
  className?: string;
  children?: ReactNode;
};

export function BaseLink({
  href,
  children,
  className,
  blank = false,
  ...props
}: BaseLinkProps) {
  const isBlank = blank
    ? {
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {};

  if (blank) {
    return (
      <a href={href} className={cn(className)} {...isBlank} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(className)} {...props}>
      {children}
    </Link>
  );
}

export function StyleLink({ className, ...props }: BaseLinkProps) {
  return (
    <BaseLink
      className={cn(
        'underline decoration-[2.5px] underline-offset-4',
        'text-zinc-700 decoration-zinc-700 dark:text-zinc-400 dark:decoration-zinc-400',
        'dark:hover:text-primary dark:hover:decoration-primary',
        'hover:text-primary hover:decoration-primary',
        'transition-colors duration-300',
        className
      )}
      {...props}
    />
  );
}

const slashMotion = {
  rest: { opacity: 0, ease: 'easeOut', duration: 0.2, y: 20 },
  exit: { opacity: 0, ease: 'easeOut', duration: 0.2, y: -20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

type AnimatedExternalLinkProps = {
  name: string;
  label: string;
  href: string;
  as?: string;
};

export function AnimatedExternalLink({
  name,
  label,
  href,
  as = 'li',
}: AnimatedExternalLinkProps) {
  const Component = motion(as);

  return (
    <Component initial="rest" whileHover="hover" animate="rest">
      <BaseLink
        blank
        href={href}
        className="flex items-center justify-between rounded-md border border-zinc-400 px-4 py-3 hover:cursor-pointer hover:dark:border-white hover:dark:text-white"
      >
        <span className="flex items-center gap-x-3">{label}</span>

        <motion.span variants={slashMotion}>
          <Icon icon="ArrowUpRight" className="size-4" />
        </motion.span>
      </BaseLink>
    </Component>
  );
}
