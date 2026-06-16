// ProjectCard.tsx
"use client"
import posthog from 'posthog-js'

export default function ProjectCard({ project }: { project: any }) {
  return (
            <div
              className="project-card relative rounded-xl p-7 h-full transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.08)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
              }
            >
              <div className="font-semibold text-base mb-2">{project.title}</div>
              
              {/* FIXED: Payload structures array fields as blocks of objects. 
                  Map through 'd.paragraph' if description is an array field */}
              {project.description?.map((d:any) => (
                <p key={d.id} className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  {d.paragraph}
                </p>
              ))}

              <ul className="mb-5 space-y-1">
                {/* FIXED: Access via sub-property 'f.feature' and track with its dynamic 'f.id' key */}
                {project.features?.map((f:any) => (
                  <li
                    key={f.id}
                    className="relative pl-3 text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className="absolute left-0"
                      style={{ color: "var(--accent)", fontSize: "1.1rem", lineHeight: "1" }}
                    >
                      ·
                    </span>
                    {f.feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {/* FIXED: Access via sub-property 's.tech' and track with 's.id' */}
                {project.stack?.map((s:any) => (
                  <span
                    key={s.id}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {s.tech}
                  </span>
                ))}
              </div>
              
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture('project_link_clicked', { project_title: project.title, project_link: project.link })}
                  className="inline-flex items-center gap-1 mt-4 text-xs font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  View project →
                </a>
              )}
            </div>
  )
}