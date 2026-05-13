import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	
	// Cloudflare adapter configuration
	adapter: cloudflare({
		// Setting this to false prevents conflicts if you manage KV manually
		sessionKVBindingName: false, 
	}),

	image: {
		layout: "constrained",
		responsiveStyles: true,
	},

	integrations: [
		react(), // Required for the VIIO theme and EmDash admin panel
		emdash({
			// Database configuration: uses Cloudflare D1
			database: d1({ 
				binding: "DB", 
				session: "d1" // Stores admin sessions in your database
			}),
			// Storage configuration: uses Cloudflare R2 for images/files
			storage: r2({ 
				binding: "MEDIA" 
			}),
			plugins: [formsPlugin()],
			sandboxed: [webhookNotifierPlugin()],
			
			// Note: If deployment fails, you may need a paid Cloudflare plan for sandbox()
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
