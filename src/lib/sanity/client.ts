import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-13",
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});
