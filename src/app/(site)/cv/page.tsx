import { CvSheet } from '@/components/cv/cv-sheet';
import { PrintButton } from '@/components/cv/print-button';
import { CV_COPY } from '@/content/cv';
import { PAGES } from '@/config/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(PAGES.cv);

export default function CvPage() {
  return (
    <div className="cv-page pt-(--hero-gap) pb-(--section-gap)">
      <div className="cv-toolbar mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-soft">{CV_COPY.printHint}</p>
        <PrintButton label={CV_COPY.print} />
      </div>
      <CvSheet />
    </div>
  );
}
