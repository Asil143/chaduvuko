import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Frontmatter {
  title: string
  description: string
  section: string
  order: number
  readTime: string
  tags: string[]
  updatedAt: string
}

export function getContentBySlug(folder: string, slug: string) {
  const filePath = path.join(process.cwd(), 'content', folder, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return { frontmatter: data as Frontmatter, content }
}

export function getAllContent(folder: string) {
  const dir = path.join(process.cwd(), 'content', folder)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const slug = file.replace('.mdx', '')
    const { frontmatter } = getContentBySlug(folder, slug)
    return { slug, frontmatter }
  }).sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}
