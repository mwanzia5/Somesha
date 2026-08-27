export type Level = "Beginner" | "Intermediate" | "Advanced";

export type CatalogEntry = {
  slug: string;
  title: string;
  summary: string;
  level: Level;
  rating: string;
  students: string;
  lessons: number;
  duration: string;
  price: string;
  popular?: boolean;
  instructor: string;
};

export type Chapter = { time: string; label: string };
export type Resource = {
  type: string;
  title: string;
  description: string;
  url: string;
};

export type Lesson = {
  slug: string;
  title: string;
  duration: string;
  freePreview?: boolean;
  description: string;
  keyPoints: string[];
  proTip?: string;
  resources: Resource[];
  chapters: Chapter[];
};

export type Module = {
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type OutcomeIcon = "zap" | "layers" | "chart" | "focus";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  level: Level;
  rating: string;
  students: string;
  price: string;
  instructor: { name: string; role: string; bio: string };
  outcomes: { icon: OutcomeIcon; title: string; description: string }[];
  modules: Module[];
};

const authChapters: Chapter[] = [
  { time: "00:00", label: "Intro" },
  { time: "04:12", label: "Configuration" },
  { time: "07:30", label: "Credentials Provider" },
  { time: "10:15", label: "Callbacks" },
  { time: "12:20", label: "Protecting Routes" },
  { time: "14:30", label: "Wrap Up" },
];

