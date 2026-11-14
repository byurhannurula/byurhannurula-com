import { AboutHero } from '@/components/about/about-hero';
import { AfterHoursSection } from '@/components/about/after-hours-section';
import { BioSection } from '@/components/about/bio-section';
import { BookShelf } from '@/components/about/book-shelf';
import { CapabilitiesSection } from '@/components/about/capabilities-section';
import { CareerSection } from '@/components/about/career-section';
import { EarlierSection } from '@/components/about/earlier-section';
import { FaqSection } from '@/components/about/faq-section';
import { NowSection } from '@/components/about/now-section';
import { StackSection } from '@/components/about/stack-section';
import { TopicsSection } from '@/components/about/topics-section';
import { WaysSection } from '@/components/about/ways-section';
import { ABOUT_META } from '@/content/about';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ path: '/about', ...ABOUT_META });

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BioSection />
      <NowSection />
      <CareerSection />
      <EarlierSection />
      <CapabilitiesSection />
      <WaysSection />
      <StackSection />
      <BookShelf />
      <AfterHoursSection />
      <TopicsSection />
      <FaqSection />
    </>
  );
}
