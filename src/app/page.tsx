import Link from 'next/link';

import { email, name } from '@/constants';
import { Social } from '@/components/social';
import { Button } from '@/components/common';

export default function Home() {
  return (
    <>
      <div className="container space-y-32">
        <section className="flex flex-col gap-6">
          <h1 className="main-header mb-2">hey, I&apos;m {name} 👋</h1>

          <p className="text-muted-1 space-y-4 text-lg">
            I&apos;m a software engineer and IT enthusiast from Bulgaria, with a
            passion for front-end development. I love creating visually
            appealing and intuitive user interfaces. <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ipsum
            dolore odio ad veniam aliquid eius, magni dolorum quis iste beatae
            consectetur esse commodi architecto. Suscipit, quia. Dolor,
            perspiciatis aliquid.
          </p>

          <Social />
        </section>

        <section>
          <h2 className="section-header">Thoughts</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* {ABOUT_CARDS.map((card) => (
              <Link
                href="/"
                key={card.label}
                className="h-52 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-8 text-center text-zinc-100 dark:border-zinc-900 dark:bg-zinc-800"
              >
                <h3 className="mb-2 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {card.label}
                </h3>
                <p className="text-md text-zinc-500 dark:text-zinc-400">
                  {card.description}
                </p>
              </Link>
            ))} */}
          </div>
        </section>

        {/* <section>
          <h2 className="section-header">Get to know me</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-8">
            {ABOUT_CARDS.map((card) => (
              <Link
                href={card.href}
                key={card.label}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-8 text-center text-zinc-100 dark:border-zinc-900 dark:bg-zinc-800"
              >
                <h3 className="mb-2 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {card.label}
                </h3>
                <p className="text-md text-zinc-500 dark:text-zinc-400">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section> */}

        <section className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="mb-6 text-center md:mb-0 md:text-left">
            <h2 className="section-header">Let&apos;s work together</h2>
            <p className="text-muted-1 text-lg">
              Want to discuss an opportunity to create something great? <br />
              I&apos;m ready when you are.
            </p>
          </div>

          <Button asChild>
            <Link href={`mailto:${email}`}>Get in touch</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
