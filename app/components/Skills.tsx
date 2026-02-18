import { skillGroups } from "../data";
import FadeUp from "./FadeUp";

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
        Capabilities
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
      >
        Skills &amp; Tech Stack
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillGroups.map((group, i) => (
          <FadeUp
            key={group.label}
            delay={i * 60}
            className={group.soft ? "md:col-span-2" : ""}
          >
            <div
              className="rounded-xl p-7 h-full"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="font-mono text-xs tracking-widest uppercase mb-5"
                style={{ color: "var(--accent)" }}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-pill inline-flex items-center px-3 py-1.5 rounded border text-xs transition-all cursor-default ${
                      group.soft ? "font-sans text-sm" : "font-mono"
                    }`}
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
