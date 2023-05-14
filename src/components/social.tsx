import { ReactNode } from 'react';

import { cn } from '@/utils';
import { email, SOCIALS } from '@/constants';
import { BaseLink, Icon } from './common';

function SocialButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <BaseLink
      blank
      href={href}
      className={cn(
        'flex items-center rounded-full bg-zinc-100 p-3.5 text-zinc-600 transition-colors hover:bg-emerald-200 hover:text-emerald-900 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-emerald-900 dark:hover:text-emerald-200'
      )}
    >
      {children}
    </BaseLink>
  );
}

export default function Social() {
  return (
    <div className="flex items-center space-x-3">
      {SOCIALS.map((social) => (
        <SocialButton href={social.link} key={social.name}>
          <Icon icon={social.name} width="22px" height="22px" className="" />
        </SocialButton>
      ))}
      <SocialButton href={`mailto:${email}`}>
        <span className="mx-2 font-medium leading-[1.375]">Email me</span>
      </SocialButton>
    </div>
  );
}
