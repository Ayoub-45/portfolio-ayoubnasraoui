import { profile } from "../data";
import FadeUp from "./FadeUp";

const contacts = [
  {
    label: "Email",
    value: "Say hello",
    href: `mailto:${profile.email}`,
    icon: <EmailIcon />,
  },
  {
    label: "LinkedIn",
    value: "Ayoub Nasraoui",
    href: profile.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    label: "GitHub",
    value: "View code",
    href: profile.github,
    icon: <GitHubIcon />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-8 md:px-16 py-24 max-w-6xl mx-auto text-center">
      <FadeUp>
        <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
          Let&apos;s connect
        </p>
        <h2
          className="font-serif mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
        >
          Get In Touch
        </h2>
        <p className="mx-auto mb-10 max-w-md" style={{ color: "var(--muted)" }}>
          Whether you have a project in mind, a role to discuss, or just want to talk DevOps — my inbox is open.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl px-8 py-6 min-w-[160px] transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--accent)";
                el.style.boxShadow = "0 4px 20px rgba(42,96,73,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
              }}
            >
              <span style={{ color: "var(--accent)" }}>{c.icon}</span>
              <span className="font-mono text-xs tracking-wider" style={{ color: "var(--muted)" }}>
                {c.label}
              </span>
              <span className="text-sm font-medium">{c.value}</span>
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 text-white rounded-md px-8 py-3.5 font-medium transition-colors"
          style={{ background: "var(--text)", fontSize: "1rem" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = "var(--text)")
          }
        >
          <EmailIcon />
          {profile.email}
        </a>
      </FadeUp>
    </section>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  );
}
