import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier";
import { defineConfig } from "astro/config"; // Removed fontProviders for now
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		sessionKVBindingName: false, 
	}),
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
    // REMOVED: experimental block
    // REMOVED: fonts block (to test if this is the issue)
	devToolbar: { enabled: false },
});
