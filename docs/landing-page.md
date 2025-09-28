# FrontForumFocus — Landing page guide

Purpose
- Give a clear, scannable, and story-driven landing page that introduces FrontForumFocus, funnels visitors to the right product pages (Greta, Enterprise/Impact Dashboard, Podcast & Vibes, Community), and converts (join waitlist / contact / sign up).

High-level goals
- Communicate who we are in one scrollable, memorable experience.
- Surface 5 main destinations: Home (intro), Product (Greta), Enterprise (Impact Dashboard), Podcast & Vibes, Community / Join.
- Keep interactions delightful, lightweight, and performant.

Information architecture (recommended routes)
- `/` — Home: brief intro, hero storytelling, CTA to product and community.
- `/product/greta` — Product: what Greta is, features, micro-demos, CTA to try/join.
- `/enterprise` — Enterprise: impact dashboard, case studies, security & data privacy, enterprise CTA.
- `/podcast` — Podcast & Vibes: episodes, player, show notes, subscribe links.
- `/community` — Community & Join: forums, Discord/Slack link, contributor guide, join form.

Hero / Above the fold
- One-sentence value prop (big, simple). Example: "FrontForumFocus — Reimagining civic conversation with focus-first tools." Use a 6–10 word hook.
- Subhead: one sentence describing the primary product (Greta) and enterprise value.
- Primary CTA: "Explore Greta" or "Join the Community". Secondary CTA: "See Impact Dashboard".
- Visual: subtle 3D or animated scene (we already have `components/magicui/spline-3d.tsx`) or short looping video. Keep it optional and lazy-load.

Story sections (scroll-driven)
- 1) The Problem — 2–3 lines about the noisy online conversation problem.
- 2) The Approach — short bullets: focused conversation, transparent metrics, human-first moderation.
- 3) Greta (teaser) — small interactive demo or carousel of screenshots/gifs. Link to `/product/greta`.
- 4) Enterprise Impact — numbers + one case study snippet + link to `/enterprise`.
- 5) Podcast & Vibes — highlight latest episode with embedded player + link to `/podcast`.
- 6) Community CTA — join form + link to full community page.

Content & Tone
- Storytelling-first: tell a short narrative on the home page that frames the product(s).
- Voice: approachable, optimistic, concise. Avoid dense marketing jargon.
- Microcopy examples:
  - CTA primary: "Try Greta — Focused Conversations"
  - Join CTA: "Join the Community"
  - Enterprise CTA: "Request Impact Demo"

Interactive & creative elements (inspiration: jessezhou.com, ravela.io, corner.inc)
- Scroll-driven reveal animations (text and illustrations fade/slide in).
- Micro-interactions on CTA hover and form submit (ripple or subtle scale).
- Story panels that snap or flow horizontally for the Greta demo.
- Tiny ambient audio on the podcast section (muted by default, user opt-in).
- Use `components/magicui/*` pieces for typographic and reveal effects already in the codebase.

Performance & accessibility
- Lazy-load heavy assets (3D scenes, video, audio, images) and defer non-critical scripts.
- Provide sensible prefers-reduced-motion fallbacks for animations.
- Ensure semantic HTML, keyboard navigability, descriptive alt text, and color contrast >= 4.5:1 for body text.

Ads & monetization (how to fix ads elegantly)
- Principle: prioritize user trust and minimal disruption. Use one or two well-placed ad slots (not interrupting hero or primary CTA).
- Options:
  - Sponsored section: an inline card labelled "Sponsored" in the Enterprise or Podcast section — good for branded content.
  - Newsletter / Audio sponsorships inside the podcast player (server-side served audio preroll).
  - Contextual, privacy-friendly ads: opt-in vs. cookie-based personalization.
- Implementation checklist:
  1. Add a server-side placeholder component `/components/ui/ad-slot.tsx` with a clear label and SSR-safe fallback.
  2. Use CMP for consent (GDPR/CCPA) if you plan targeted ads.
  3. If using third-party ad scripts, lazy-load them after user interaction and sandbox them in an iframe to avoid layout shifts.
  4. Track ads with dedicated metrics (CTR, viewability, revenue per mille) in the impact dashboard.

Developer notes — files & components to add
- Pages to create inside `app/`:
  - `app/product/greta/page.tsx`
  - `app/enterprise/page.tsx`
  - `app/podcast/page.tsx`
  - `app/community/page.tsx`
- Reuse components in `components/magicui` and `components/ui`.
- New components to add (suggested): `AdSlot`, `HeroSplit`, `FeatureCarousel`, `PodcastPlayer`, `EnterpriseCaseStudyCard`.

Analytics & Conversion
- Track: pageviews, CTA clicks (primary & secondary), form conversions (waitlist / join), audio plays, demo requests.
- Suggest event schema (category, action, label): e.g., category=Home, action=Click, label=CTA:ExploreGreta.

Copy snippets (starter)
- Hero title: "Bring focus back to conversation."
- Hero sub: "FrontForumFocus builds tools to reduce noise and amplify meaningful civic discussion — starting with Greta." 
- Greta teaser: "Greta lets individuals host focused conversations, surface consensus, and measure impact."

Launch checklist (short)
1. Finalize copy and hero visual.
2. Wire product and enterprise routes.
3. Add ad-slot component and configure consent flow.
4. Run accessibility audit and fix top 10 issues.
5. Beta test with a small cohort and collect UX feedback.

Appendix — Design inspirations
- jessezhou.com: bold type + scroll storytelling
- ravela.io: immersive visuals and clean transitions
- corner.inc: narrative-driven product storytelling

---
Document last updated: 2025-09-04

