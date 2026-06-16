import React from 'react'
import './styles.css'
import { ThemeProvider } from './components/DarkToggle'
import Navbar from './components/Navbar'
export const metadata = {
  title: "Ayoub DevOps | Portfolio",
  description: "DevOps Engineer portfolio showcasing projects, blogs, and system design work.",
  keywords: ["DevOps", "Kubernetes", "Cloud", "Next.js", "Payload CMS"],
  openGraph: {
    title: "Ayoub DevOps Portfolio",
    description: "DevOps Engineer Portfolio",
    url: "https://ayoub-devops.com",
    siteName: "Ayoub DevOps",
    type: "website",
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
