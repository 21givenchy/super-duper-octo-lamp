# FrontForumFocus Roadmap

This roadmap breaks the product and site work into phases: Quick Wins, Phase 1 (MVP), Phase 2 (Polish & Growth), and Phase 3 (Scale & Partnerships). Each item includes success metrics and rough timeboxes.

Requirements extracted from the brief
- Fix ads and implement respectful monetization.
- Make the home/landing page robust, clear, and story-driven.
- Add pages: Product (Greta), Enterprise (Impact Dashboard), Podcast & Vibes, Community/Join.
- Make the site interactive and creative with inspirations from jessezhou.com, ravela.io, corner.inc.

Checklist (master view)
 - [ ] Landing page rewrite (copy + hero + interactions)
 - [ ] Product page: Greta (interactive demo)
 - [ ] Enterprise page: impact dashboard & case studies
 - [ ] Podcast & Vibes page (player + episodes)
 - [ ] Community page + join flow
 - [ ] Ad-slot implementation + consent
 - [ ] Analytics event schema + tracking
 - [ ] Accessibility & perf improvements

Quick Wins (1–2 weeks)
- Create content pages skeletons and canonical routes.
  - Files: `app/product/greta/page.tsx`, `app/enterprise/page.tsx`, `app/podcast/page.tsx`, `app/community/page.tsx`.
  - Metric: pages exist and render with placeholder content.
- Fix ad placement with a labelled `AdSlot` component and lazy-loading.
  - Metric: no layout shifts from ads (CLS < 0.1), and ad scripts load after interaction.
- Small copy updates for hero and CTAs.
  - Metric: reduced bounce on hero section (compare session data).

Phase 1 — MVP (3–6 weeks)
- Greta product page with a short interactive demo.
  - Deliverable: interactive carousel or iframe micro-demo.
  - Metric: demo interactions per visitor.
- Enterprise page with impact dashboard demo and request-demo flow.
  - Deliverable: demo charts (mock or real) and a contact flow.
  - Metric: demo requests submitted / demo views.
- Podcast page with episode list + embedded player.
  - Deliverable: player supporting play/pause, time tracking, subscribe links.
  - Metric: plays, average listen time.
- Community join flow (waitlist form present, Discord/Slack links).
  - Deliverable: signup form connected to existing `app/waitlist`.
  - Metric: signups / invites sent.

Phase 2 — Polish & Growth (6–12 weeks)
- Refine animations and storytelling; ensure prefers-reduced-motion support.
  - Metric: accessibility scores improve; user feedback qualitative.
- Ads: integrate sponsorship placements and analytics pipelines.
  - Metric: revenue per placement, non-intrusive CTR.
- Add A/B experiments for hero copy and CTA placement.
  - Metric: lift in CTA conversion.
- Add SEO optimization and meta/social previews for pages.
  - Metric: organic traffic growth.

Phase 3 — Scale & Partnerships (3–6 months)
- Enterprise integrations (SSO, SAML) and SLAs.
  - Metric: paying enterprise customers onboarded.
- Partnerships with podcasts, publishers for sponsorships.
  - Metric: partnership revenue and referral traffic.
- Internationalization and localization.
  - Metric: traffic & signups from additional locales.

Milestones & Owners (example)
- Milestone 1: Landing Rewrite — owner: Product/Design — due: 2 weeks
- Milestone 2: Greta MVP — owner: Engineering/Product — due: 6 weeks
- Milestone 3: Enterprise Demo — owner: Sales/Eng — due: 8 weeks

Success metrics & tracking
- Define KPIs: homepage CTR, waitlist signups, demo requests, podcast plays, ad revenue.
- Implement an analytics plan (Event schema, dashboards).

Risks & mitigations
- Heavy animations hurting performance -> mitigation: lazy-load, static fallback images, reduced-motion support.
- Ads hurting trust -> mitigation: labelled sponsorship, user-first consent, limited placements.

Next actionable steps (immediately)
1. Add the page skeletons (see Quick Wins). I can scaffold these files for you.
2. Add `AdSlot` component with SSR-safe fallback.
3. Draft final hero copy and a small visual or 3D scene selection.

Notes
- Time estimates assume a small cross-functional team. Adjust based on headcount.

---
Document last updated: 2025-09-04
