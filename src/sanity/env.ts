// Project ID and dataset are public identifiers (they ship in client code), not secrets.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "kva5n581";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-02-19";
