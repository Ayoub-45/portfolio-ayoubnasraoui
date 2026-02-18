"use client";

import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkToggle";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{
        background: "rgba(247,246,242,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e8e5df",
      }}
    >
      <div className="flex items-center gap-4">

      <DarkModeToggle/>
      <span className="font-mono text-sm text-accent tracking-widest">
        ayoub.nasraoui
      </span>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-muted text-sm font-medium tracking-wide transition-colors hover:text-[#1a1814]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#1a1814] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#1a1814] transition-all ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#1a1814] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 py-4 flex flex-col gap-0 md:hidden"
          style={{ background: "rgba(247,246,242,0.97)", borderBottom: "1px solid #e8e5df" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 text-sm font-medium text-muted hover:text-[#1a1814] hover:bg-[#f0ede8] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
