# Sustainability Impact Tracking Platform

A modern, responsive web application built with Next.js for tracking personal and organizational sustainability impact metrics.

## Project Overview

This platform enables users to track their sustainability efforts and measure impact across various UN Sustainable Development Goals (SDGs). The application features a clean, minimalist design with interactive elements and optimized performance.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Elements**: [Spline](https://spline.design/)
- **Form Handling**: 
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) for validation

## Key Features

- **Home Page**: Engaging landing page with animated elements and clear call to action
- **Measure Page**: Impact tracking metrics and onboarding form
- **Vibes Page**: Community engagement through embedded content
- **Start Page**: Waitlist registration and SDG tracking information
- **Google Calendar Integration**: Sync sustainability tracking activities and reminders with Google Calendar

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sustainability-impact-platform.git
   cd sustainability-impact-platform
   ```

2. Install dependencies:
```bash
npm install
# or
   yarn
```

3. Create a `.env.local` file based on the provided `env.example` and add your environment variables.

4. **Google Calendar API Setup** (Required for calendar integration features):
   
   a. Go to the [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Enable the Google Calendar API:
      - Navigate to "APIs & Services" → "Library"
      - Search for "Google Calendar API" and click "Enable"
   
   d. Create credentials:
      - Go to "APIs & Services" → "Credentials"
      - Click "Create Credentials" → "OAuth 2.0 Client IDs"
      - Configure OAuth consent screen if prompted
      - Set application type to "Web application"
      - Add authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
      - Copy the Client ID and Client Secret
   
   e. Create an API Key:
      - Click "Create Credentials" → "API Key"
      - Restrict the key to Google Calendar API for security
      - Copy the API Key
   
   f. Update your `.env.local` file with the Google Calendar credentials:
      ```
      GOOGLE_CLIENT_ID=your_actual_client_id
      GOOGLE_CLIENT_SECRET=your_actual_client_secret
      GOOGLE_API_KEY=your_actual_api_key
      GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
      ```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── api/                  # API endpoints
│   │   ├── auth/            # Google OAuth authentication
│   │   ├── calendar/        # Google Calendar integration endpoints
│   │   └── waitlist/        # Waitlist submission
│   ├── measure/              # Measure impact page
│   ├── start/                # Start page with waitlist form
│   ├── vibes/                # Vibes community page
│   └── waitlist/             # Waitlist components and schema
├── components/               # React components
│   ├── magicui/              # Custom UI components with animations
│   └── ui/                   # Shadcn UI components
├── lib/                      # Utility functions
└── public/                   # Static assets
```

## Google Calendar Integration

The platform includes Google Calendar integration to help users schedule and track their sustainability activities:

### Features:
- **Event Creation**: Automatically create calendar events for sustainability goals
- **Impact Reminders**: Schedule recurring reminders for impact tracking
- **SDG Alignment**: Tag calendar events with relevant UN SDG categories
- **Progress Tracking**: View scheduled vs completed sustainability activities

### API Endpoints:
- `POST /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Handle OAuth callback
- `POST /api/calendar/events` - Create calendar events
- `GET /api/calendar/events` - List user's sustainability events
- `PUT /api/calendar/events/[id]` - Update calendar events
- `DELETE /api/calendar/events/[id]` - Delete calendar events

### Usage:
1. Users connect their Google Calendar during onboarding
2. System creates sustainability tracking events based on user preferences
3. Regular reminders help maintain consistency in impact measurement
4. Calendar integration works seamlessly with the existing waitlist and tracking features

## Performance Optimizations

- **React Server Components**: Used for improved initial load performance
- **Component Memoization**: Optimized rendering with React.memo for expensive components
- **Code Splitting**: Dynamic imports for better chunk management
- **Responsive Images**: Optimized for various viewport sizes
- **CSS Optimizations**: Using Tailwind's JIT compiler

## Development Practices

- **Component Structure**: Modular components with clear separation of concerns
- **TypeScript**: Strong typing for improved developer experience and fewer bugs
- **DRY Principle**: Reusable components for consistency and maintenance
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Performance**: Optimized rendering with React.memo and useCallback

## Deployment

The application is set up for easy deployment on Vercel or similar platforms:

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
