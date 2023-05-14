import Social from '@/components/social';
import { StyleLink } from '@/components/common';

export default function Home() {
  return (
    <div className="container">
      <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100 md:text-5xl">
        Hi, I&apos;m Byurhan <span>👋</span>
      </h1>

      <div className="mb-9 space-y-6 sm:text-xl sm:leading-8">
        <p>
          A software engineer and IT enthusiast from Bulgaria, with a passion
          for front-end development. I love creating visually appealing and
          intuitive user interfaces.
        </p>
        <p>
          I&apos;m currently working at{' '}
          <StyleLink blank href="https://recheck.io">
            ReCheck
          </StyleLink>{' '}
          where our team is building blockchain-based products with real-world
          use cases.
        </p>
        <p>
          I try to keep up with the latest trends and technologies in the field.
        </p>
      </div>

      <Social />
    </div>
  );
}
