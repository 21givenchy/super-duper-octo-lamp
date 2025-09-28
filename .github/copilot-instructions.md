# Copilot Instructions - frontforumfocus

## Project Overview
This is **frontforumfocus** (FxN) - a founder focus optimization platform built with Next.js 15, designed to help founders align daily actions with their core mission. The app uses a sophisticated visual identity with dark themes, custom animations, and a founder-centric narrative.

## Architecture & Key Patterns

### Core Tech Stack
- **Framework**: Next.js 15 with App Router (`app/` directory)
- **Styling**: Tailwind CSS v4 with custom theme system
- **Components**: Shadcn UI + custom `magicui/` animation components  
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion (`motion` package) for all interactions
- **Analytics**: Vercel Analytics + Speed Insights

### Project Structure
```
app/                 # Next.js App Router pages
├── api/waitlist/    # API endpoint for email collection
├── measure/         # Impact tracking page
├── start/           # Main onboarding/waitlist page  
├── vibes/           # Community content (videos)
└── waitlist/        # Form schemas and actions

components/
├── magicui/         # Custom animated components (comic-text, spinning-text, etc.)
└── ui/              # Shadcn components + project-specific (navigation, waitlist-form)
```

## Development Patterns

### Component Architecture
- **All pages are client components** using `"use client"` directive
- **Memo extensively**: Use `React.memo()` for expensive components (see `VideoPlayer`, `SpacedTypography`)
- **Custom hook patterns**: Forms use `useForm` from React Hook Form with Zod resolvers
- **Animation patterns**: Framer Motion variants for consistent enter/exit animations

### Styling Conventions
- **Dark theme first**: Primary palette is `bg-black`, `bg-[#111]`, `text-white`
- **Glassmorphism effects**: `backdrop-blur` + `bg-white/5` for cards
- **Custom CSS variables**: Extensive use of CSS custom properties in `globals.css`
- **Responsive patterns**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

### Form & Data Flow
- **Centralized validation**: All forms use Zod schemas (see `app/waitlist/schema.ts`)
- **API integration**: Forms submit to `/api/waitlist` → external Router.so endpoint
- **Error handling**: Consistent error states with `handleApiError` utility
- **Success feedback**: Inline success/error messages in form components

## Essential Development Commands

```bash
# Development with Turbopack
npm run dev --turbopack

# Build & deployment
npm run build
npm run start

# Linting
npm run lint
```

## Key Files to Understand

### Core Layout & Client Wrapper
- `app/layout.tsx` - Root layout with Geist fonts, analytics setup
- `components/ui/client-wrapper.tsx` - Handles loading states + global header logo

### Form Architecture
- `components/ui/waitlist-form.tsx` - Reusable form component with customizable styling
- `app/waitlist/schema.ts` - Zod validation schema
- `app/api/waitlist/route.ts` - API endpoint with external integration

### Animation Components
- `components/magicui/comic-text.tsx` - Custom comic book style text with motion
- `components/magicui/spinning-text.tsx` - Circular rotating text component
- `components/magicui/loading-curtain.tsx` - Page load animation

## Content & Messaging Patterns

### Brand Voice
- **Target audience**: Founders struggling with focus/distractions
- **Core message**: "Align daily actions with core mission"
- **Tone**: Personal, authentic founder-to-founder communication

### Page Purposes
- **Home (`/`)**: Main landing with pricing ($15/month, lifetime charter price)
- **Start (`/start`)**: Earth imagery, SDG alignment messaging, community focus
- **Measure (`/measure`)**: Personal impact tracking story and onboarding
- **Vibes (`/vibes`)**: Community content via YouTube embeds, auto-rotating videos

### Visual Identity
- **Background**: Consistent `soph.png` image across all pages with dark overlay
- **Typography**: Geist Sans primary, custom `Cofo Sans Mono` for special text
- **Colors**: Teal accent (`teal-500`), gradients from blue to purple
- **Images**: Phone mockups (`mm.png`, `n.png`, `nn.png`) showing app interface

## External Integrations

### APIs & Services
- **Router.so**: Email collection endpoint (`process.env.ROUTER_API_KEY`)
- **Discord**: Community link (`https://discord.gg/qpV9Gg3S54`)
- **YouTube**: Embedded videos in vibes page with specific start times
- **External links**: Substack newsletter, Sourcia.ai references

### Performance Optimizations
- **Image optimization**: Next.js Image component with proper `sizes` attributes
- **Font loading**: `display: swap` for better loading performance
- **Component memoization**: Strategic use of `React.memo` and `useCallback`
- **Analytics**: Vercel Speed Insights for performance monitoring

## Common Editing Patterns

When modifying this codebase:

1. **Adding new pages**: Follow the `"use client"` + background image + navigation pattern
2. **Form modifications**: Update Zod schema first, then component props
3. **Styling changes**: Use existing CSS custom properties, maintain dark theme consistency
4. **Animation additions**: Reference existing magicui components for motion patterns
5. **Content updates**: Maintain founder-focused messaging and community emphasis

## Environment Setup
- Copy `env.example` to `.env.local` 
- Key environment variable: `ROUTER_API_KEY` for waitlist functionality
- Development uses Turbopack for faster builds