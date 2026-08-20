# AGENTS.md

## Project state

- Next.js 16 (App Router) + React 19 (JSX, no TypeScript) portfolio site for "HAIDAR. - Digital Ecosystem".
- Structure: `app/layout.jsx` (server: metadata, next/font, Material Symbols CDN, imports globals.css), `app/page.jsx` (server, renders HomeClient), `components/HomeClient.jsx` (`'use client'` — all 7 sections + hooks: Nav/Hero+flip-card/Skills/Journey/Projects/Services/Contact/Footer), `components/ShaderCanvas.jsx` (`'use client'`, WebGL bg), theme in `app/globals.css`. `code.html` (static mockup) and `DESIGN.md` (spec) are the design references.
- Migrated from Vite (Oct 2026): `index.html`, `vite.config.js`, `src/` deleted. Not a git repo.
- Quirk: `npx next build` leaves a persistent Turbopack daemon node process that can stall shell output after the command returns; kill node processes started during build/dev before running further shell commands.

## Commands

- `npm run dev` — dev server (Next, port 3000)
- `npm run build` — production build (`next build`; log output is minimal, verify via `.next/BUILD_ID` mtime)
- `npm run start` — serve production build
- `npm run lint` — oxlint (not ESLint); `app/layout.jsx` has `oxlint-disable-next-line` comments for `react/only-export-components` (Next metadata/viewport exports)

## Stack notes

- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`) — NOT the Vite plugin. All design tokens live in `@theme` in `app/globals.css` (ported from the `tailwind.config` in code.html; values match DESIGN.md frontmatter). Key values: accent `#B7F34A` (primary-container), text `#e0e3de` (on-background), body BG `#050807`, card BG `#101711` w/ 1px `#263322` border.
- Custom classes in `app/globals.css` (below `@theme`): `.noise-bg`, `.glass-panel`, `.radial-glow`, `.btn-primary`, `.btn-ghost`, `.timeline-container`/`.timeline-node`/`.timeline-dot`, `.nav-link`, `.reveal`, `.project-mockup`, `.flip-card-*`. Keep them there, not in JSX.
- Fonts: Geist, Inter, JetBrains Mono via `next/font/google` in `app/layout.jsx` (CSS variable names `--font-*`; note `@theme` font tokens use the bare family names, which match the loaded @font-face). Material Symbols Outlined is NOT in `next/font/google` — loaded via Google Fonts CDN `<link>` in `layout.jsx` `<head>`. If a Material Symbols class ever renders as a blank square, check that link.
- SEO: `metadata` + `viewport` exports in `app/layout.jsx` (title, description, OpenGraph, robots, themeColor). `public/robots.txt` + `public/sitemap.xml` use `https://portfolio-haidar.vercel.app` — update if the Vercel project name changes.
- `code.html`'s `dark:` variant classes are duplicates of the base values — the app omits them.

## Behavior implemented in components/HomeClient.jsx

- Scroll-reveal: `useScrollReveal` (IntersectionObserver adds `.active` to `.reveal`). New sections must use `.reveal` (+ `delay-100`/`delay-200`/`delay-300`/`delay-400` for stagger; `delay-400` needs the `--transition-delay-400` token in `@theme`).
- Active nav: `useActiveSection` (scroll listener over `section[id]`).
- Mobile hamburger opens a dropdown menu (state `menuOpen`).
- Hero flip card: `FlipCard` component toggles `.flipped` on the `.flip-card-container` (CSS 3D flip; keep the CSS classes in `globals.css`).
- Shader bg: `ShaderCanvas` renders a `fixed inset-0` WebGL canvas behind all content (`main` is `relative z-10`, `.noise-bg` z-50 on top). It reads `window.scrollY` into the `u_scroll` uniform, so the grid/nodes drift down ~0.4x as you scroll — keep that uniform if you touch the shader. Two variants: `variant="scene"` (default: full-page, 12-node shader, scroll drift) and `variant="home"` (hero-local overlay in `#home`, 8-node shader, no scroll).
- Client-only code (hooks, WebGL, scroll events) must stay in `'use client'` files (`HomeClient.jsx`, `ShaderCanvas.jsx`); everything else can be a server component.
- Sections follow the 12-column grid (24px gutters, 64px desktop / 20px mobile margins, 48-80px section padding, section headings via `SectionHeading` with `01.`-style numbering). Alternate sections use `bg-surface/50`.

## Misc

- `screen.png` is a screenshot of the target design.
