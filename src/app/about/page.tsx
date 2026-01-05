import {
  AnimatedExternalLink,
  BaseLink,
  Icon,
  StyleLink,
} from '@/components/common';
import { email, fullName, SOCIALS, username, WORK } from '@/constants';

const slashMotion = {
  rest: { opacity: 0, ease: 'easeOut', duration: 0.2, type: 'tween' },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

export default function About() {
  return (
    <>
      <div className="container space-y-32">
        <section className="page-header">
          <h1 className="main-header">About me</h1>
          <p className="text-foreground">Just a quick glimpse.</p>
        </section>

        <section className="space-y-14">
          <div className="flex flex-col gap-2 md:flex-row md:gap-9">
            <h2 className="w-full shrink-0 font-medium md:w-32">Who I am</h2>

            <div className="space-y-4">
              <p>Hello world, I&apos;m {fullName}.</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Reprehenderit ullam nihil quo. Qui maxime mollitia, deleniti
                placeat nam, magnam cupiditate cumque labore quisquam id neque,
                illo amet quo adipisci. Possimus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Mollitia corrupti nesciunt quod rerum sunt accusamus ut quas
                laudantium illo. Accusantium impedit ad sunt saepe veniam
                eveniet sed nemo est magni?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:gap-9">
            <h2 className="w-full shrink-0 font-medium md:w-32">Connect</h2>

            <div className="space-y-8">
              <div className="space-y-3">
                <p>
                  Have a question or just want to chat? Feel free to{' '}
                  <StyleLink blank href={`mailto:${email}`}>
                    email me
                  </StyleLink>
                  . Try finding me anywhere else at <b>@{username}</b>
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {SOCIALS.map(({ name, label, href }) => (
                  <AnimatedExternalLink
                    key={name}
                    name={name}
                    label={label}
                    href={href}
                  />
                ))}
              </ul>
            </div>
          </div>

          {WORK && WORK.length ? (
            <div className="flex flex-col gap-2 md:flex-row md:gap-9">
              <h2 className="w-full shrink-0 font-medium md:w-32">
                Experience
              </h2>

              <div className="flex w-full flex-col space-y-8">
                <p>
                  I have a <b>3+</b> years of professional experience.
                </p>

                <ul className="grid grid-cols-1 gap-6">
                  {WORK.map(({ companyName, jobTitle, date, href }) => (
                    <li
                      key={jobTitle}
                      className="flex w-full shrink-0 items-center justify-between rounded-md border p-3"
                    >
                      <span className="flex flex-col gap-1">
                        <p>{companyName}</p>
                        <p className="text-sm">{jobTitle}</p>
                      </span>

                      <p>{date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : undefined}
        </section>
      </div>
    </>
  );
}
