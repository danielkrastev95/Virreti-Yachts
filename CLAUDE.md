# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Virreti Yachts** - A luxury yacht visualization and configuration platform for the VIRRETI V20 OPEN model. Built with Next.js 16 App Router, focusing on premium aesthetics and real-time configuration with dynamic pricing.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS 4 (configured with custom Virreti brand colors)
- **Animations**: Framer Motion 12 (scroll effects, page transitions, step animations)
- **State Management**: Zustand 5 (configurator state with optimized selectors)
- **Icons**: Lucide React
- **TypeScript**: Strict mode enabled
- **React Compiler**: Enabled in `next.config.ts`

## Architecture

### State Management Pattern

The app uses Zustand for global state with a **single-store pattern** centered around the configurator. Key architectural decisions:

- **Optimized selectors**: Individual selector hooks (`useCurrentStep`, `useSelectedColor`, etc.) prevent unnecessary re-renders
- **Inline price calculations**: All selection actions calculate `subtotal`, `iva`, and `grandTotal` in a single `set()` call for atomic updates
- **No external price recalculation**: Prices are computed synchronously when selections change, stored in state
- **Persistence**: Configuration auto-saves to localStorage and can be shared via URL

See `src/store/configuratorStore.ts` for the complete implementation.

**Usage pattern:**
```tsx
// ✓ Optimized - only re-renders when currentStep changes
const currentStep = useCurrentStep();

// ✗ Avoid - causes re-render on ANY store change
const { currentStep } = useConfiguratorStore();
```

### Persistence & Caching

The configurator implements **dual persistence** for optimal UX:

1. **localStorage (auto-save)**: Configuration persists across page reloads
   - Uses Zustand's `persist` middleware
   - Only stores user selections (not computed prices)
   - Schema versioned (`_version: 1`) for future migrations
   - Hydration handled client-side to avoid SSR mismatches
   - Works silently in background with no UI indicators

2. **URL parameters (sharing)**: Users can share exact configurations
   - `generateShareURL()` creates shareable link with base64-encoded config
   - `loadFromURL()` restores configuration from URL on mount
   - URL config takes precedence over localStorage

**Reset behavior**: Clears both localStorage and URL parameters.

### Data Layer Architecture

All boat data, pricing, and configuration options are centralized in `src/data/boats.ts`:

- **Single model system**: Currently hardcoded to `VIRRETI V20 OPEN` (only boat)
- **Pricing structure**: Base price + color/engine/extras addons, 21% IVA calculated separately
- **Three overlay systems**:
  - **Hull colors**: Price variants (white is base, others +€400)
  - **Upholstery colors**: Visual overlays with PNG images (`/boat/tapiceria/*.png`)
  - **Floor colors**: Visual overlays with PNG images - **two images per option**:
    - `image`: Full boat overlay (`/boat/suelos/*.png`)
    - `referenceImage`: Thumbnail preview for selector UI (`/boat/suelos/referencias/*.png`)
- **Extras categorization**: Split into `exterior` and `electronics` categories

### Image Overlay System

The boat visualizer (`src/components/configurator/BoatVisualizer.tsx`) uses a **preload-all, toggle-visibility pattern**:

1. Base boat image (`/boat/barco_base.png`) is always visible
2. All upholstery overlays preloaded as stacked `<Image>` with `opacity-0` by default
3. All floor overlays preloaded as stacked `<Image>` with `opacity-0` by default
4. Selected options show via `opacity-100` transition (150ms)
5. Magnifier zoom feature with toggle button (Search icon)

**Why this pattern?** Eliminates flicker/delay when switching options. Trade-off is higher initial load, but smoother UX.

### Configurator Wizard Flow

Four-step wizard (1-indexed):

1. **Exterior** (Step 1): Hull color + upholstery + floor selection
2. **Motor** (Step 2): Engine selection (required for final pricing)
3. **Extras** (Step 3): Optional addons (multi-select)
4. **Resumen** (Step 4): Summary view with breakdown

Navigation managed by `currentStep` in Zustand store. Step animations handled by Framer Motion's `AnimatePresence` with spring transitions.

### Layout System

**Conditional layout rendering** via `LayoutWrapper`:

- Routes like `/configurator` are **fullscreen** (no Navbar/Footer)
- All other routes render with Navbar + Footer
- Pattern: `FULLSCREEN_ROUTES` array in `src/components/layout/LayoutWrapper.tsx`

### Auto-Rotating Gallery Pattern

The homepage seat showcase (`SeatShowcase` component) implements an **auto-rotating gallery**:

- 3 zones (Proa/Central/Popa), each with 3 configurations (A/B/C)
- Configurations auto-rotate every 3.5 seconds using `setInterval`
- Images cross-fade using stacked divs with opacity transitions (1000ms duration)
- Rotation resets to config A when zone changes
- All 9 images preloaded (3 configs × 3 zones), visibility toggled via opacity

