import type { Metadata } from "next";
import { ThemeProvider } from "./components/DarkToggle";
import "./globals.css";
export const metadata: Metadata = {
  title: "Ayoub Nasraoui · DevOps Engineer",
  description:
    "DevOps Engineer and software developer passionate about building scalable systems and reliable infrastructure. Based in Monastir, Tunisia.",
  keywords: ["DevOps", "Cloud", "Docker", "Kubernetes", "SRE", "System Architecture"],
  authors: [{ name: "Ayoub Nasraoui" }],
  openGraph: {
    title: "Ayoub Nasraoui · DevOps Engineer",
    description:
      "DevOps Engineer passionate about scalable systems and reliable infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
