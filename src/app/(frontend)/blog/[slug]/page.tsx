import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import BlogPostClient from '../../components/BlogPostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'blog',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const post = result.docs[0]
  if (!post) notFound()

  // FIX: Calculate reading time on the detail page
  let totalWords = 0
  if (Array.isArray(post.content)) {
    post.content.forEach((block: any) => {
      if (block.blockType === 'paragraphBlock' || block.blockType === 'headingBlock') {
        totalWords += block.text ? block.text.split(/\s+/).filter(Boolean).length : 0
      } else if (block.blockType === 'listBlock' && Array.isArray(block.items)) {
        block.items.forEach((itemObj: any) => {
          totalWords += itemObj.item ? itemObj.item.split(/\s+/).filter(Boolean).length : 0
        })
      }
    })
  }
  const minutes = Math.ceil(totalWords / 200) || 1
  const readingTime = `${minutes} min read`

  const formattedDate = post.publishDate
    ? new Date(post.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const computedCategory =
    post.tags && post.tags.length > 0 && typeof post.tags[0] === 'object' && post.tags[0].name

  return (
    <BlogPostClient
      post={post}
      formattedDate={formattedDate}
      computedCategory={computedCategory}
      readingTime={readingTime} // Pass it here
    />
  )
}
