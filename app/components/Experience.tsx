import { experiences } from "../data";
import FadeUp from "./FadeUp";

export default function Experience() {
  return (
    <section id="experience" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
        Career
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
      >
        Work Experience
      </h2>

      <div className="relative pl-8" style={{ borderLeft: "1px solid var(--border)" }}>
        {experiences.map((exp, i) => (
          <FadeUp key={exp.title} delay={i * 150} className="relative pb-12 last:pb-0">
            {/* Dot */}
            <div
              className="absolute rounded-full"
              style={{
                left: "-2.4rem",
                top: "0.35rem",
                width: 10,
                height: 10,
                background: "var(--accent)",
                border: "2px solid var(--bg)",
                outline: "1px solid var(--accent)",
              }}
            />

            <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
              <div>
                <div className="text-base font-semibold">{exp.title}</div>
                <div className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                  {exp.company}
                </div>
              </div>
              <span
                className="font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  color: "var(--accent)",
                  background: "var(--accent-light)",
                  border: "1px solid #c5dfd4",
                }}
              >
                {exp.date}
              </span>
            </div>

            <p className="text-sm mb-4 mt-2" style={{ color: "var(--muted)" }}>
              {exp.description}
            </p>

            <ul className="mb-4 space-y-1">
              {exp.bullets.map((b) => (
                <li key={b} className="relative pl-4 text-sm" style={{ color: "var(--muted)" }}>
                  <span className="absolute left-0" style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                    →
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "#f0ede8",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
