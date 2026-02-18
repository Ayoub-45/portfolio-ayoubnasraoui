import { projects } from "../data";
import FadeUp from "./FadeUp";

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
        Work
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <FadeUp key={project.title} delay={i * 100}>
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
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                style={{ background: "var(--accent-light)" }}
              >
                {project.icon}
              </div>

              <div className="font-semibold text-base mb-2">{project.title}</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>

              <ul className="mb-5 space-y-1">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="relative pl-3 text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className="absolute left-0"
                      style={{ color: "var(--accent)", fontSize: "1.1rem", lineHeight: "1" }}
                    >
                      ·
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-xs font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  View project →
                </a>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
