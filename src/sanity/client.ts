import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Read-only, public dataset, CDN. Freshness comes from Next's cache tags + the webhook, not from Sanity.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });
