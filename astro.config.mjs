import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	// FIX: We tell the adapter NOT to inject a KV binding automatically.
	adapter: cloudflare({
		sessionKVBindingName: false, 
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			// FIX: Change session to "d1". 
			// This tells EmDash to store session data in your D1 database table 
			// instead of looking for a KV namespace.
			database: d1({ 
				binding: "DB", 
				session: "d1" 
			}),
			storage: r2({ 
				binding: "MEDIA" 
			}),
			plugins: [formsPlugin()],
			sandboxed: [webhookNotifierPlugin()],
			// NOTE: sandbox() uses Dynamic Workers. If deployment fails here, 
			// you may need to upgrade to the $5/mo plan or comment this out.
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
	devToolbar: { enabled: false },
});
