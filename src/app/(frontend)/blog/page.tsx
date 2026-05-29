import { getPayload } from 'payload'
import config from '@/payload.config'
import MainBlogPostsClient from '../components/MainBlogPostsClient' // adjust path to your MainBlogPostsClient file
export default async function BlogPage() {
  const payload = await getPayload({ config })

  // Fetch published blog posts sorted by newest date
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
  const posts = postsData.docs.map((post) => {
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

    // Average reading speed: 200 words per minute
    const readingTime = Math.ceil(totalWords / 200) || 1

    return {
      ...post,
      readingTime: `${readingTime} min read`, // Attaches time text directly to the object
    }
  })

  return <MainBlogPostsClient posts={posts} />
}
