# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this Next.js App Router portfolio site. A new `instrumentation-client.ts` file initializes PostHog client-side (the correct pattern for Next.js 15.3+), a `src/lib/posthog-server.ts` utility exposes a singleton server-side client for future API route use, and `next.config.ts` now proxies all PostHog traffic through `/ingest` to improve ad-blocker bypass rates. Eight user-action events were instrumented across six components, covering every major engagement point a portfolio visitor can reach.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | Visitor clicks "Get in touch" or "View projects" in the hero section | `src/app/(frontend)/components/HeroButtons.tsx` |
| `nav_link_clicked` | Visitor clicks a navigation link (desktop or mobile menu) | `src/app/(frontend)/components/Navbar.tsx` |
| `contact_link_clicked` | Visitor clicks Email, LinkedIn, GitHub, or the main email button in the contact section | `src/app/(frontend)/components/ContactCards.tsx` |
| `project_link_clicked` | Visitor clicks the "View project →" external link on a project card | `src/app/(frontend)/components/ProjectCard.tsx` |
| `testimonial_submitted` | Testimonial form submitted successfully | `src/app/(frontend)/components/TestimonialForm.tsx` |
| `testimonial_submission_failed` | Testimonial form submission returned an error (exception also captured) | `src/app/(frontend)/components/TestimonialForm.tsx` |
| `theme_toggled` | Visitor switches between light and dark mode | `src/app/(frontend)/components/DarkToggle.tsx` |
| `blog_post_clicked` | Visitor clicks a blog post card on the blog listing page | `src/app/(frontend)/components/MainBlogPostsClient.jsx` |

**New files created:**
- `instrumentation-client.ts` — client-side PostHog init (Next.js 15.3+ pattern)
- `src/lib/posthog-server.ts` — singleton server-side PostHog client
- `.env.local` — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`

**Files modified:**
- `next.config.ts` — added `/ingest` reverse proxy rewrites and `skipTrailingSlashRedirect: true`

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/473402/dashboard/1721367)
- [Portfolio Engagement Over Time](https://us.posthog.com/project/473402/insights/znl3JdYy) — Hero CTA, contact, and project link clicks as a daily line chart
- [Blog Post Clicks](https://us.posthog.com/project/473402/insights/x5puwaOz) — Blog readership trend over 30 days
- [Testimonial Form Submissions](https://us.posthog.com/project/473402/insights/BBj8ZsZH) — Successful vs. failed testimonial submissions
- [Hero CTA to Contact Conversion Funnel](https://us.posthog.com/project/473402/insights/pvMDc4i9) — Conversion rate from hero click to contact link click
- [Nav & Hero CTA Clicks by Type](https://us.posthog.com/project/473402/insights/DU8BuC8I) — Navigation and hero CTA activity side by side

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any CI/deployment environment variable configuration so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog error tracking.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
