import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://nid-blog.vercel.app/",
	integrations: [tailwind(), sitemap(), prefetch()],
	output: "server",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
