import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import FadeUp from '../components/FadeUp' // adjust path to your FadeUp file

export default async function BlogPage() {
  const payload = await getPayload({ config })
  
  // Fetch published blog posts sorted by newest date
  const postsData = await payload.find({
    collection: 'blog',
    sort: '-publishDate',
  })

  return (
    <div className="min-h-screen pt-32 pb-20 px-8 md:px-16 max-w-6xl mx-auto">
      <FadeUp>
        <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
          Articles
        </p>
        <h1
          className="font-serif mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: 400 }}
        >
          Writing & Reflections
        </h1>
        <p className="mb-12 max-w-md text-sm" style={{ color: "var(--muted)" }}>
          Thoughts on system architecture, cloud deployment configurations, automation, and tech developments.
        </p>
      </FadeUp>

      {/* Grid Layout matching your Projects configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsData.docs.map((post, i) => {
          const formattedDate = post.publishDate 
            ? new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '';

          // 1. DYNAMIC CATEGORY: Fallback to the first tag entered in your array, otherwise 'Tech'
          const computedCategory = post.tags && post.tags.length > 0 && post.tags[0].tag
            ? post.tags[0].tag
            : 'Tech';

          // 2. DYNAMIC EXCERPT: Grab the text content out of the first paragraph entry block
          let computedExcerpt = '';
          if (Array.isArray(post.content) && post.content.length > 0) {
            const firstBlock = post.content[0];
            const rawText = firstBlock.paragraph || '';
            // Trim down cleanly to 120 chars for grid layout card sizing
            computedExcerpt = rawText.length > 120 
              ? `${rawText.substring(0, 120).trim()}...` 
              : rawText;
          }

          return (
            <FadeUp key={post.id} delay={i * 100}>
              <Link 
                href={`/blog/${post.slug}`} 
                className="group flex flex-col h-full rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  color: "var(--text)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                        style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>
                    {computedCategory}
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                    {formattedDate}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-medium mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h3>

                {/* Brief Summary / Excerpt */}
                {computedExcerpt && (
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                    {computedExcerpt}
                  </p>
                )}

                {/* Arrow Footer pushed to bottom */}
                <div className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors" 
                     style={{ color: "var(--text)" }}>
                  Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </FadeUp>
          );
        })}
      </div>
      
      {postsData.docs.length === 0 && (
        <p className="text-center font-mono text-xs py-12" style={{ color: "var(--muted)" }}>
          No articles published yet. Stay tuned!
        </p>
      )}
    </div>
  )
}