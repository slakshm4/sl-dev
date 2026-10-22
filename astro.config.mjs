// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.shradhalakshman.com',
  // pages are fetched in the background as soon as you hover (or start to tap) a link, so moving around the site feels instant
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