export const course: Course = {
  slug: "nextjs-14-from-zero-to-hero",
  title: "Next.js 14 From Zero to Hero",
  summary:
    "Build production-ready Next.js applications from the ground up — routing, layouts, data fetching, caching, and authentication.",
  level: "Intermediate",
  rating: "4.8",
  students: "12,480",
  price: "$89",
  instructor: {
    name: "Lee Robinson",
    role: "Head of Developer Experience",
    bio: "Lee has taught Next.js to over a million developers and writes about the App Router, data fetching, and the modern JavaScript ecosystem.",
  },
  outcomes: [
    {
      icon: "zap",
      title: "Ship fast, load faster",
      description: "Build pages that stream, cache, and prerender by default.",
    },
    {
      icon: "layers",
      title: "Master App Router",
      description: "File-based routing, layouts, and dynamic routes with confidence.",
    },
    {
      icon: "chart",
      title: "Fetch data the right way",
      description: "Server components, caching, and revalidation without the guesswork.",
    },
    {
      icon: "focus",
      title: "Authenticate users",
      description: "Wire NextAuth.js credentials auth and protect routes end to end.",
    },
  ],
  modules: [
    {
      title: "Getting Started",
      summary: "Spin up your first Next.js app and learn the project structure.",
      lessons: [
        {
          slug: "welcome-to-nextjs",
          title: "Welcome to Next.js",
          duration: "02:48",
          freePreview: true,
          description:
            "A tour of what you will build and how the App Router works.",
          keyPoints: [
            "Understand what the App Router is",
            "See the pieces of a Next.js application",
            "Set expectations for the rest of the course",
          ],
          resources: [
            {
              type: "Link",
              title: "App Router docs",
              description: "Official documentation for the App Router.",
              url: "https://nextjs.org/docs",
            },
          ],
          chapters: [
            { time: "00:00", label: "Welcome" },
            { time: "01:10", label: "What you'll build" },
            { time: "02:20", label: "Wrap Up" },
          ],
        },
        {
          slug: "project-structure",
          title: "Project Structure",
          duration: "05:12",
          description:
            "Walk through a real Next.js project and understand every folder.",
          keyPoints: [
            "Know the role of app, public, and components folders",
            "Read a layout and a page file",
            "Understand the config files",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:10", label: "The app directory" },
            { time: "04:00", label: "Config files" },
          ],
        },
        {
          slug: "your-first-page",
          title: "Your First Page",
          duration: "06:40",
          description:
            "Create a page, add a layout, and see hot reloading in action.",
          keyPoints: [
            "Create your first route",
            "Compose layouts",
            "Use the dev server",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "01:30", label: "Create a page" },
            { time: "04:20", label: "Add a layout" },
          ],
        },
      ],
    },
    {
      title: "Routing & Layouts",
      summary: "Master the file-system router and layout composition.",
      lessons: [
        {
          slug: "file-based-routing",
          title: "File-based Routing",
          duration: "08:20",
          description:
            "How the file system maps to URLs, including dynamic segments.",
          keyPoints: [
            "Map files to routes",
            "Use dynamic segments",
            "Generate params for static routes",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:00", label: "Route segments" },
            { time: "05:10", label: "Dynamic routes" },
          ],
        },
        {
          slug: "layouts-and-pages",
          title: "Layouts & Pages",
          duration: "07:05",
          description:
            "Nested layouts, templates, and how pages compose inside them.",
          keyPoints: [
            "Compose nested layouts",
            "Keep state with templates",
            "Pass params through segments",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "01:40", label: "Nested layouts" },
            { time: "04:50", label: "Templates" },
          ],
        },
        {
          slug: "dynamic-routes",
          title: "Dynamic Routes",
          duration: "09:33",
          description:
            "Catch-all and optional segments for real-world pages.",
          keyPoints: [
            "Use catch-all segments",
            "Generate static params",
            "Handle not-found states",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:30", label: "Catch-all segments" },
            { time: "06:00", label: "Static params" },
          ],
        },
      ],
    },
    {
      title: "Data Fetching and Caching",
      summary: "Fetch and cache data the App Router way.",
      lessons: [
        {
          slug: "server-components",
          title: "Server Components",
          duration: "10:12",
          description:
            "Why server components change how you fetch and render data.",
          keyPoints: [
            "Render on the server by default",
            "Fetch data in components",
            "Keep secrets on the server",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:00", label: "Server first" },
            { time: "06:30", label: "Fetching in components" },
          ],
        },
        {
          slug: "data-fetching-patterns",
          title: "Data Fetching Patterns",
          duration: "11:48",
          description:
            "Parallel, sequential, and streaming fetch patterns that matter.",
          keyPoints: [
            "Fetch in parallel with Promise.all",
            "Avoid waterfall requests",
            "Stream with Suspense",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:20", label: "Parallel fetch" },
            { time: "06:40", label: "Suspense boundaries" },
          ],
        },
        {
          slug: "caching-and-revalidation",
          title: "Caching & Revalidation",
          duration: "08:56",
          description:
            "Understand the full route cache and when data goes stale.",
          keyPoints: [
            "Know the four caching layers",
            "Revalidate with time and demand",
            "Opt out deliberately",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "01:50", label: "Cache layers" },
            { time: "05:00", label: "Revalidation" },
          ],
        },
        {
          slug: "streaming",
          title: "Streaming",
          duration: "06:21",
          description:
            "Render loading states and stream content progressively.",
          keyPoints: [
            "Add loading.tsx files",
            "Stream UI as data arrives",
            "Show skeletons",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:10", label: "Loading states" },
            { time: "04:40", label: "Streaming" },
          ],
        },
      ],
    },
    {
      title: "Styling & UI",
      summary: "Style with Tailwind, fonts, images, and client components.",
      lessons: [
        {
          slug: "tailwind-setup",
          title: "Tailwind CSS Setup",
          duration: "05:44",
          description:
            "Configure Tailwind and design tokens for your application.",
          keyPoints: [
            "Install Tailwind v4",
            "Define theme tokens",
            "Use utility classes",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "01:40", label: "Setup" },
            { time: "03:50", label: "Theme tokens" },
          ],
        },
        {
          slug: "fonts-and-images",
          title: "Fonts & Images",
          duration: "07:18",
          description:
            "Use next/font and next/image for fast, zero-CLS assets.",
          keyPoints: [
            "Load fonts with next/font",
            "Optimize images with next/image",
            "Avoid layout shift",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:00", label: "Fonts" },
            { time: "05:00", label: "Images" },
          ],
        },
        {
          slug: "client-components",
          title: "Client Components",
          duration: "06:52",
          description:
            "Draw the client boundary only where interactivity demands it.",
          keyPoints: [
            "Add the use client directive",
            "Keep most UI on the server",
            "Pass serializable props",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "01:30", label: "Client boundary" },
            { time: "04:20", label: "Composition" },
          ],
        },
      ],
    },
    {
      title: "Authentication with NextAuth.js",
      summary: "Add credentials-based auth and protect your routes.",
      lessons: [
        {
          slug: "authentication-in-nextauth",
          title: "Authentication in NextAuth.js",
          duration: "15:42",
          freePreview: true,
          description:
            "In this lesson we implement authentication using NextAuth.js credentials provider, then protect routes with middleware.",
          keyPoints: [
            "Install and configure NextAuth.js",
            "Set up a credentials provider",
            "Protect routes with middleware",
            "Persist session state",
          ],
          proTip:
            "Keep your NextAuth secret server-only and out of the client bundle.",
          resources: [
            {
              type: "Link",
              title: "NextAuth.js docs",
              description: "Official authentication for Next.js.",
              url: "https://next-auth.js.org",
            },
            {
              type: "Repo",
              title: "Course source code",
              description: "The completed authentication example.",
              url: "https://github.com",
            },
            {
              type: "Article",
              title: "Credentials provider guide",
              description: "Deep dive into credentials-based sessions.",
              url: "https://next-auth.js.org",
            },
          ],
          chapters: authChapters,
        },
        {
          slug: "credentials-provider",
          title: "Credentials Provider",
          duration: "13:05",
          description:
            "Wire username and password sign-in against your own database.",
          keyPoints: [
            "Validate credentials",
            "Return a stable session",
            "Handle failed sign-in",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:00", label: "Provider config" },
            { time: "08:10", label: "Validation" },
          ],
        },
        {
          slug: "protecting-routes",
          title: "Protecting Routes",
          duration: "11:20",
          description:
            "Gate pages with middleware and redirect unauthenticated users.",
          keyPoints: [
            "Use middleware matchers",
            "Redirect signed-out users",
            "Allowlist public routes",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:40", label: "Middleware" },
            { time: "08:30", label: "Redirects" },
          ],
        },
        {
          slug: "session-management",
          title: "Session Management",
          duration: "09:47",
          description:
            "Use the session in the browser, on the server, and in API routes.",
          keyPoints: [
            "Expose the session to the client",
            "Read it in server components",
            "Guard API routes",
          ],
          resources: [],
          chapters: [
            { time: "00:00", label: "Intro" },
            { time: "02:10", label: "Client session" },
            { time: "06:00", label: "Server guards" },
          ],
        },
      ],
    },
  ],
};

