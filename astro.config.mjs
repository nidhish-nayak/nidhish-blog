import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://nid-blog.vercel.app/",
	integrations: [tailwind(), sitemap(), prefetch()],
});
