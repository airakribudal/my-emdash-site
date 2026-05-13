import { sequence } from "astro:middleware";
import { emdashMiddleware } from "emdash/middleware";

export const onRequest = sequence(emdashMiddleware);
