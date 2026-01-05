'use client';

import { LINKS, name, SOCIALS } from '@/constants';
import { BaseLink, Button, Icon } from './common';

const linkClasses =
  'text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-100';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-zinc-100 py-12 dark:border-zinc-700/40">
      <div className="container justify-between space-y-16 py-6 md:flex-row">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 w-full space-y-4">
            <h4 className="text-lg font-semibold">Index</h4>
            <nav className="flex flex-col gap-y-3">
              {LINKS.map(({ label, href }) => (
                <BaseLink key={href} href={href} className={linkClasses}>
                  {label}
                </BaseLink>
              ))}
            </nav>
          </div>

          <div className="col-span-1 w-full space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <nav className="flex flex-col gap-y-3">
              {SOCIALS.filter((x) => x.showInFooter).map(({ label, href }) => (
                <BaseLink blank key={href} href={href} className={linkClasses}>
                  {label}
                </BaseLink>
              ))}
            </nav>
          </div>

          <div className="col-span-2 flex items-start justify-end">
            <Button
              variant="light"
              className="p-2"
              onClick={() => {
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
              }}
            >
              <Icon icon="ArrowUp" className="size-6" />
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} {name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
