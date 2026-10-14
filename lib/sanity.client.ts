import { createClient } from "next-sanity"

export const sanityClient = createClient({
  // The client validates its config at import time. Use a harmless fallback so
  // local builds can use the in-repo project data when Sanity is not configured.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-08-03",
  useCdn: process.env.NODE_ENV === "production",
})

export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
