"use client";

import React, { useState } from "react";

export default function HeroButtons() {
  const [isGetInTouchHovered, setIsGetInTouchHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium text-white transition-colors"
        style={{
          background: isGetInTouchHovered ? "var(--accent)" : "var(--text)",
        }}
        onMouseEnter={() => setIsGetInTouchHovered(true)}
        onMouseLeave={() => setIsGetInTouchHovered(false)}
      >
        <EmailIcon />
        Get in touch
      </a>
      <a
        href="#projects"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all"
        style={{
          background: "transparent",
          color: "var(--text)",
          border: isProjectsHovered ? "1.5px solid var(--text)" : "1.5px solid var(--border)",
        }}
        onMouseEnter={() => setIsProjectsHovered(true)}
        onMouseLeave={() => setIsProjectsHovered(false)}
      >
        View projects
      </a>
    </div>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}