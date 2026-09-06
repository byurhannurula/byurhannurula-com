import { Chip, HoverNote } from "@/components/inline";

const VIDEOTUTORIALS_NOTE =
  "A Bulgarian video tutorials site that taught a generation of devs the basics. It is gone now.";

/** The version that was on the page before there was a choice. */
export function ShortBio() {
  return (
    <>
      <p className="mb-3.5">
        I&apos;m <strong>Byurhan</strong>, a full-stack developer. I started
        writing code when I was 12 and have been doing it ever since.
      </p>
      <p className="mb-3.5">
        I learned from{" "}
        <HoverNote note={VIDEOTUTORIALS_NOTE}>videotutorials-bg.com</HoverNote>{" "}
        after a stranger sent me the link on Skype. The first site I built was
        about the <Chip tone="accent">albatross</Chip>. Four pages, a table for
        layout, none of it good.
      </p>
      <p className="mb-3.5">
        After that: informatics olympiads, Pascal then C then Visual Basic, an
        M.Sc. from the University of Ruse, and six years at{" "}
        <a
          className="link-inline"
          href="https://recheck.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ReCheck
        </a>
        , where I am now Team Lead. In 2026 I co-organized{" "}
        <a
          className="link-inline"
          href="https://aihack.startupfactory.bg/"
          rel="noopener noreferrer"
          target="_blank"
        >
          RUSE AI HACK &apos;26
        </a>
        , the city&apos;s first 48-hour AI hackathon.
      </p>
      <p className="mb-3.5 text-muted-foreground">
        Away from work I run a homelab, repair hardware, and publish small
        tools. I like software that is small, private, owned and repairable.
      </p>
    </>
  );
}

/**
 * The same facts at length.
 *
 * TODO(byurhan): the opening is yours, told back to you. Two things still need
 * your own words rather than mine: what exactly your parents did, and whether
 * you ever found out who the stranger on Skype was.
 */
export function LongBio() {
  return (
    <>
      <p className="mb-3.5">
        This one starts with my parents. They never asked why there was a PC in
        pieces on the table again.
      </p>

      <p className="mb-3.5">
        Hardware came before code. I took machines apart to see inside them and
        put them back together because there was only one in the house. Then
        other people&apos;s, once word got round that I would look at them for
        free. I could fix a computer years before I could tell one what to do.
      </p>

      <p className="mb-3.5">
        Around 6th grade someone I did not know messaged me on Skype.{" "}
        <em>
          Hey, I made a website for myself, can you check it and tell me what
          you think?
        </em>{" "}
        I had heard of programming but had no idea how any of it was done. He
        sent me the site he had learned from:{" "}
        <HoverNote note={VIDEOTUTORIALS_NOTE}>videotutorials-bg.com</HoverNote>.
        It is dead now. I owe it more than I owe most things.
      </p>

      <p className="mb-3.5">
        Then months of nights. Tutorial, pause, type it out, break it, watch the
        same three minutes again. The sites were a few links and some text. I
        was 12, and a thing I had typed existed.
      </p>

      <p className="mb-3.5">
        The first one worth naming was about the{" "}
        <Chip tone="accent">albatross</Chip>. Yes, the bird. Four pages, a table
        for layout, and none of it good. It is still the reason this site
        exists.
      </p>

      <p className="mb-3.5">
        School turned into informatics olympiads, which meant algorithms rather
        than websites. Pascal first, because that is what you were taught, then
        C when Pascal ran out, then Visual Basic because a teacher had a licence
        for it. I would not pick any of the three today. All three taught me
        what the computer is actually being asked to do.
      </p>

      <p className="mb-3.5">
        I read Computer Engineering at the University of Ruse, in the Department
        of Computer Systems and Technologies, and finished with an M.Sc. in
        2020. The useful part was not the syllabus. It was five years around
        people who also wanted to build things, with enough spare time to be bad
        at a lot of them in private.
      </p>

      <p className="mb-3.5">
        Freelance work ran alongside that. Small sites, small tools, a lot of
        Gatsby, and{" "}
        <a
          className="link-inline"
          href="https://github.com/byurhannurula"
          rel="noopener noreferrer"
          target="_blank"
        >
          a source plugin for GitLab
        </a>{" "}
        that I published because I needed it and it did not exist. That is still
        why I publish anything.
      </p>

      <p className="mb-3.5">
        I joined{" "}
        <a
          className="link-inline"
          href="https://recheck.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ReCheck
        </a>{" "}
        as an intern in January 2020 and never left. Software developer, then
        full-stack, then team lead in 2024. Six years is long enough to have
        shipped every layer of it: the web apps, the landing pages, the Node
        services underneath, a Capacitor hybrid app when we needed one, and the
        deployments, CI and monitoring when nobody else was going to.
      </p>

      <p className="mb-3.5">
        There was no designer for a long stretch, so I did that too. Logos,
        colours, favicons, and a Figma system the team still works from. Caring
        how something looks and caring how it works turned out to be the same
        instinct pointed at different halves of the problem, and the design half
        made me a better engineer.
      </p>

      <p className="mb-3.5">
        Leading is the same job with the leverage moved. Planning, reviews,
        onboarding interns, arguing for the process that stops the same bug
        arriving twice. I still write a lot of code. In 2026 I co-organized{" "}
        <a
          className="link-inline"
          href="https://aihack.startupfactory.bg/"
          rel="noopener noreferrer"
          target="_blank"
        >
          RUSE AI HACK &apos;26
        </a>
        , the city&apos;s first 48-hour AI hackathon, on the theory that a place
        only gets a scene if somebody books the room.
      </p>

      <p className="mb-3.5">
        Away from the screen it is hardware. A soldering iron, two 3D printers,
        and a homelab running Proxmox, Docker, a reverse proxy, VLANs and
        backups I restore from twice a year. Home Assistant and ESPHome handle
        the rest of the house. If a thing happens twice, it gets scripted.
      </p>

      <p className="mb-3.5">
        The side projects come from the same place. A notepad because every
        other one wanted an account, two browser extensions because I was tired
        of opening DevTools to check the same four things, and a dotfiles repo
        that rebuilds a machine in an afternoon.
      </p>

      <p className="mb-3.5 text-muted-foreground">
        I care about software that is small, private, owned and repairable. That
        is what I wanted out of four pages about a seabird, and I have not
        wanted anything else since.
      </p>
    </>
  );
}
