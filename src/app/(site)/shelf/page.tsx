import { PageHero } from '@/components/shared/page-hero';
import { SampleTag } from '@/components/shared/sample-tag';
import { ShelfArt } from '@/components/shelf/shelf-art';
import { ShelfDialog } from '@/components/shelf/shelf-dialog';
import { ShelfGrid } from '@/components/shelf/shelf-grid';
import { ShelfNow } from '@/components/shelf/shelf-now';
import { SHELF, SHELF_COPY } from '@/content/shelf';
import { PAGES } from '@/config/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(PAGES.shelf);

export default function ShelfPage() {
  return (
    <>
      <PageHero
        title={SHELF_COPY.title}
        titleEnd={SHELF_COPY.titleEnd}
        lead={SHELF_COPY.lead}
        eyebrow={<SampleTag>{SHELF_COPY.sample}</SampleTag>}
        art={<ShelfArt />}
      />
      <ShelfNow />
      <ShelfGrid />
      <ShelfDialog items={SHELF} />
    </>
  );
}
