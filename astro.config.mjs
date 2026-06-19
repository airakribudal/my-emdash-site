import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite"; // <-- 1. Import the new v4 compiler plugin
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		sessionKVBindingName: "UNUSED_KV", 
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	// 2. We hook Tailwind into Vite's plugin ecosystem instead of integrations
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		emdash({
			database: d1({ 
				binding: "DB", 
				session: "d1" 
			}),
			storage: r2({ 
				binding: "MEDIA" 
			}),
			plugins: [formsPlugin()],
			sandboxed: [webhookNotifierPlugin()],
			sandboxRunner: sandbox(),
			marketplace: "https://marketplace.emdashcms.com",
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-sans",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: true },
});