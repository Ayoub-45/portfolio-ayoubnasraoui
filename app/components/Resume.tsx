"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
import { resume } from "../data";


// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: "var(--accent)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="relative pl-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
      <span
        className="absolute left-0"
        style={{ color: "var(--accent)", fontSize: "0.8rem", lineHeight: "1.7" }}
      >
        →
      </span>
      {text}
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Resume() {
  const [open, setOpen] = useState(false);

  return (
    <section id="resume" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Résumé
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
          >
            Full Resume
          </h2>
        </div>

        {/* Download button */}
        <a
          href="/Ayoub_Nasraoui_Resume.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all self-start sm:self-auto"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
          }
        >
          <DownloadIcon />
          Download PDF
        </a>
      </div>

      {/* Resume card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}
      >
        {/* Card header */}
        <div
          className="px-8 py-7 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="font-serif text-2xl mb-0.5" style={{ fontWeight: 400 }}>
            Ayoub Nasraoui
          </h3>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--accent)" }}>
            Junior DevOps / Site Reliability Engineer
          </p>
          <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            Cloud · Kubernetes · Automation · Reliability Engineering
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            <ContactMeta icon={<MailIcon />} label="ayoub.basraoui198@gmail.com" />
            <ContactMeta icon={<PhoneIcon />} label="+216 28 262 740" />
            <ContactMeta
              icon={<GithubIcon />}
              label="github.com/Ayoub-45"
              href="https://github.com/Ayoub-45"
            />
            <ContactMeta
              icon={<LinkedinIcon />}
              label="linkedin.com/in/ayoub-nasraoui"
              href="https://linkedin.com/in/ayoub-nasraoui-6b06b2236"
            />
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7 space-y-8">
          {/* Summary */}
          <div>
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {resume.summary}
            </p>
          </div>

          {/* Education */}
          <div>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {resume.education.map((e) => (
                <div key={e.degree} className="flex justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm font-semibold">{e.degree}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {e.school}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-full h-fit"
                    style={{
                      color: "var(--accent)",
                      background: "var(--accent-light)",
                      border: "1px solid #c5dfd4",
                    }}
                  >
                    {e.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="space-y-2.5">
              {resume.skills.map((group) => (
                <div key={group.label} className="flex flex-wrap gap-x-3 gap-y-1 items-baseline">
                  <span className="font-mono text-xs font-medium w-40 flex-shrink-0" style={{ color: "var(--text)" }}>
                    {group.label}:
                  </span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {group.items.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <SectionTitle>Professional Experience</SectionTitle>
            <div className="space-y-5">
              {resume.experience.map((exp) => (
                <div key={exp.title}>
                  <div className="flex flex-wrap justify-between gap-2 mb-1.5">
                    <div>
                      <p className="text-sm font-semibold">{exp.title}</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs px-2.5 py-1 rounded-full h-fit"
                      style={{
                        color: "var(--accent)",
                        background: "var(--accent-light)",
                        border: "1px solid #c5dfd4",
                      }}
                    >
                      {exp.date}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {exp.bullets.map((b) => (
                      <Bullet key={b} text={b} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {resume.projects.map((p) => (
                <div key={p.name}>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                      }}
                    >
                      {p.stack}
                    </span>
                  </div>
                  <ul className="space-y-0.5">
                    {p.bullets.map((b) => (
                      <Bullet key={b} text={b} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible: languages + soft skills + interests */}
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-xs font-mono tracking-wider transition-colors"
              style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                ▶
              </span>
              {open ? "Hide" : "Show"} Languages, Soft Skills & Interests
            </button>

            {open && (
              <div className="mt-5 space-y-5">
                {/* Languages */}
                <div>
                  <SectionTitle>Languages</SectionTitle>
                  <div className="flex flex-wrap gap-3">
                    {resume.languages.map((l) => (
                      <div
                        key={l.lang}
                        className="flex flex-col items-center px-4 py-2.5 rounded-lg"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          minWidth: 90,
                        }}
                      >
                        <span className="text-sm font-semibold">{l.lang}</span>
                        <span className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                          {l.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <SectionTitle>Soft Skills</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {resume.softSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "var(--accent-light)",
                          border: "1px solid #c5dfd4",
                          color: "var(--accent)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <SectionTitle>Interests</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {resume.interests.map((i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--muted)",
                        }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function ContactMeta({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const cls = "inline-flex items-center gap-1.5 text-xs";
  const style = { color: "var(--muted)" };
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
      {icon} {label}
    </a>
  ) : (
    <span className={cls} style={style}>
      {icon} {label}
    </span>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}