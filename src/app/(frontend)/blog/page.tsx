export const dynamic = 'force-dynamic'
export const revalidate = 3600
import { getPayloadClient } from '@/lib/payload'
import MainBlogPostsClient from '../components/MainBlogPostsClient.jsx'

function calculateReadingTime(content: any): string {
  let totalWords = 0

  if (Array.isArray(content)) {
    content.forEach((block: any) => {
      if (
        block.blockType === 'paragraphBlock' ||
        block.blockType === 'headingBlock'
      ) {
        totalWords += block.text
          ? block.text.split(/\s+/).filter(Boolean).length
          : 0
      } else if (block.blockType === 'listBlock' && Array.isArray(block.items)) {
        block.items.forEach((itemObj: any) => {
          totalWords += itemObj.item
            ? itemObj.item.split(/\s+/).filter(Boolean).length
            : 0
        })
      }
    })
  }

  return `${Math.ceil(totalWords / 200) || 1} min read`
}

export default async function BlogPage() {
  const payload = await getPayloadClient()

  const postsData = await payload.find({
    collection: 'blog',
    sort: '-publishDate',
    select: {
      title: true,
      slug: true,
      publishDate: true,
      excerpt: true,
      tags: true,
      content: true,
    },
  })

  const posts = postsData.docs.map((post:any) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }))

  return <MainBlogPostsClient posts={posts} />
}