# SmartStox - Prosperian Capital Investment

## Project Overview

SmartStox is a modern fintech web application for Prosperian Capital Investment, featuring an AI-driven trading platform with a multilingual website, ambassador program, and user authentication system.

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19.2.4 + Tailwind CSS v4
- **State Management**: Redux Toolkit + React Redux
- **Data Fetching**: TanStack React Query v5
- **Forms**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui + Radix UI primitives
- **Animations**: Framer Motion
- **Internationalization**: next-intl (en, fr)
- **Toast Notifications**: Sonner
- **Icons**: Lucide React + React Icons
- **Date Handling**: date-fns, dayjs

## Project Structure

```
app/[locale]/           # Next.js App Router with i18n
├── page.tsx            # Home page
├── layout.tsx          # Root layout with providers
├── login/              # Login page
├── signup/             # Signup with email verification
├── ambassadors/        # Brand ambassador program
├── our-strategy/       # Trading strategy info
├── pricing/            # Pricing plans
├── venture-capital/    # Investment info
├── media-library/      # Brand assets
├── further-reading/    # Knowledge base
└── t&c/                # Terms & Conditions

components/
├── animations/         # Framer Motion components (FadeIn, SmoothScroll, StaggerContainer)
├── auth/               # Authentication forms (MultiStepSignupForm, EmailVerification)
├── common/             # Reusable UI (TextInput, PrimaryBTN, Typography, DialogBox, etc.)
├── layout/             # Navbar, Footer
├── sections/           # Page-specific sections organized by page
│   ├── HomePage/
│   ├── AmbassadorsPage/
│   ├── OurStrategy/
│   ├── PricingPage/
│   ├── MediaLibrary/
│   └── FurtherReadingPage/
└── ui/                 # shadcn/ui components (button, calendar, popover, etc.)

lib/
├── api/                # Axios instance
├── services/           # API services (auth, ambassador, calendly)
└── utils/              # Auth utilities, cookies

store/                  # Redux store
├── slices/authSlice.ts
└── index.ts

providers/              # Context providers
├── AppProviders.tsx
├── QueryProvider.tsx
└── ReduxProvider.tsx

i18n/                   # Internationalization
├── config.ts
├── navigation.ts
└── request.ts

messages/               # Translation files
├── en.json
└── fr.json

public/                 # Static assets (images, logos)
```

## Key Features

1. **Email Verification Flow**: Two-step signup with OTP verification
2. **Multilingual Support**: English and French via next-intl
3. **Dark Theme**: Finance-focused dark UI with green (#00D094, #10D078) and blue (#2A73EA) accents
4. **Animations**: Smooth scroll, fade-in effects, stagger animations
5. **Form Validation**: Zod schemas for email, OTP, and signup validation
6. **Gradient Overlay**: Scroll-linked blue gradient effect on pages

## Quick Reference

**Colors:** Green `#00D094`/`#10D078`, Blue `#2A73EA`, Background `#0b0f19`, Text `white`/`gray-400`, Border `white/60`

**Commands:** `npm run dev` | `npm run build` | `npm run lint`

**Tailwind v4 Syntax:** `@import 'tailwindcss'` (not `@tailwind`)

## AI Coding Guidelines

### Before Creating New Components
1. **Check existing components first**: `components/common/` has TextInputBase, PrimaryBTN, Typography, DialogBox, CalendarPicker, SelectDropdown
2. **Check shadcn/ui**: `components/ui/` has button, calendar, popover, etc.
3. **Prefer composition** over creating new components

### Code Patterns to Follow

**Imports Order:**
```tsx
// 1. React/Next
import React from "react";
import { useRouter } from "next/navigation";

// 2. External libs
import { z } from "zod";
import { toast } from "sonner";

// 3. Internal components (alias @/)
import { TextInputBase } from "@/components/common/TextInput";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";

// 4. Hooks/utils
import { useAuth } from "@/hooks/useAuth";
```

**Component Structure:**
```tsx
// Props interface first
interface Props { ... }

// Main component
export default function Component({ prop }: Props) {
  // hooks at top
  // handlers next
  // return JSX
}
```

**Tailwind Patterns:**
- Use `w-full` for responsive width, not fixed widths
- Use `flex-1` for growable content
- Use `gap-3` or `gap-4` for consistent spacing
- Colors: `text-[#2A73EA]`, `bg-[#10D078]`, `text-gray-400`
- Borders: `border-white/60`, `rounded-lg`, `rounded-md`

**Form Validation Pattern:**
```tsx
const schema = z.string().email("Message");
const result = schema.safeParse(value);
if (!result.success) {
  toast.error(result.error.issues[0].message); // not .errors
  return;
}
```

**Animation Pattern:**
```tsx
import { FadeIn } from "@/components/animations";
<FadeIn direction="up" duration={0.5}>...</FadeIn>
```

### Common Mistakes to Avoid
1. **Zod v4+** uses `.issues` not `.errors`
2. **Gradient overlay** needs sibling wrapper with `z-10`, don't put on content container
3. **Don't create new Buttons** → use `PrimaryBTN` or `components/ui/button`
4. **Don't hardcode API URLs** → use `lib/api/axiosInstance.ts`
5. **Don't manage auth state manually** → use `Redux authSlice`
6. **Client Components** need `"use client"` when using hooks, browser APIs, or event handlers

### Token-Saving Rules
- **Always check** `@/components/common/` before creating UI components
- **Always check** `@/components/animations/` before adding animations
- **Always check** `@/lib/utils.ts` for existing utility functions
- **Reuse** `TextInputBase` + `PrimaryBTN` for all forms
- **Reuse** `Typography` component for text (variant: "h1" | "h2" | "h3" | "p")
- **Use** existing Zod schemas as reference for new validation

### Quick Component Lookup
| Need | Use |
|------|-----|
| Button | `PrimaryBTN` or `components/ui/button` |
| Input | `TextInputBase` |
| Phone Input | `PhoneInputBase` (with country code dropdown) |
| Select | `SelectDropdownBase` |
| Dialog | `DialogBox` |
| Date picker | `CalendarPicker` |
| Fade animation | `FadeIn` |
| Stagger animation | `StaggerContainer` |
| Smooth scroll | `SmoothScroll` (Lenis-based) |
| Typography | `Typography` with variant |
| Toast | `toast.success/error` from sonner |

## Additional Patterns

**Phone Input Pattern:**
```tsx
import { PhoneInputBase, useCountryCodes } from "@/components/common/TextInput";

const countryCodes = useCountryCodes();
<PhoneInputBase
  countryCodeOptions={countryCodes}
  countryCodeValue={countryCode}
  onCountryCodeChange={setCountryCode}
  placeholder="Phone number"
/>
```

**React Hook Form + Zod:**
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(schema),
});
```

**Available Hooks:**
- `useAuth` - Authentication state and methods
- `useCountryCodes` - Fetch country dial codes

**Types:**
- `types/index.ts` - Common types
- `types/calendly.ts` - Calendly-specific types

## Architecture Decisions

1. **Next.js App Router** with `[locale]` for i18n
2. **Server Components by default**, opt-in to Client Components
3. **Redux for global state** (auth), React Query for server state
4. **shadcn/ui base** + custom `components/common/` extensions
5. **Zod for all validation** (forms, API responses)
6. **Framer Motion** for entrance animations only
7. **Lenis** for smooth scroll behavior
