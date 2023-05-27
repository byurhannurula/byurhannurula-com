import { domain } from '@/constants';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    // sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
