import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://nid-blog.vercel.app",
  integrations: [tailwind(), sitemap(), prefetch()]
});