**Pattern for similar features:**
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentConfig((prev) => (prev + 1) % totalConfigs);
  }, intervalMs);
  return () => clearInterval(interval);
}, [dependency]); // Reset on zone/context change
```

### Typography System

Premium brand identity with three font families (loaded via Next.js font optimization):

- **Bodoni Moda** (`--font-bodoni`): Display headlines, brand logo
- **Montserrat** (`--font-montserrat`): Section titles, uppercase labels
- **Inter** (`--font-inter`): Body text (fallback)
- **DM Sans**: Inline loaded for specific components (not in CSS variables)

Use `style={{ fontFamily: "'Bodoni Moda', serif" }}` for explicit inline font control.

### Color System

Monochromatic luxury palette in `tailwind.config.ts`:

- Primary brand colors: `virreti-black` (#000000), `virreti-white` (#FFFFFF)
- Grayscale: `virreti-gray-50` through `virreti-gray-900`
- Semantic colors: `primary`, `secondary`, `muted`, `accent` all map to black/white variants

**Design philosophy**: High contrast, minimal color, typography-driven elegance.

## Key File Locations

- **Pages**: `src/app/{page,about,contact,configurator}/page.tsx`
- **State**: `src/store/configuratorStore.ts` (single store)
- **Data**: `src/data/boats.ts` (pricing, specs, options)
- **Configurator Components**: `src/components/configurator/*.tsx`
- **Layout Components**: `src/components/layout/*.tsx`
- **Assets**:
  - Boat images: `public/boat/` (base, overlays, seat positions)
  - Logos/photos: `public/*.{png,jpg,webp}`
  - Fonts: `public/fonts/` (premium typefaces)

## Path Aliases

- `@/*` → `./src/*` (configured in `tsconfig.json`)

## Important Patterns

### Adding New Configuration Options

1. Update type definitions in `src/data/boats.ts`
2. Add data to appropriate array (colors, engines, extras)
3. Add selection action to `configuratorStore.ts`
4. Create step component or extend existing one
5. Update price calculation in `calculateSubtotal` helper if needed

### Adding New Overlay Images

1. Place PNG in `public/boat/{tapiceria|suelos}/`
2. For floor colors, also add thumbnail in `public/boat/suelos/referencias/`
3. Add entry to `upholsteryColors` or `floorColors` array with `image` path
4. Visualizer will automatically preload and toggle visibility

**Example for floor color:**
```tsx
{
  id: "new-floor",
  name: "New Floor Style",
  hex: "#HEXCODE",
  price: 0,
  image: "/boat/suelos/New-Floor.png",           // Full overlay
  referenceImage: "/boat/suelos/referencias/new-floor.png"  // Selector thumbnail
}
```

### Modifying Price Calculations

**CRITICAL**: IVA is 21% and calculated via `calculateIVA(subtotal)`. All price changes must:

1. Update base prices in `src/data/boats.ts`
2. Ensure `calculateSubtotal` helper includes new price components
3. Test that `subtotal`, `iva`, and `grandTotal` update atomically in store

### Animation Guidelines

Use Framer Motion with these patterns:

- **Scroll animations**: `useScroll` + `useTransform` for parallax effects
- **Page transitions**: `AnimatePresence` with `mode="wait"`
- **Micro-interactions**: `whileHover`, `whileTap` for buttons/cards
- **Spring physics**: `type: "spring"` with `stiffness: 300, damping: 30` for step transitions

## ESLint Configuration

Uses Next.js built-in config (`eslint-config-next/core-web-vitals` + `typescript`). Ignores:

- `.next/**`
- `out/**`
- `build/**`
- `next-env.d.ts`

## Component Patterns

### Client Components

Most components require `"use client"` directive due to:
- Zustand hooks for state management
- Framer Motion animations (`useScroll`, `useTransform`, `AnimatePresence`)
- Interactive hooks (`useState`, `useEffect`, event handlers)

**Only server components**: Static pages without interactivity. Most of this app is client-rendered.

### Image Optimization

Use Next.js `<Image>` component consistently:
```tsx
<Image
  src="/path/to/image.png"
  alt="Description"
  fill  // For absolute positioned containers
  className="object-contain"  // or object-cover
  priority  // For above-the-fold images
/>
```

- **Priority flag**: Used on base boat image and first overlay for immediate load
- **Fill layout**: Used for all configurator overlays (absolute positioning with `inset-0`)
- **Object-fit**: `contain` for boat visualizer (maintain aspect), `cover` for hero images

## Common Gotchas

- **Font loading**: DM Sans is loaded inline in some components instead of via CSS variables (inconsistent pattern)
- **Image paths**: All boat images must be in `public/` directory (Next.js limitation)
- **Disabled extras**: Items with `disabled: true` show "Consultar" and are not toggleable
- **Step validation**: No validation on step progression - users can navigate freely
- **Mobile responsiveness**: Configurator uses flex-col/flex-row breakpoints at `lg:` for side-by-side layout
- **Client directive**: Forget `"use client"` and you'll get hydration errors with Zustand/Framer Motion

## Asset Organization

```
public/
├── boat/
│   ├── barco_base.png (base boat image)
│   ├── tapiceria/ (upholstery overlays)
│   ├── suelos/ (floor overlays)
│   │   └── referencias/ (preview thumbnails)
│   └── posiciones_Asientos/ (seat configuration renders)
├── fonts/ (premium typefaces)
└── *.{png,jpg,webp} (hero images, logos)
```

## Testing Considerations

No test framework is currently configured. When adding tests:

- Use Jest + React Testing Library for component tests
- Test configurator state transitions with Zustand's store methods
- Mock Framer Motion animations (`jest-mock-framer-motion`)
- Test price calculations with various option combinations
