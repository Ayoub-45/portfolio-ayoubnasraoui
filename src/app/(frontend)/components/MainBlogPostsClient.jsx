'use client'
import Link from 'next/link'
import FadeUp from './FadeUp'

export default function MainBlogPostsClient({ posts }) {
  return (
    <div
      className="min-h-screen pt-32 pb-20 px-8 md:px-16 max-w-6xl mx-auto"
      style={{ color: 'var(--text)' }}
    >
      <FadeUp>
        <Link
          href="/"
          className="hover:underline text-sm font-mono inline-block mb-6 transition-all"
          style={{ color: 'var(--muted)' }}
        >
          ← Back to Home
        </Link>
      </FadeUp>
      <FadeUp>
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent)' }}
        >
          Articles
        </p>

        <h1
          className="font-serif mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            fontWeight: 400,
            color: 'var(--text)',
          }}
        >
          Writing & Reflections
        </h1>

        <p className="mb-12 max-w-md text-sm" style={{ color: 'var(--muted)' }}>
          Thoughts on system architecture, cloud deployment configurations, automation, and tech
          developments.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => {
          const formattedDate = post.publishDate
            ? new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''

          const computedCategory =
            post.tags && post.tags.length > 0 && typeof post.tags[0] === 'object'
              ? post.tags[0].name
              : 'Tech'

          let computedExcerpt = post.excerpt || ''
          if (!computedExcerpt && Array.isArray(post.content)) {
            const firstParagraphBlock = post.content.find(
              (block) => block.blockType === 'paragraphBlock',
            )
            if (firstParagraphBlock?.text) {
              const rawText = firstParagraphBlock.text
              computedExcerpt =
                rawText.length > 120 ? `${rawText.substring(0, 120).trim()}...` : rawText
            }
          }

          return (
            <FadeUp key={post.id} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  color: 'var(--text)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                  >
                    {computedCategory}
                  </span>

                  <span className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
                    {formattedDate} {post.readingTime && `• ${post.readingTime}`}
                  </span>
                </div>

                {/* Modified to explicitly fetch system safe text colors on hover actions */}
                <h3
                  className="font-serif text-lg font-medium mb-3 transition-colors"
                  style={{ color: 'var(--text)' }}
                >
                  <span className="group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </span>
                </h3>

                {computedExcerpt && (
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                    {computedExcerpt}
                  </p>
                )}

                <div
                  className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: 'var(--text)' }}
                >
                  Read Article{' '}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </FadeUp>
          )
        })}
      </div>

      {posts.length === 0 && (
        <p className="text-center font-mono text-xs py-12" style={{ color: 'var(--muted)' }}>
          No articles published yet. Stay tuned!
        </p>
      )}
    </div>
  )
}
