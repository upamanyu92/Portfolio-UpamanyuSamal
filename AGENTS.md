<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

- Stack baseline in this repo: `next@16.2.0`, `react@19.2.4`, `typescript@5`, `tailwindcss@4` (`@import "tailwindcss"` in `app/globals.css`).
- Primary page composition is in `app/page.tsx`: it renders `BentoDashboard` plus `ChatBotLoader`; keep this split when changing landing-page behavior.
- Keep browser-only chatbot code behind `components/ChatBotLoader.tsx` (`next/dynamic` with `{ ssr: false }`) and keep interactive UI components as client components (`"use client"`).
- Treat `data/profile.ts` as the content source of truth (`profileData`, `experiences`, `projects`, `awards`, `chatbotQA`); update these exports before hardcoding duplicate copy in components.
- UI pattern is utility-first Tailwind with shared custom classes from `app/globals.css` (for example `bento-card`, `shimmer`, `neon-dot`); reuse existing classes before adding new global CSS.
- Import paths use the `@/*` alias from `tsconfig.json`; prefer alias imports over deep relative paths.
- Use existing scripts from `package.json`: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
<!-- END:nextjs-agent-rules -->
