'use client'

import Link from 'next/link'
import FadeUp from './FadeUp'

export default function BlogPostClient({ post, formattedDate, computedCategory, readingTime }) {
  const renderBlockContent = (block, blockIndex) => {
    if (!block) return null

    switch (block.blockType) {
      // 1. Structural Paragraph Block Mapping
      case 'paragraphBlock':
        return (
          <p
            key={blockIndex}
            className="text-lg leading-relaxed mb-6 text-left"
            // Use var(--text) with a subtle fallback or let dark: variants handle it
            style={{ color: 'var(--text)' }}
          >
            {block.text}
          </p>
        )

      // 2. Structural Heading Block Mapping
      case 'headingBlock':
        const HeadingTag = block.level || 'h2'
        return (
          <HeadingTag
            key={blockIndex}
            className={`font-semibold mt-8 mb-4 font-serif transition-colors ${
              HeadingTag === 'h2' ? 'text-2xl' : 'text-xl'
            }`}
            style={{ color: 'var(--text)' }} // Adapts gracefully across context changes
          >
            {block.text}
          </HeadingTag>
        )

      // 3. Structural List Items Block Mapping
      case 'listBlock':
        if (!block.items || block.items.length === 0) return null
        return (
          <ul
            key={blockIndex}
            className="list-disc pl-6 mb-6 space-y-2 leading-relaxed text-lg"
            style={{ color: 'var(--text)' }}
          >
            {block.items.map((listItem, itemIndex) => {
              const textContent = listItem.item || ''

              if (textContent.includes(':')) {
                const [title, description] = textContent.split(/:(.*)/s)
                return (
                  <li key={itemIndex}>
                    {/* Bolds the item prefix using a theme-safe adaptive text variable */}
                    <strong style={{ color: 'var(--text)', filter: 'brightness(1.2)' }}>
                      {title}:
                    </strong>
                    {description}
                  </li>
                )
              }
              return <li key={itemIndex}>{textContent}</li>
            })}
          </ul>
        )

      default:
        console.warn(`Unrecognized block type rendered: ${block.blockType}`)
        return null
    }
  }

  return (
    /* FIX: Added pt-28 padding-top to push the entire layout down out from underneath your navigation header */
    <article className="max-w-2xl mx-auto px-5 pt-28 pb-8" style={{ color: 'var(--text)' }}>
      {/* FIX: Wrapped in a block container with z-index and explicit fallback color (#6b7280) */}
      <div style={{ position: 'relative', zIndex: 50, marginBottom: '1rem' }}>
        <Link
          href="/blog"
          className="hover:underline text-sm font-mono inline-block"
          style={{ color: 'var(--muted, #6b7280)' }}
        >
          ← Back to Articles
        </Link>
      </div>

      <FadeUp delay={50}>
        <div
          className="flex items-center gap-3 font-mono text-xs mb-4 mt-6"
          style={{ color: 'var(--muted)' }}
        >
          <span style={{ color: 'var(--accent)' }}>●</span>
          <span>{computedCategory}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>

        <h1
          className="font-serif leading-tight mb-6"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.3rem)',
            fontWeight: 400,
            color: 'var(--text)',
          }}
        >
          {post.title}
        </h1>

        <div
          style={{ borderBottom: '1px solid var(--border)', width: '100%', marginBottom: '2.5rem' }}
        />
      </FadeUp>

      <FadeUp delay={100}>
        <div className="w-full class-blog-body">
          {post.content?.length ? (
            post.content.map((block, i) => renderBlockContent(block, i))
          ) : (
            <h3 className="text-sm italic text-center py-8" style={{ color: 'var(--muted)' }}>
              No content available
            </h3>
          )}
        </div>
      </FadeUp>
    </article>
  )
}
