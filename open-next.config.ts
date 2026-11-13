import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Pages are prerendered and nothing revalidates, so the HTML is served
// read-only from Workers Static Assets: no R2, queue or tag cache. Switch to
// the R2 incremental cache once pages use ISR or revalidateTag.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // On, the interceptor answers RSC prefetches from a cache key that ignores
  // the router-tree headers, and the client re-requests in a loop.
  enableCacheInterception: false,
});
