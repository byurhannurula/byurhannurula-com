import { ReactNode } from 'react';
import * as Icons from '@tabler/icons-react';

import { email, SOCIALS } from '@/constants';
import { BaseLink } from './common';

export function SocialButton({
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
      className="flex items-center rounded-lg bg-foreground/10 p-2 text-foreground transition-colors hover:cursor-pointer hover:bg-primary hover:text-white"
    >
      {children}
    </BaseLink>
  );
}

export function Social() {
  return (
    <div className="flex items-center space-x-3">
      {SOCIALS.filter((x) => x.showInLanding).map((social) => {
        const name = 'IconBrand' + social.name;
        const Icon = Icons[name];

        return (
          <SocialButton href={social.href} key={social.name}>
            <Icon size={24} />
          </SocialButton>
        );
      })}
      <SocialButton href={`mailto:${email}`}>
        <span className="mx-2 leading-normal">Email me</span>
      </SocialButton>
    </div>
  );
}
