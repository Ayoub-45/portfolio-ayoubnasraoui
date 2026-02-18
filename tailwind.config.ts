import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        bg: "#f7f6f2",
        surface: "#ffffff",
        border: "#e8e5df",
        muted: "#7a7570",
        accent: "#2a6049",
        "accent-light": "#e8f2ed",
        accent2: "#c8873a",
      },
    },
  },
  plugins: [],
};

export default config;
