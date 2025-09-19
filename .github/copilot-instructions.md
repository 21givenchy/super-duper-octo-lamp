# FrontForumFocus (F³) - Sustainability Impact Tracking Platform

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build the Repository
**CRITICAL**: Set timeout to 60+ minutes for builds. NEVER CANCEL builds or long-running commands.

Run these commands in exact order:
```bash
# Install dependencies - takes ~21 seconds
npm install

# Run linting - takes ~5 seconds, may show 1 warning about ref cleanup (acceptable)
npm run lint

# Build application - NEVER CANCEL, takes ~20-30 seconds normally
# NOTE: Build may fail with "ENOTFOUND fonts.googleapis.com" due to Google Fonts network access
npm run build
```

**FONT ISSUE WORKAROUND**: If build fails with Google Fonts error, temporarily modify `app/layout.tsx`:
- Comment out `import { Geist, Geist_Mono, Poppins } from "next/font/google"`
- Remove font configuration objects (`geistSans`, `geistMono`, `poppins`)
- Replace body className with system fonts: `className="antialiased bg-[#111] text-white"`
- Build will then succeed in ~20 seconds

### Run the Application
**Development server**:
```bash
# Start dev server with Turbopack - starts in ~1 second
npm run dev
# Access at http://localhost:3000
```

**Production server**:
```bash
# Must build first (see above)
npm run start
# Starts in ~400ms, serves optimized build
```

## Manual Validation Scenarios

**ALWAYS** test these complete user workflows after making changes:

### 1. Waitlist Form Functionality
- Navigate to home page (`/`)
- Fill email field with valid email (e.g., `test@example.com`)
- Click "Join Newsletter" button
- Verify form submission (requires `ROUTER_API_KEY` in `.env.local`)
- Test invalid email to verify validation

### 2. Page Navigation Flow
- Visit each page: `/`, `/start`, `/measure`, `/vibes`, `/waitlist`
- Verify animations load properly (Framer Motion effects)
- Check responsive design on different viewport sizes
- Confirm images load (background: `soph.png`, `MOSHED-2025-9-18-12-53-42.jpg`)

### 3. External Links
- Test Discord community link: `https://discord.gg/qpV9Gg3S54`
- Verify "Try Now" button on `/measure` page: `https://greta-v2.vercel.app`

## Environment Setup

**Required steps**:
1. Copy `env.example` to `.env.local`
2. Add `ROUTER_API_KEY=your_api_key` for waitlist functionality
3. Node.js 18+ required (project tested with Node 20.19.5)

## Key Project Architecture

### Core Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with custom theme system
- **Components**: Shadcn UI + custom `magicui/` animations
- **Forms**: React Hook Form + Zod validation
- **Analytics**: Vercel Analytics + Speed Insights

### Critical Files Structure
```
app/
├── api/waitlist/route.ts     # Email submission endpoint
├── layout.tsx                # Root layout with fonts (Google Fonts issue)
├── page.tsx                  # Main landing page
├── measure/page.tsx          # Impact tracking
├── start/page.tsx            # Onboarding with Discord link
├── vibes/page.tsx            # Community content
└── waitlist/schema.ts        # Zod validation schema

components/
├── magicui/                  # Custom animations (comic-text, spinning-text)
└── ui/waitlist-form.tsx      # Reusable form component
```

### Common Development Tasks

**Before committing changes**:
- Always run `npm run lint` (must pass with only acceptable warnings)
- Build and test locally: `npm run build && npm run start`
- Test all validation scenarios listed above

**Adding new animations**: Reference existing `components/magicui/` components for Framer Motion patterns

**Form modifications**: Update `app/waitlist/schema.ts` first, then component props

**Styling changes**: Use existing CSS custom properties in `globals.css`, maintain dark theme (`bg-black`, `bg-[#111]`, `text-white`)

## External Dependencies

### APIs & Services
- **Router.so**: Waitlist endpoint `https://app.router.so/api/endpoints/sjiyhc68`
- **Google Fonts**: Geist, Geist Mono, Poppins (may fail in restricted environments)
- **PostHog**: Analytics integration via `instrumentation-client.ts`

### Known Issues
- **Google Fonts**: Network access required for build, use workaround if failing
- **ESLint warning**: `pointer-highlight.tsx` ref cleanup warning (acceptable)
- **Metadata warnings**: Next.js 15 viewport/themeColor deprecation warnings (non-blocking)

## Build Timing & Expectations

- **npm install**: ~21 seconds
- **npm run lint**: ~5 seconds  
- **npm run build**: ~20-30 seconds (NEVER CANCEL - may take longer on slower systems)
- **npm run dev**: ~1 second startup
- **npm run start**: ~400ms startup

**CRITICAL REMINDER**: NEVER CANCEL any build or test commands. Set timeout to 60+ minutes minimum.