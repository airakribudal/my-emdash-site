import { defineMiddleware } from "astro:middleware";
import { emdashMiddleware } from "emdash/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // This forces emDash to check the URL first
  const response = await emdashMiddleware(context, next);
  
  // If emDash doesn't have a page for this URL, it continues to the rest of your site
  return response;
});
