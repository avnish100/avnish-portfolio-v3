import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { BlogPreviewClient } from "./blog-preview-client"

export function BlogPreview() {
  const posts = getAllPosts()

  return <BlogPreviewClient posts={posts} />
}
