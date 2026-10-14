import { createClient } from "next-sanity"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-08-03",
  useCdn: process.env.NODE_ENV === "production",
})

export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