export const catalog: CatalogEntry[] = [
  {
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    level: course.level,
    rating: course.rating,
    students: course.students,
    lessons: course.modules.reduce((total, m) => total + m.lessons.length, 0),
    duration: "6h24m",
    price: course.price,
    popular: true,
    instructor: course.instructor.name,
  },
  {
    slug: "react-18-deep-dive",
    title: "React 18 Deep Dive",
    summary: "Concurrent rendering, transitions, and hooks mastery.",
    level: "Beginner",
    rating: "4.7",
    students: "9,315",
    lessons: 18,
    duration: "4h12m",
    price: "$59",
    popular: true,
    instructor: "Amelia Chen",
  },
  {
    slug: "typescript-masterclass",
    title: "TypeScript Masterclass",
    summary: "From strict types to generics and advanced inference.",
    level: "Intermediate",
    rating: "4.9",
    students: "15,020",
    lessons: 26,
    duration: "7h30m",
    price: "$79",
    popular: true,
    instructor: "Marcus Reid",
  },
  {
    slug: "modern-css-and-tailwind",
    title: "Modern CSS & Tailwind",
    summary: "Layouts, design tokens, and utility-first styling.",
    level: "Beginner",
    rating: "4.6",
    students: "6,842",
    lessons: 15,
    duration: "3h48m",
    price: "$49",
    instructor: "Sofia Rossi",
  },
  {
    slug: "full-stack-fundamentals",
    title: "Full-Stack Fundamentals",
    summary: "API design, databases, and deploying full apps.",
    level: "Intermediate",
    rating: "4.8",
    students: "11,204",
    lessons: 32,
    duration: "9h15m",
    price: "$99",
    instructor: "David Okafor",
  },
  {
    slug: "web-performance",
    title: "Web Performance",
    summary: "Core Web Vitals, caching, and rendering speed.",
    level: "Advanced",
    rating: "4.9",
    students: "5,930",
    lessons: 14,
    duration: "3h20m",
    price: "$69",
    instructor: "Elena Petrova",
  },
  {
    slug: "advanced-server-components",
    title: "Advanced Server Components",
    summary: "Streaming, cache invalidation, and RSC architecture.",
    level: "Advanced",
    rating: "4.8",
    students: "4,215",
    lessons: 20,
    duration: "5h40m",
    price: "$89",
    instructor: course.instructor.name,
  },
  {
    slug: "graphql-and-apis",
    title: "GraphQL & APIs",
    summary: "Schema design, resolvers, and client data fetching.",
    level: "Intermediate",
    rating: "4.5",
    students: "7,668",
    lessons: 22,
    duration: "6h05m",
    price: "$65",
    instructor: "Marcus Reid",
  },
];

export function formatMeta(courseEntry: CatalogEntry): string {
  return `${courseEntry.lessons} lessons · ${courseEntry.duration}`;
}

export type Instructor = {
  name: string;
  role: string;
  bio: string;
  courses: number;
  students: string;
  rating: string;
};

export const instructors: Instructor[] = [
  {
    name: "Lee Robinson",
    role: "Head of Developer Experience",
    bio: "Lee has taught Next.js to over a million developers and writes about the App Router, data fetching, and the modern JavaScript ecosystem.",
    courses: 2,
    students: "16,695",
    rating: "4.8",
  },
  {
    name: "Amelia Chen",
    role: "Frontend Engineer",
    bio: "Amelia builds design systems and teaches React, accessibility, and component architecture.",
    courses: 1,
    students: "9,315",
    rating: "4.7",
  },
  {
    name: "Marcus Reid",
    role: "Staff Engineer",
    bio: "Marcus works on developer tooling and teaches TypeScript, GraphQL, and API design.",
    courses: 2,
    students: "22,688",
    rating: "4.7",
  },
  {
    name: "Sofia Rossi",
    role: "Creative Technologist",
    bio: "Sofia specializes in modern CSS, motion, and expressive interface design.",
    courses: 1,
    students: "6,842",
    rating: "4.6",
  },
  {
    name: "David Okafor",
    role: "Full-Stack Consultant",
    bio: "David ships full applications and teaches databases, APIs, and deployment.",
    courses: 1,
    students: "11,204",
    rating: "4.8",
  },
  {
    name: "Elena Petrova",
    role: "Performance Engineer",
    bio: "Elena measures and optimizes Core Web Vitals for large-scale web products.",
    courses: 1,
    students: "5,930",
    rating: "4.9",
  },
];
