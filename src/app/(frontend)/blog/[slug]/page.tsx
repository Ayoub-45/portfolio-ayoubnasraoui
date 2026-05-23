import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FadeUp from '../../components/FadeUp'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Simple type definitions representing the Lexical rich text object returned by Payload
interface LexicalTextNode {
  text?: string
  [key: string]: unknown
}

interface LexicalParagraphNode {
  type: string
  children?: LexicalTextNode[]
  [key: string]: unknown
}

interface LexicalContent {
  root: {
    children: LexicalParagraphNode[]
  }
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Find post matching the current routing slug
  const result = await payload.find({
    collection: 'blog',
    where: {
      slug: { equals: slug }
    },
    limit: 1
  })

  const post = result.docs[0]

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishDate 
    ? new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const computedCategory = post.tags && post.tags.length > 0 && post.tags[0].tag
    ? post.tags[0].tag
    : 'Engineering';

  // Cast content into a clean Lexical structure we can safely parse
  const rawLexicalContent = post.content as unknown as LexicalContent;

  return (
    <article className="min-h-screen pt-32 pb-24 px-8 md:px-16 max-w-3xl mx-auto">
      {/* Back Button */}
      <FadeUp>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1 text-xs font-mono mb-8 transition-colors hover:text-[var(--accent)]" 
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          ← Back to articles
        </Link>
      </FadeUp>

      {/* Article Header */}
      <FadeUp delay={50}>
        <div className="flex items-center gap-3 font-mono text-xs mb-4" style={{ color: "var(--muted)" }}>
          <span style={{ color: "var(--accent)" }}>●</span>
          <span>{computedCategory}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <h1 className="font-serif leading-tight mb-8" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 400 }}>
          {post.title}
        </h1>
        
        <div style={{ borderBottom: "1px solid var(--border)", width: "100%", marginBottom: "2.5rem" }} />
      </FadeUp>

      {/* Main Content Wrapper */}
      <FadeUp delay={100}>
        <div 
          className="prose prose-stone max-w-none text-base leading-relaxed font-serif"
          style={{ color: "var(--text)" }}
        >
          {/* Safely iterate down the Lexical JSON Document Tree structure layout.
            This extracts the text value inside the child entries of every root block paragraph element.
          */}
          {rawLexicalContent?.root?.children ? (
            rawLexicalContent.root.children.map((block, blockIndex) => {
              // Only render standard text nodes / paragraphs
              if (block.type === 'paragraph' && block.children) {
                return (
                  <p key={blockIndex} className="mb-6 text-justify">
                    {block.children.map((child, childIndex) => child.text || '').join('')}
                  </p>
                );
              }
              return null;
            })
          ) : (
            <p className="text-sm italic" style={{ color: "var(--muted)" }}>
              No content text available inside this post.
            </p>
          )}
        </div>
      </FadeUp>
    </article>
  )
}