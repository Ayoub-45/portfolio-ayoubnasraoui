'use client'

import { useState } from 'react'
import FadeUp from './FadeUp' // Preserves your signature layout animation entries

export default function InfrastructureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDetails: '',
  })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({
    type: 'idle',
    message: '',
  })

  const serviceOptions = [
    { label: 'VPS / Server setup', value: 'vps_setup' },
    { label: 'Docker / Kubernetes deployment', value: 'docker_k8s' },
    { label: 'CI/CD pipeline', value: 'cicd_pipeline' },
    { label: 'Cloud migration', value: 'cloud_migration' },
    { label: 'Debugging / fixing an issue', value: 'debugging' },
    { label: 'Other', value: 'other' },
  ]

  const handleCheckboxChange = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedServices.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one service target.' })
      return
    }

    setStatus({ type: 'loading', message: 'Submitting infrastructure payload...' })

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          services: selectedServices,
          projectDetails: formData.projectDetails,
        }),
      })

      if (!response.ok) throw new Error('Submission endpoint error')

      setStatus({
        type: 'success',
        message: 'Request sent successfully. I will reach out within 24 hours.',
      })
      setFormData({ name: '', email: '', projectDetails: '' })
      setSelectedServices([])
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Something went sideways. Please email ayoub@ayoub-devops.com directly.',
      })
    }
  }

  return (
    <FadeUp>
      <section
        id="contact"
        className="max-w-2xl mx-auto px-5 pt-16 font-sans"
        style={{ color: 'var(--text)' }}
      >
        <h2 className="text-xl font-bold tracking-tight mb-1">Let’s build your infrastructure</h2>
        <p className="text-sm font-mono mb-8" style={{ color: 'var(--muted)' }}>
          Tell me what you’re working on and I’ll reply within 24h.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* Name Field */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="name"
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--muted)' }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b py-2 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--muted)', color: 'var(--text)' }}
              placeholder="Your Name"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--muted)' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b py-2 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--muted)', color: 'var(--text)' }}
              placeholder="you@example.com"
            />
          </div>

          {/* Services Checkboxes */}
          <div className="flex flex-col space-y-3">
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--muted)' }}
            >
              What do you need help with?
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {serviceOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    className="sr-only" // Hidden for standard clean presentation overrides
                  />
                  {/* Semantic Minimal Checkbox UI */}
                  <span
                    className="w-4 h-4 flex-shrink-0 border flex items-center justify-center font-mono text-[10px] transition-all mt-0.5"
                    style={{
                      borderColor: selectedServices.includes(option.value)
                        ? 'var(--accent)'
                        : 'var(--muted)',
                      color: 'var(--accent)',
                      backgroundColor: selectedServices.includes(option.value)
                        ? 'rgba(var(--accent-rgb), 0.1)'
                        : 'transparent',
                    }}
                  >
                    {selectedServices.includes(option.value) && '✓'}
                  </span>
                  <span className="group-hover:opacity-80 transition-opacity">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Project Details */}
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="projectDetails"
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--muted)' }}
            >
              Project details (optional)
            </label>
            <textarea
              id="projectDetails"
              rows={4}
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="w-full bg-transparent border py-2 px-3 focus:outline-none transition-colors leading-relaxed"
              style={{ borderColor: 'var(--muted)', color: 'var(--text)' }}
              placeholder="Describe your current system bottleneck, scale parameters, or deadline goals..."
            />
          </div>

          {/* Feedback Blocks */}
          {status.message && (
            <p
              className="font-mono text-xs"
              style={{
                color:
                  status.type === 'error'
                    ? '#ef4444'
                    : status.type === 'success'
                      ? 'var(--accent)'
                      : 'var(--muted)',
              }}
            >
              {status.message}
            </p>
          )}

          {/* Submit Trigger Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="font-mono text-xs uppercase tracking-widest border px-6 py-3 transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'transparent',
              }}
            >
              {status.type === 'loading' ? 'Sending...' : 'Send Request →'}
            </button>
          </div>
        </form>
      </section>
      <br />
    </FadeUp>
  )
}
