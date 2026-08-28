import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache binding yet: pages are static or read Redis directly.
// Add r2IncrementalCache once ISR or "use cache" is used.
export default defineCloudflareConfig({});
