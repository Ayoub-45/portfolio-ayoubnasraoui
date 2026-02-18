# Ayoub Nasraoui — Portfolio

Personal portfolio site built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── components/
│   ├── Navbar.tsx        # Fixed navigation with mobile menu
│   ├── Hero.tsx          # Hero section with terminal card
│   ├── Skills.tsx        # Skills & tech stack grid
│   ├── Experience.tsx    # Work experience timeline
│   ├── Projects.tsx      # Projects card grid
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer
│   ├── Divider.tsx       # Section divider
│   └── FadeUp.tsx        # Scroll-triggered fade animation
├── data.ts               # ← Edit your content here
├── globals.css           # Global styles & CSS variables
├── layout.tsx            # Root layout + metadata
└── page.tsx              # Main page composition
```

## ✏️ Customizing Content

All your personal content lives in **`app/data.ts`**. Edit that file to update:
- Profile info (name, bio, email, social links)
- Skill groups
- Work experiences
- Projects

## 🚢 Deployment

### Vercel (recommended — free)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the `.next` folder or connect your GitHub repo at netlify.com
```

### GitHub Pages (static export)
Add to `next.config.js`:
```js
const nextConfig = { output: 'export' };
```
Then:
```bash
npm run build
# Deploy the `out/` folder
```
# portfolio-ayoubnasraoui
