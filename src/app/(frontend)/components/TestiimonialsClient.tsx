'use client'

import { useState, useEffect } from 'react'
import FadeUp from './FadeUp'
import TestimonialForm from './TestimonialForm'

export default function TestimonialsClient({ initialData }: { initialData: any[] }) {
  const [viewMode, setViewMode] = useState<'ui' | 'json'>('ui')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlashing, setIsFlashing] = useState(false)

  const nextSlide = () => {
    // Trigger a quick flashy signal glow before changing records
    setIsFlashing(true)
    setCurrentIndex((prev) => (prev + 1) % initialData.length)
    setTimeout(() => setIsFlashing(false), 400) // match signal duration
  }

  const prevSlide = () => {
    setIsFlashing(true)
    setCurrentIndex((prev) => (prev - 1 + initialData.length) % initialData.length)
    setTimeout(() => setIsFlashing(false), 400)
  }

  // AUTOMATIC SLIDER LOOP: Cycles every 5 seconds natively
  useEffect(() => {
    if (initialData.length <= 1 || viewMode !== 'ui') return

    const autoCycle = setInterval(() => {
      nextSlide()
    }, 5000) // 5000ms execution window (5 seconds per slide)

    return () => clearInterval(autoCycle)
  }, [currentIndex, initialData.length, viewMode])

  return (
    <div>
      {/* Control Action Bar */}
      <div className="border-b pb-4 mb-8" style={{ borderColor: 'var(--border)' }}>
        <FadeUp>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setViewMode('ui')}
                className="px-3 py-1.5 rounded transition-all cursor-pointer"
                style={{
                  background: viewMode === 'ui' ? 'var(--surface)' : 'transparent',
                  border: viewMode === 'ui' ? '1px solid var(--border)' : '1px solid transparent',
                  color: viewMode === 'ui' ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                live_stream.sh [AUTO]
              </button>
              <button
                type="button"
                onClick={() => setViewMode('json')}
                className="px-3 py-1.5 rounded transition-all cursor-pointer"
                style={{
                  background: viewMode === 'json' ? 'var(--surface)' : 'transparent',
                  border: viewMode === 'json' ? '1px solid var(--border)' : '1px solid transparent',
                  color: viewMode === 'json' ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                stdout.json
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="font-mono text-xs px-4 py-2 rounded-lg border transition-all flex items-center gap-2 cursor-pointer hover:opacity-90 text-white"
              style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              <span>+$ write_review.exe</span>
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Content Feed Layout */}
      {initialData.length === 0 ? (
        <div
          className="p-12 text-center font-mono text-xs border border-dashed rounded-xl"
          style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
        >
          # empty_set: system is awaiting incoming external reviews.
        </div>
      ) : viewMode === 'ui' ? (
        /* UI SLIDER PRESENTATION */
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Main Container Layer - Flash condition appended dynamically */}
          <div
            className={`rounded-xl border overflow-hidden transition-all duration-300 ${
              isFlashing
                ? 'ring-2 ring-emerald-500/30 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                : 'shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
            }`}
            style={{
              background: 'var(--surface)',
              borderColor: isFlashing ? 'rgba(16,185,129,0.5)' : 'var(--border)',
            }}
          >
            {/* Terminal Window Header */}
            <div
              className="flex items-center justify-between px-5 py-3 transition-colors"
              style={{
                background: isFlashing ? '#e6f7ee' : '#f0ede8',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                className="font-mono text-[10px] flex items-center gap-2"
                style={{ color: isFlashing ? '#047857' : 'var(--muted)' }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isFlashing ? 'animate-ping' : 'animate-pulse'}`}
                />
                log_stream: user_review_{currentIndex + 1}_of_{initialData.length}.json
              </span>
              <div className="flex gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${isFlashing ? 'bg-emerald-400' : 'bg-gray-300'}`}
                />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Overlapping CSS Grid Window - Preserves Slow Motion Cross-Fade */}
            <div className="grid grid-cols-1 grid-rows-1 p-8 md:p-10 w-full overflow-hidden">
              {initialData.map((item, idx) => {
                const stringId = String(item?.id || '')
                const displayId = stringId.length > 8 ? stringId.slice(0, 8) : stringId
                const isActive = idx === currentIndex

                return (
                  <div
                    key={item.id}
                    className={`col-start-1 row-start-1 w-full flex flex-col justify-between transition-all duration-[1000ms] ease-in-out ${
                      isActive
                        ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 -translate-x-6 scale-[0.97] pointer-events-none z-0'
                    }`}
                  >
                    <div className="min-h-[140px] flex flex-col justify-between">
                      <div>
                        <span
                          className="font-mono text-[10px] block mb-4 transition-colors"
                          style={{
                            color: isActive && isFlashing ? 'var(--accent)' : 'var(--muted)',
                          }}
                        >
                          // pipeline_commit: ~/{displayId}{' '}
                          {isActive && isFlashing && '[LOADING_SUCCESS]'}
                        </span>
                        <p
                          className="font-serif italic text-lg md:text-xl leading-relaxed transition-all duration-500"
                          style={{ color: 'var(--text)' }}
                        >
                          “{item.content}”
                        </p>
                      </div>

                      <div
                        className="flex items-center justify-between pt-6 border-t mt-6"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div>
                          <h4 className="font-sans font-medium text-sm">{item.name}</h4>
                          <p
                            className="font-mono text-[11px] mt-0.5"
                            style={{ color: 'var(--muted)' }}
                          >
                            {item.role} {item.company && `@ ${item.company}`}
                          </p>
                        </div>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded transition-all duration-300 ${
                            isFlashing && isActive
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Dynamic Sliding Dots Progress Bar */}
            <div className="flex gap-1.5">
              {initialData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsFlashing(true)
                    setCurrentIndex(idx)
                    setTimeout(() => setIsFlashing(false), 400)
                  }}
                  className={`h-1 rounded-full transition-all duration-[600ms] cursor-pointer ${idx === currentIndex ? 'w-8 bg-emerald-500' : 'w-1.5'}`}
                  style={{ background: idx === currentIndex ? '' : 'var(--border)' }}
                />
              ))}
            </div>

            {/* Manual Navigation Arrows */}
            <div className="flex gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer hover:bg-neutral-50 active:scale-95"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all cursor-pointer hover:bg-neutral-50 active:scale-95"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* RAW STDOUT TERMINAL JSON FORMAT */
        <FadeUp>
          <div
            className="rounded-xl overflow-hidden font-mono text-xs p-6 border leading-relaxed"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#4a4640' }}
          >
            <span style={{ color: 'var(--muted)' }}>{'['}</span>
            {initialData.map((item, idx) => (
              <div key={item.id} className="pl-6 my-3">
                <span>{'{'}</span>
                <div className="pl-6">
                  <div>
                    <span style={{ color: 'var(--accent2)' }}>&quot;id&quot;</span>:{' '}
                    <span style={{ color: 'var(--accent)' }}>
                      {typeof item.id === 'number' ? item.id : `&quot;${item.id}&quot;`}
                    </span>
                    ,
                  </div>
                  <div>
                    <span style={{ color: 'var(--accent2)' }}>&quot;author&quot;</span>:{' '}
                    <span style={{ color: 'var(--accent)' }}>&quot;{item.name}&quot;</span>,
                  </div>
                  <div>
                    <span style={{ color: 'var(--accent2)' }}>&quot;placement&quot;</span>:{' '}
                    <span style={{ color: 'var(--accent)' }}>
                      &quot;{item.role || 'Independent'} {item.company ? `@ ${item.company}` : ''}
                      &quot;
                    </span>
                    ,
                  </div>
                  <div>
                    <span style={{ color: 'var(--accent2)' }}>&quot;log_content&quot;</span>:{' '}
                    <span style={{ color: 'var(--text)' }}>&quot;{item.content}&quot;</span>
                  </div>
                </div>
                <span>{'}'}</span>
                {idx < initialData.length - 1 ? ',' : ''}
              </div>
            ))}
            <span style={{ color: 'var(--muted)' }}>{']'}</span>
          </div>
        </FadeUp>
      )}

      {/* Slide-over Terminal Console Drawer Side Sheet */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isFormOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-xs"
          onClick={() => setIsFormOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[480px] border-l shadow-2xl transition-transform duration-300 transform flex flex-col ${isFormOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ background: '#f0ede8', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#ff6058] cursor-pointer hover:opacity-80"
                />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#29c941]" />
              </div>
              <span className="font-mono text-xs font-semibold text-gray-600">
                secure_input_pipe.sh
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="mb-6">
              <h3 className="font-serif text-xl mb-1">Establish Feedback Request</h3>
              <p className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
                // Transmit peer review metrics into the administrative queue pipeline.
              </p>
            </div>
            <TestimonialForm onSuccess={() => setTimeout(() => setIsFormOpen(false), 1500)} />
          </div>
        </div>
      </div>
    </div>
  )
}
