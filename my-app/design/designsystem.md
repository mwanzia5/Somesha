# Somesha Design System 1.0

Design System 1.0 · May 2024
Built with Next.js, Sanity, Clerk, PostHog and the Vercel AI SDK.

This document is the source of truth for the Somesha UI. The reference
specification lives in `design/design.png`. The implementation lives in
`app/components/` and the design tokens live in `app/globals.css` (Tailwind v4
`@theme`).

## Brand

Tagline: **LEARN ANYTHING. FIND EXACTLY WHAT YOU NEED.**

> Somesha is a learning platform where you can search in plain language and
> jump directly to the exact second where the answer is taught.

### Brand values

| Value            | Meaning                              |
| ---------------- | ------------------------------------ |
| Instant Answers  | Get to the exact moment you need.    |
| Clarity          | Clear content, clear experience.     |
| Focus            | Distraction-free learning.           |
| Progress         | Learn, track, grow.                  |

## Color tokens

Semantics and Tailwind classes:

| Token               | Hex       | Class                   | Usage                              |
| ------------------- | --------- | ----------------------- | ---------------------------------- |
| Primary (amber)     | `#F0B429` | `bg-primary`            | CTAs, active states, highlights    |
| Primary hover       | `#D99B16` | `bg-primary-hover`      | Button hover                       |
| Accent (green)      | `#2ECC71` | `bg-accent`             | Secondary accents, success marks   |
| Navy                | `#0E0A47` | `bg-navy`               | Deep gradient backgrounds          |
| Cream               | `#F5E6C8` | `bg-cream`              | Warm text accents, tertiary        |

Neutral scale (ink through paper):

| Token         | Hex       | Class           | Usage                |
| ------------- | --------- | --------------- | -------------------- |
| Ink           | `#0D0F0E` | `bg-ink`        | Page background      |
| Ink soft      | `#1A1C1A` | `bg-ink-soft`   | Cards, inputs        |
| Surface       | `#232523` | `bg-surface`    | Raised surfaces      |
| Surface strong| `#2F312F` | `bg-surface-strong` | Progress tracks, avatars |
| Edge          | `#3C3E3C` | `border-edge`   | Borders, dividers    |
| Muted         | `#5A5A5A` | `text-muted`    | Secondary text       |
| Paper         | `#F5F5F1` | `text-paper`    | Primary text         |

Semantic:

| Token    | Hex       | Class         |
| -------- | --------- | ------------- |
| Success  | `#27AE60` | `text-success` |
| Warning  | `#F1C40C` | `text-warning` |
| Error    | `#E74C3C` | `text-error`   |
| Info     | `#3498DB` | `text-info`    |
| Purple   | `#9B59B6` | `text-purple`  |

## Typography

Typeface: **Poppins** (weights 400–800). Loaded via `next/font/google` as
`--font-poppins`; the sans stack is the default `font-sans`.

| Style         | Size/Line | Weight   | Tailwind class  |
| ------------- | --------- | -------- | --------------- |
| Display 1     | 56/64     | Bold     | `text-display-1` |
| Display 2     | 40/48     | Bold     | `text-display-2` |
| Heading 1     | 32/40     | SemiBold | `text-h1`        |
| Heading 2     | 24/32     | SemiBold | `text-h2`        |
| Heading 3     | 20/28     | Medium   | `text-h3`        |
| Body Large    | 16/24     | Regular  | `text-body-lg`   |
| Body Medium   | 14/20     | Regular  | `text-body`      |
| Body Small    | 12/16     | Regular  | `text-body-sm`   |
| Caption       | 11/14     | Medium   | `text-caption`   |

## Iconography

- Style: **Line**
- Stroke: **2px**
- Corner: **Rounded** (round caps and joins)

Icons are inline SVG components in `app/components/icons.tsx` (`SearchIcon`,
`CloseIcon`, `PlayIcon`, `StarIcon`, `ClockIcon`, `BookIcon`, `UsersIcon`,
`SettingsIcon`, `BookmarkIcon`, `BellIcon`, etc.), inheriting `currentColor`.

## Spacing & shape

- Buttons, chips, badges, and inputs use **full pill** radius (`rounded-full`).
- Cards, panels, navs, and the player use `rounded-2xl`.
- Inputs, selects, checkboxes, and icons use `rounded-lg`.
- Base scale: 4px (Tailwind default); vertical rhythm of 16–20px in content blocks.

## Components

All components live in `app/components/`:

| Component           | File              | Variants / notes                                   |
| ------------------- | ----------------- | -------------------------------------------------- |
| `Logo`              | `logo.tsx`        | `size: sm | md | lg` — amber mark + green play glyph |
| `Button`            | `button.tsx`      | `primary` (amber), `secondary` (bordered), `tertiary` (text), `icon`; sizes `sm | md | lg` |
| `Input` / `Select`  | `form.tsx`        | Labeled fields, amber focus ring                    |
| `Checkbox` / `Radio`| `form.tsx`        | Custom controls, amber checked state                |
| `Badge`             | `data-display.tsx`| Tones: `green, amber, purple, blue, muted`          |
| `Chip`              | `data-display.tsx`| Tag pill with count + remove (×)                    |
| `ProgressBar`       | `data-display.tsx`| Tones `primary | accent`, optional `%` label        |
| `Tabs`              | `data-display.tsx`| Underline indicator, amber active                   |
| `SearchBar`         | `search-bar.tsx`  | Pill input, amber search icon                       |
| `CourseCard`        | `cards.tsx`       | Thumbnail, title, meta, instructor, rating          |
| `SearchResultCard`  | `cards.tsx`       | Thumbnail, course, description, lesson label, match |
| `TopNav`            | `nav.tsx`         | Logo + Courses / Instructors / My Learning + sign in |
| `SidebarNav`        | `nav.tsx`         | Search, Courses, Instructors, My Learning, Bookmarks, Settings |
| `VideoPlayer`       | `video.tsx`       | Player frame, scrubber, timestamp, chapter list     |
| `EmptyState`        | `video.tsx`       | Icon + title + description + action                 |

### Button examples

```tsx
<Button>Continue Learning</Button>
<Button variant="secondary"><PlusIcon /> Add to My Learning</Button>
<Button variant="tertiary">View Course</Button>
<Button variant="icon" aria-label="Settings"><SettingsIcon /></Button>
```

### Card examples

- **Course card**: thumbnail with duration chip, title (`Heading 3`), meta
  ("23 lessons · 6h24m"), instructor avatar + name, star rating.
- **Search result card**: thumbnail with play + `04:12`, course line, title,
  2-line description, footer with lesson label ("Lesson 2 · 04:12") and a
  `98% match` amber badge.

### States

- **Top navigation** (public): logo, Courses, Instructors, My Learning
  (active = amber underline), Sign in button.
- **Sidebar navigation** (learner): search-first with badge count, course,
  instructors, my learning, bookmarks, settings; active item = amber tint.
- **Empty states**:
  - Search: "No results found — try different keywords, check your spelling."
    → Clear filters (secondary).
  - Courses: "No courses yet — start learning by exploring our course catalog."
    → Browse courses (primary).
- **Video player UI**: chapters tab, scrubber at current position,
  `04:12 / 15:42` timestamp, `1x` speed, volume + fullscreen controls, and a
  chapter list with active chapter highlighted in amber.

## Usage notes

- Text is always light-on-dark: `text-paper` on `bg-ink`.
- Never invent a course, lesson, timestamp, price, or count in the UI —
  content comes from Sanity.
- Keep the browser free of tokens; only public PostHog/Clerk keys reach it.
