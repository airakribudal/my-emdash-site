import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	// We use 'server' mode so the Admin dashboard can process logins
	output: "server",
	
	// Cloudflare adapter configuration
	adapter: cloudflare({
		sessionKVBindingName: false, 
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
			marketplace: "https://marketplace.emdashcms.com",
		}),
	],

	// Disabling the toolbar to prevent UI conflicts with the theme
	devToolbar: { enabled: false },
});
