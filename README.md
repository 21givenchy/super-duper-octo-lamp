 
# FrontForumFocus (F³)

Founder-first focus and impact platform — a Next.js app that helps founders align daily work with mission and measure meaningful outcomes.

## Quick overview

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 with a dark-first theme
- Animations: Framer Motion
- Forms & Validation: React Hook Form + Zod
- UI primitives: Shadcn UI + custom animated components in `components/magicui`

## What this repo contains

- `app/` — Next.js app router pages and API endpoints
- `components/` — UI and magic UI animated components
- `public/` — static assets and images
- `lib/` — small utilities

## Development

1. Copy environment example:

```bash
# FrontForumFocus — Greta (Focus-first conversations & impact)

Greta (part of the FrontForumFocus project) is a small platform and landing site demonstrating a focus-first approach to conversations, impact tracking, and community — designed for founders and mission-driven teams.

This repository contains the marketing site (Next.js App Router), supporting content pages, and UI primitives used to prototype the Greta product and its enterprise features.

## Quick overview

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 with a dark-first theme
- Animations: Framer Motion
- Forms & Validation: React Hook Form + Zod
- UI primitives: Shadcn UI + custom animated components in `components/magicui`

## Why this project

- Replace noise with focus: surface the actions that move the needle and connect work to a shared North Star.
- Product + community: showcase individual tools (Greta), enterprise impact dashboards, and community resources (podcast, forum).
- Respectful monetization: opt-in ad placements and consent-first ad components are built into the site skeleton.

## Quick links

- Home / landing: `/` (this repo's `app/page.tsx`)
- Product (Greta): `/product/greta`
- Enterprise: `/enterprise`
- Podcast & Vibes: `/podcast`
- Community / Join: `/community`
- Waitlist & demo onboarding: `/waitlist`

## Key features

- Next.js (App Router) with server and client components
- Tailwind CSS for utility-driven styling
- Framer Motion for entrance and micro-interactions
- Consent-driven ad placeholder (`AdSlot`) and `ConsentBanner`
- Waitlist flow and simple form validation (React Hook Form + Zod)

## Prerequisites

- Node.js 18+ (or later LTS)
- npm or yarn

## Local development (quick start)

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Create a `.env.local` from `env.example` and add any required secrets.

3. Run development server

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 to preview the site.

## Project structure (high level)

- `app/` — Next.js App Router pages and route handlers
- `components/magicui/` — custom animated UI primitives used in the hero and micro-interactions
- `components/ui/` — site UI components and small building blocks (buttons, inputs, `AdSlot`, `ConsentBanner`)
- `public/` — static assets and images
- `docs/` — planning and strategy docs (roadmap, landing page guide)

## Environment variables

- See `env.example` for variables used by server routes and integrations. Keep secrets out of source control and store production values securely (Vercel, Cloud provider secret store).

## Testing & quality

- TypeScript: the project enforces types in the codebase — run TypeScript checks as part of CI.
- Linting: `npm run lint` uses Next.js ESLint config.
- Visual checks: run the dev server and verify hero animations and consent flows manually.

## Deployment

- Recommended: Vercel (built-in Next.js support). The `build` script uses `next build`.

## CI / Preview

- Use GitHub Actions or Vercel Deploy Previews to validate branches and preview changes before merging.

## Contributing

- Open an issue for feature requests, bugs, or design questions.
- For code contributions: fork the repo, create a branch, and open a pull request with a concise description and screenshots if the change affects UI.
- Keep changes small and focused. Add tests or type checks for non-trivial logic.

## Notes about privacy and ads

- The site includes an `AdSlot` component and a `ConsentBanner` component that stores a local consent flag (`ff_ads_consent`) and broadcasts changes via the `ad-consent-changed` event. Ads or third-party ad scripts should only load after explicit consent.

## Google Ads / Consent

This project includes a lightweight, client-side Ads consent banner (`components/ui/ads-consent.tsx`).
- The banner asks for explicit consent before loading the Google Ads script.
- Consent is stored in `localStorage` under `fff_ads_consent`.
- The banner is mounted globally via `ClientWrapper` so it appears across the site.

If you rely on GDPR/CCPA requirements in your jurisdiction, integrate a full consent management platform and keep legal guidance — this component is a simple, auditable starting point.

## License

MIT — see the `LICENSE` file.

 
MIT — see the `LICENSE` file.
=======
This project is released under the MIT license. See the `LICENSE` file for details.

## Contact

- For product questions or demos, open an issue or contact the repo owner.

---

Document last updated: 2025-09-28
>>>>>>> f1e1d81 (Refactor and enhance FrontForumFocus platform)
