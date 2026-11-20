import Image from 'next/image';

import avatar from './avatar.jpeg';
import type { SocialCard } from './footer-content';
import { GithubCard } from './github-card';
import type { Contributions } from './social-data';

const name = 'text-sm text-ink';
const muted = 'text-[0.78125rem] text-soft';

function Avatar({ size, className }: { size: number; className: string }) {
  return (
    <Image
      src={avatar}
      alt=""
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}

/** The avatar that sits half on the banner of a profile card. */
function BannerAvatar() {
  return (
    <div className="absolute left-3 -translate-y-1/2 rounded-full bg-card p-0.5">
      <Avatar size={56} className="size-14" />
    </div>
  );
}

interface CtaProps {
  href: string;
  className: string;
  children: string;
}

/**
 * A card's call to action. A real link, so a click goes somewhere, but not a
 * tab stop: the card is aria-hidden and repeats the icon link under it.
 */
function Cta({ href, className, children }: CtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      className={`h-fit rounded-full px-3 py-1 text-[0.78125rem] font-medium whitespace-nowrap no-underline ${className}`}
    >
      {children}
    </a>
  );
}

interface SocialCardBodyProps {
  card: SocialCard;
  /** Where the card's button goes: the same place as its icon. */
  href: string;
  /** Only the GitHub card reads it. Null draws the short fallback. */
  contributions?: Contributions | null;
}

/**
 * The content of one social hover card. Each body sets its own width; the
 * travelling card measures it.
 */
export function SocialCardBody({
  card,
  href,
  contributions,
}: SocialCardBodyProps) {
  if (card.kind === 'small') {
    return (
      <div className="px-[0.85rem] py-[0.7rem] text-[0.8125rem] leading-[1.4] whitespace-nowrap text-soft">
        <span className={`block font-medium ${name}`}>{card.title}</span>
        {card.line}
      </div>
    );
  }

  if (card.kind === 'linkedin') {
    return (
      // Wider than the X card, so the job title stays on one line.
      <div className="w-[min(20rem,calc(100vw-2rem))]">
        {/* LinkedIn's own blue, in every light mode. */}
        <div className="h-16 bg-linear-to-r from-[#0a66c2] to-[#0a66c2]/50" />
        <BannerAvatar />
        <div className="flex flex-col gap-1 p-3 pt-9">
          <span className={name}>{card.name}</span>
          <div className="mt-1 flex items-end justify-between gap-3">
            <span className={`leading-snug ${muted}`}>
              {card.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <Cta href={href} className="bg-[#0a66c2] text-white">
              {card.cta}
            </Cta>
          </div>
        </div>
      </div>
    );
  }

  if (card.kind === 'x') {
    return (
      <div className="w-72">
        <div className="h-20 bg-linear-to-b from-ink/85 to-ink/60" />
        <BannerAvatar />
        <div className="flex flex-col p-3">
          <div className="flex items-start justify-between gap-3">
            <span className={`mt-7 ${name}`}>{card.handle}</span>
            <Cta href={href} className="bg-ink text-bg">
              {card.cta}
            </Cta>
          </div>
          <span className={`mt-1 leading-snug ${muted}`}>{card.bio}</span>
        </div>
      </div>
    );
  }

  return (
    <GithubCard
      handle={card.handle}
      line={card.line}
      fallback={card.fallback}
      initial={contributions ?? null}
    />
  );
}
