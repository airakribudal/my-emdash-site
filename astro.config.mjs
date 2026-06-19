import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	// We use 'server' mode so the Admin dashboard can process logins
	output: "server",
	// FIX: We tell the adapter NOT to inject a KV binding automatically.
	adapter: cloudflare({
		sessionKVBindingName: "UNUSED_KV", 
	}),

	// Image optimization settings
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		// React is required for both the VIIO theme and the EmDash UI
		react(), 
		
		// EmDash CMS Configuration
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