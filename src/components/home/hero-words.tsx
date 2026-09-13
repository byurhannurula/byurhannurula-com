import Image from "next/image";
import Link from "next/link";

/**
 * The three linked or decorated words in the homepage hero.
 *
 * Server components: every effect is a CSS hover or focus state (see "Home
 * hero" in globals.css), so none of this ships JavaScript.
 */

export function ElectronicsWord() {
  return (
    // Not a link: there is no page about electronics yet. The trace is a
    // pointer detail only, which is why nothing here takes focus.
    <span className="hero-word hero-electronics">
      <ChipGlyph />
      electronics
      <span aria-hidden="true" className="hero-trace">
        <svg preserveAspectRatio="none" viewBox="0 0 100 8">
          <path d="M0 1H70L76 6H100" pathLength={1} />
        </svg>
        <span className="hero-trace-pad" />
      </span>
    </span>
  );
}

export function SelfHostingLink() {
  return (
    // TODO(byurhan): point at /homelab once that page exists.
    <Link className="hero-word hero-selfhost" href="/uses#homelab-hardware">
      <RackGlyph />
      self-hosting
      <span aria-hidden="true" className="hero-services">
        <span className="hero-services-dot" />
        running at home
        {HOME_SERVICES.map((service) => (
          <Image
            alt=""
            height={18}
            key={service.name}
            src={service.icon}
            width={18}
          />
        ))}
      </span>
    </Link>
  );
}

export function ReCheckLink() {
  return (
    <a
      className="group hero-recheck whitespace-nowrap no-underline"
      href="https://recheck.io/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt=""
        className="hero-recheck-mark"
        height={26}
        src="/assets/icons/recheck.png"
        width={26}
      />
      {/* The underline belongs to the word, not the mark, so link-inline sits
          on the text and the whole link drives it. */}
      <span className="link-inline group-hover:[background-size:100%_1px,100%_1px] group-focus-visible:[background-size:100%_1px,100%_1px]">
        ReCheck
      </span>
    </a>
  );
}

function ChipGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="hero-glyph"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <rect height="14" rx="2.5" width="14" x="5" y="5" />
      <path d="M9 2.5V5M12 2.5V5M15 2.5V5M9 19v2.5M12 19v2.5M15 19v2.5M2.5 9H5M2.5 12H5M2.5 15H5M19 9h2.5M19 12h2.5M19 15h2.5" />
      <rect height="6" rx="1" strokeWidth="1.2" width="6" x="9" y="9" />
      <circle className="hero-led" cx="12" cy="12" r="1.6" stroke="none" />
    </svg>
  );
}

function RackGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="hero-glyph"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <rect height="5" rx="1" width="16" x="4" y="3" />
      <rect height="5" rx="1" width="16" x="4" y="9.5" />
      <rect height="5" rx="1" width="16" x="4" y="16" />
    </svg>
  );
}

// Only services that are in the self-hosted list in config/uses.ts; the card
// says "running at home", so it must stay true.
const HOME_SERVICES = [
  { name: "Immich", icon: "/assets/icons/immich.svg" },
  { name: "Home Assistant", icon: "/assets/icons/home-assistant.svg" },
  { name: "Navidrome", icon: "/assets/icons/navidrome.svg" },
  { name: "AdGuard Home", icon: "/assets/icons/adguard-home.svg" },
] as const;
