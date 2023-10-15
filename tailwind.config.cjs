/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				"dark-background": "#0A0910",
				"dark-foreground": "#FAFAFA",
				"light-background": "#FFFFFF",
				"light-foreground": "#09090b",
				"button-dark": "#18181B",
				"button-light": "#FAFAFA",
				"text-dark": "#DFD0FF",
			},
		},
	},
	// plugins: [require("@tailwindcss/typography")],
};
