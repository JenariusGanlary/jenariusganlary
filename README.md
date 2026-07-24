# jenariusganlary.com

Personal blog and brand platform covering AI, SaaS, software engineering, Next.js, and indie hacking — built and maintained as a modern, high-performance content site.

🔗 **Live site:** [jenariusganlary.com](https://jenariusganlary.com)

---

## ✨ Overview

`jenariusganlary.com` is a content-first personal site built with the Next.js App Router. Blog posts are authored as Markdown, rendered through a custom pipeline (frontmatter parsing, remark/rehype processing, auto-generated table of contents), and organized into five recurring content pillars. The site includes a working contact form, analytics, and full SEO tooling (sitemap, robots.txt, RSS, Open Graph/Twitter cards).

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI | React, [shadcn/ui](https://ui.shadcn.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (light default, dark toggle) |
| Content | Markdown + [gray-matter](https://github.com/jonschlinkert/gray-matter) + [remark](https://github.com/remarkjs/remark) / [rehype](https://github.com/rehypejs/rehype) pipeline |
| Email | [Resend](https://resend.com/) (contact form) |
| Analytics | Google Analytics (`gtag.js`) |
| Hosting | [Vercel](https://vercel.com/) — auto-deploys on push to `main` |
| Dev Environment | GitHub Codespaces |

## 🚀 Features

- **Markdown-powered blog** — posts stored in `posts/`, parsed with `gray-matter`, rendered via a `remark` → `rehype` pipeline
- **Auto-generated table of contents** on each post, built from `##`/`###` headings with jump links (`rehype-slug`, `rehype-autolink-headings`)
- **Five content pillars**: SaaS & AI Tools, Startups & Indie Hacking, Tech & Developer Life, Finance for Builders, Building in Public — each with its own slug, ticker, and accent color
- **Light/dark theme** via `next-themes`, with CSS-variable-driven theming
- **Contact form** wired to Resend on a verified sending domain
- **Full SEO layer** — dynamically generated `sitemap.xml`, `robots.txt`, and `rss.xml`, plus Open Graph and Twitter Card metadata on every route
- **Author bio + related posts** on each article, with a social share row (copy link, X, LinkedIn)
- **Google Analytics** integration for traffic and search-source tracking

## 📁 Project Structure

```
.
├── app/
│   ├── page.tsx                  # Homepage
│   ├── blog/
│   │   ├── page.tsx               # Full articles listing
│   │   └── [slug]/page.tsx        # Individual post page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── resources/page.tsx
│   ├── newsletter/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── affiliate-disclosure/page.tsx
│   ├── api/contact/route.ts       # Resend-powered contact endpoint
│   ├── sitemap.ts
│   ├── robots.ts
│   └── rss.xml/route.ts
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── posts.ts                   # getAllPosts() / getPostBySlug()
│   └── categories.ts               # Content pillar definitions
├── posts/                          # Markdown blog posts
└── public/
```

## 🛠️ Getting Started

This project is developed inside **GitHub Codespaces**. To run it locally or in a Codespace:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with the following:

```bash
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
```

### Build

Always verify a clean production build before pushing:

```bash
npm run build
```

## 📦 Deployment

Deployment is fully automated:

```
git add .
git commit -m "your message"
git push
```

Every push to `main` triggers an automatic build and deploy on **Vercel**.

## 🗺️ Roadmap

- [ ] Newsletter signup (Beehiiv link-out button)
- [ ] Products / digital downloads section
- [ ] Backfill fallback tickers with real thumbnails on older posts
- [ ] Comments (candidate: Giscus, once there's meaningful traffic)

## 📄 License

This project's source code is personal and not currently licensed for reuse. All blog content is © Jenarius Ganlary.

## 📬 Contact

Questions or collaboration inquiries: use the [contact form](https://jenariusganlary.com/contact) on the site.
