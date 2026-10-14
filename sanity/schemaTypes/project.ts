import { defineField, defineType } from "sanity"

export const projectMedia = defineType({
  name: "projectMedia",
  title: "Media item",
  type: "object",
  fields: [
    defineField({ name: "kind", type: "string", initialValue: "image", options: { list: ["image", "video", "embed"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, hidden: ({ parent }) => parent?.kind !== "image", fields: [defineField({ name: "alt", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "video", type: "file", options: { accept: "video/*" }, hidden: ({ parent }) => parent?.kind !== "video" }),
    defineField({ name: "embedUrl", title: "Embed URL", type: "url", hidden: ({ parent }) => parent?.kind !== "embed" }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "layout", type: "string", initialValue: "full", options: { list: ["full", "wide", "half"] } }),
  ],
  preview: { select: { title: "caption", media: "image" } },
})

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true }, { name: "media", title: "Media" }, { name: "caseStudy", title: "Case study" }, { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "basics", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", group: "basics", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", type: "boolean", group: "basics", initialValue: true }),
    defineField({ name: "order", type: "number", group: "basics", validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "year", type: "number", group: "basics", validation: (Rule) => Rule.required().integer() }),
    defineField({ name: "category", type: "string", group: "basics", options: { list: ["case-study", "project", "experiment", "writing"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 3, group: "basics", validation: (Rule) => Rule.required().max(220) }),
    defineField({ name: "cover", type: "image", group: "media", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (Rule) => Rule.required() })] }),
    defineField({ name: "coverAspect", type: "string", group: "media", initialValue: "landscape", options: { list: ["landscape", "portrait", "square"] } }),
    defineField({ name: "media", type: "array", group: "media", of: [{ type: "projectMedia" }] }),
    defineField({ name: "client", type: "string", group: "caseStudy" }),
    defineField({ name: "role", type: "string", group: "caseStudy" }),
    defineField({ name: "services", type: "array", group: "caseStudy", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "technologies", type: "array", group: "caseStudy", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "duration", type: "string", group: "caseStudy" }),
    defineField({ name: "externalLinks", type: "array", group: "caseStudy", of: [{ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "url", type: "url" })] }] }),
    defineField({ name: "body", title: "Case study", type: "array", group: "caseStudy", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }, { type: "projectMedia" }] }),
    defineField({ name: "seo", type: "object", group: "seo", fields: [defineField({ name: "title", type: "string", validation: (Rule) => Rule.max(60) }), defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.max(160) }), defineField({ name: "image", type: "image" }), defineField({ name: "noIndex", type: "boolean", initialValue: false })] }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "cover" } },
})
