'use client'

import { useState } from 'react'
import posthog from 'posthog-js'

export default function TestimonialForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({ name: '', role: '', company: '', content: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'pending' }),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      posthog.capture('testimonial_submitted', {
        has_role: !!formData.role,
        has_company: !!formData.company,
      })
      setFormData({ name: '', role: '', company: '', content: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      setStatus('error')
      posthog.capture('testimonial_submission_failed')
      posthog.captureException(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
      <div>
        <label
          className="block mb-1.5 font-semibold uppercase tracking-wider text-[10px]"
          style={{ color: 'var(--muted)' }}
        >
          Contributor Identity *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2.5 rounded border focus:outline-none focus:ring-1 transition-all"
          style={{ background: 'rgba(0,0,0,0.01)', borderColor: 'var(--border)' }}
          placeholder="e.g., Jane Doe"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block mb-1.5 font-semibold uppercase tracking-wider text-[10px]"
            style={{ color: 'var(--muted)' }}
          >
            Professional Title
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2.5 rounded border focus:outline-none focus:ring-1 transition-all"
            style={{ background: 'rgba(0,0,0,0.01)', borderColor: 'var(--border)' }}
            placeholder="Lead Infrastructure"
          />
        </div>
        <div>
          <label
            className="block mb-1.5 font-semibold uppercase tracking-wider text-[10px]"
            style={{ color: 'var(--muted)' }}
          >
            Organization
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2.5 rounded border focus:outline-none focus:ring-1 transition-all"
            style={{ background: 'rgba(0,0,0,0.01)', borderColor: 'var(--border)' }}
            placeholder="Vercel"
          />
        </div>
      </div>

      <div>
        <label
          className="block mb-1.5 font-semibold uppercase tracking-wider text-[10px]"
          style={{ color: 'var(--muted)' }}
        >
          Evaluation Content *
        </label>
        <textarea
          required
          rows={5}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2.5 rounded border focus:outline-none focus:ring-1 transition-all resize-none leading-relaxed"
          style={{ background: 'rgba(0,0,0,0.01)', borderColor: 'var(--border)' }}
          placeholder="Provide data on infrastructure performance, delivery speed, and operational standards..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-lg transition-all font-semibold uppercase tracking-widest text-[10px] border cursor-pointer hover:opacity-90 disabled:opacity-50 text-white"
        style={{
          background: 'var(--accent)',
          borderColor: 'var(--accent)',
        }}
      >
        {status === 'loading' ? 'Executing Request...' : 'Broadcast Review'}
      </button>

      {status === 'success' && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-[11px] leading-normal">
          🚀 <strong>Success:</strong> Testimonal is written, waiting for approval from admin.
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded text-[11px] leading-normal">
          💥 <strong>Error:</strong> Failed to write Testimonial. Check internet connection.
        </div>
      )}
    </form>
  )
}
