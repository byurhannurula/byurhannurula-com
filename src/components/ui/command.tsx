'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { Dialog as DialogPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('flex flex-col overflow-hidden', className)}
      {...props}
    />
  );
}

/** A dialog near the top of the screen that holds a `Command`. */
function CommandDialog({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & {
  /** Read by screen readers only. */
  title: string;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root data-slot="command-dialog" {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-65 bg-black/35 backdrop-blur-[3px] motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'fixed top-[14vh] left-1/2 z-65 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-line-strong bg-card text-ink shadow-lift outline-none motion-safe:data-[state=open]:animate-pop-in',
            className,
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {title}
          </DialogPrimitive.Title>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <CommandPrimitive.Input
      data-slot="command-input"
      // The dialog already shows where focus is; a ring on the only field
      // in it adds nothing. The caret marks the field.
      className={cn(
        'min-w-0 flex-1 border-0 bg-transparent text-[1.0625rem] text-inherit outline-none placeholder:text-faint',
        className,
      )}
      {...props}
    />
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[min(24rem,52vh)] scroll-py-[0.4rem] overflow-y-auto p-[0.4rem]',
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn('p-7 text-center text-soft', className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        '[&_[cmdk-group-heading]]:px-[0.7rem] [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-[0.4rem] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:leading-none [&_[cmdk-group-heading]]:text-faint',
        className,
      )}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-[0.6rem] px-[0.7rem] py-[0.6rem] select-none data-[selected=true]:bg-sunk [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-faint data-[selected=true]:[&_svg]:text-accent',
        className,
      )}
      {...props}
    />
  );
}

/** A key cap, for shortcut hints. */
function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'rounded-[0.35rem] border border-line-strong px-[0.35rem] py-[0.2rem] font-mono text-[0.6875rem] leading-none font-normal text-faint',
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
};
