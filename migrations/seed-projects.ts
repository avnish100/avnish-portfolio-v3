import { createReadStream, existsSync } from "node:fs"
import path from "node:path"
import { getCliClient } from "sanity/cli"
import { projects, type ContentBlock, type Project } from "../lib/projects"

const client = getCliClient({ apiVersion: "2026-10-14" })
const uploadedAssets = new Map<string, string>()

function portableBlock(
  key: string,
  text: string,
  style = "normal",
  listItem?: "bullet" | "number",
) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, marks: [], text }],
    ...(listItem ? { listItem, level: 1 } : {}),
  }
}

function toPortableText(blocks: ContentBlock[], prefix = "body"): unknown[] {
  return blocks.flatMap((block, index) => {
    const key = `${prefix}-${index}`

    switch (block.type) {
      case "text":
        return [portableBlock(key, block.content)]
      case "heading":
        return [portableBlock(key, block.content, `h${block.level ?? 2}`)]
      case "list":
        return block.items.map((item, itemIndex) =>
          portableBlock(`${key}-${itemIndex}`, item, "normal", block.ordered ? "number" : "bullet"),
        )
      case "callout":
        return [{ _type: "caseCallout", _key: key, title: block.title, content: block.content, variant: block.variant ?? "info" }]
      case "link-card":
        return [{ _type: "caseLink", _key: key, title: block.title, description: block.description, href: block.href }]
      case "quote":
        return [portableBlock(key, [block.content, block.author, block.role].filter(Boolean).join(" — "), "blockquote")]
      case "code":
        return [portableBlock(key, block.content)]
      case "columns":
        return block.columns.flatMap((column, columnIndex) => toPortableText(column, `${key}-${columnIndex}`))
      case "divider":
      case "spacer":
        return []
      case "image":
      case "gallery":
      case "video":
      case "stats":
        // Project-level media is uploaded below. These block types are not used
        // by the current case studies and can be added in Studio when needed.
        return []
    }
  })
}

async function uploadLocalAsset(src: string, type: "image" | "file") {
  if (!src.startsWith("/")) return undefined
  if (uploadedAssets.has(src)) return uploadedAssets.get(src)

  const filePath = path.join(process.cwd(), "public", src.slice(1))
  if (!existsSync(filePath)) {
    console.warn(`Skipping missing asset: ${src}`)
    return undefined
  }

  const asset = await client.assets.upload(type, createReadStream(filePath), {
    filename: path.basename(filePath),
  })
  uploadedAssets.set(src, asset._id)
  return asset._id
}

async function imageValue(src: string, alt: string) {
  const assetId = await uploadLocalAsset(src, "image")
  if (!assetId) return undefined

  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  }
}

async function mediaValues(project: Project) {
  const media = await Promise.all(
    (project.showcase ?? []).map(async (item, index) => {
      const assetId = await uploadLocalAsset(item.src, item.type === "image" ? "image" : "file")
      if (!assetId) return undefined

      return {
        _type: "projectMedia",
        _key: `media-${index}`,
        kind: item.type,
        caption: item.caption,
        [item.type]: {
          _type: item.type === "image" ? "image" : "file",
          asset: { _type: "reference", _ref: assetId },
          ...(item.type === "image" ? { alt: item.caption ?? `${project.title} project image` } : {}),
        },
      }
    }),
  )

  return media.filter(Boolean)
}

async function projectDocument(project: Project, order: number) {
  const cover = project.heroImage
    ? await imageValue(project.heroImage, `${project.title} cover`)
    : undefined

  return {
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    featured: true,
    order,
    year: Number(project.year),
    category: project.category,
    subtitle: project.subtitle,
    summary: project.description,
    accent: project.color,
    cover,
    media: await mediaValues(project),
    client: project.client,
    role: project.role,
    duration: project.duration,
    technologies: project.tags,
    externalLinks: project.links?.map((link, index) => ({
      _key: `link-${index}`,
      label: link.label,
      url: link.href,
    })),
    body: toPortableText(project.content),
  }
}

async function main() {
  console.log(`Preparing ${projects.length} project documents…`)

  const documents = []
  for (const [index, project] of projects.entries()) {
    documents.push(await projectDocument(project, index))
    console.log(`Prepared ${project.title}`)
  }

  let transaction = client.transaction()
  for (const document of documents) transaction = transaction.createOrReplace(document)
  await transaction.commit()

  console.log(`Seeded ${documents.length} projects into Sanity.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
