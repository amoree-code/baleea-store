import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Read-only, public dataset. No Sanity CDN: Next already caches every read, and right after a webhook
// the CDN can still hold the old document — which would be cached again until the next publish.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
