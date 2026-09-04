import { GithubGraph } from "@/components/github-graph";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import {
  type SocialCardItem,
  SocialHoverCards,
} from "@/components/social-hover-cards";
import { SITE_CONFIG } from "@/config/site";
import { getContributions } from "@/lib/server/github-contributions";

/** Each network's own profile picture would need three logins; GitHub's is public. */
const AVATAR = `https://github.com/${SITE_CONFIG.author.github}.png?size=120`;

/**
 * Profile pictures, deliberately not through next/image.
 *
 * Same reason as the link embeds: routing an arbitrary avatar host through
 * /_next/image reopens the proxy remotePatterns exists to close. The box is
 * fixed, so there is no layout to stabilise.
 */
function Avatar({ className }: { className: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: see Avatar doc comment
    <img alt="" className={className} decoding="async" src={AVATAR} />
  );
}

/**
 * A card's call to action.
 *
 * A real link so a click goes somewhere, but tabIndex -1: the card is
 * aria-hidden and repeats the destination of the icon behind it, so putting it
 * in the tab order would be a second stop to the same place with nothing to
 * announce it.
 */
function Cta({
  children,
  className,
  href,
}: {
  children: string;
  className: string;
  href: string;
}) {
  return (
    <a
      className={`h-fit rounded-full px-3 py-1 font-medium text-[12.5px] no-underline ${className}`}
      href={href}
      rel="noopener noreferrer"
      tabIndex={-1}
      target="_blank"
    >
      {children}
    </a>
  );
}

function GithubCard({
  total,
  weeks,
}: {
  total: number;
  weeks: React.ComponentProps<typeof GithubGraph>["weeks"];
}) {
  return (
    <div className="flex w-[min(22rem,calc(100vw-4rem))] flex-col gap-3 p-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full" />
        <div className="flex flex-col">
          <span className="text-[14px] text-foreground">
            {SITE_CONFIG.author.github}
          </span>
          <span className="text-[12.5px] text-muted-foreground">
            {total.toLocaleString()} contributions in the last year
          </span>
        </div>
      </div>
      <GithubGraph weeks={weeks} />
    </div>
  );
}

function LinkedinCard() {
  return (
    <div className="w-72">
      <div className="h-16 bg-linear-to-r from-[#0a66c2] to-[#0a66c2]/50" />
      <div className="absolute left-3 translate-y-[-50%] rounded-full bg-surface-raised p-0.5">
        <Avatar className="size-14 rounded-full" />
      </div>
      <div className="flex flex-col gap-1 p-3 pt-9">
        <span className="text-[14px] text-foreground">
          {SITE_CONFIG.author.name} Nurula
        </span>
        <div className="mt-1 flex items-end justify-between gap-3">
          <span className="text-[12.5px] text-muted-foreground leading-snug">
            Team Lead / Full-Stack Engineer
            <br />
            Ruse, Bulgaria
          </span>
          <Cta
            className="bg-[#0a66c2] text-white"
            href={SITE_CONFIG.social.linkedin}
          >
            Connect
          </Cta>
        </div>
      </div>
    </div>
  );
}

function TwitterCard() {
  return (
    <div className="w-72">
      <div className="h-20 bg-linear-to-b from-foreground/85 to-foreground/60" />
      <div className="absolute left-3 translate-y-[-50%] rounded-full bg-surface-raised p-0.5">
        <Avatar className="size-14 rounded-full" />
      </div>
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-between gap-3">
          <span className="mt-7 text-[14px] text-foreground">
            {SITE_CONFIG.author.twitter}
          </span>
          <Cta
            className="bg-foreground text-background"
            href={SITE_CONFIG.social.twitter}
          >
            Follow
          </Cta>
        </div>
        <span className="mt-1 text-[12.5px] text-muted-foreground leading-snug">
          Full-stack engineer. Privacy, homelabs, and things that outlive their
          hype cycle.
        </span>
      </div>
    </div>
  );
}

/**
 * The hero social row, with a preview of each destination.
 *
 * Only GitHub has data worth fetching. LinkedIn and X expose nothing without
 * an authenticated app, so their cards are written here -- a fair trade, since
 * a headline and a bio change about once a year.
 */
export async function SocialCards({ className }: { className?: string }) {
  const contributions = await getContributions(SITE_CONFIG.author.github);

  const items: SocialCardItem[] = [
    {
      label: "GitHub",
      href: SITE_CONFIG.social.github,
      icon: <GithubIcon className="size-[18px]" />,
      content: contributions ? (
        <GithubCard total={contributions.total} weeks={contributions.weeks} />
      ) : (
        <div className="w-56 p-3 text-[13px] text-muted-foreground">
          {SITE_CONFIG.author.github} on GitHub
        </div>
      ),
    },
    {
      label: "LinkedIn",
      href: SITE_CONFIG.social.linkedin,
      icon: <LinkedinIcon className="size-[18px]" />,
      content: <LinkedinCard />,
    },
    {
      label: "X",
      href: SITE_CONFIG.social.twitter,
      icon: <TwitterIcon className="size-[18px]" />,
      content: <TwitterCard />,
    },
  ];

  return <SocialHoverCards className={className} items={items} />;
}
