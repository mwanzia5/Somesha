import Link from "next/link";
import { SearchForm } from "@/app/components/search-form";

const popularTags = [
  "Node.js",
  "React",
  "TypeScript",
  "Authentication",
  "AI",
  "HTTP",
  "PostgreSQL",
];

const popularTopics = [
  {
    title: "Authentication in Next.js",
    chips: ["Server Components", "LocalStorage", "Best Practices"],
  },
  {
    title: "Building a Backend",
    chips: ["Server", "Database", "API"],
  },
  {
    title: "Making HTTP in React",
    chips: ["Next.js", "Node", "Axios"],
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.png')" }}>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-12">
        <div className="max-w-3xl">
          <h1 className="text-display-2 leading-[1.15] text-paper">
            Find what you want to learn.
            <br />
            <span className="text-primary underline decoration-primary underline-offset-8">
              Jump straight to the answer.
            </span>
          </h1>

          <div className="mt-10 max-w-2xl">
            <SearchForm placeholder="Ask AI and search learning content" />
          </div>

          <div className="mt-12">
            <h2 className="text-caption font-semibold uppercase tracking-[0.18em] text-muted">
              Popular tags
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full border border-edge bg-ink-soft px-4 py-2 text-body-sm text-muted transition-colors hover:border-muted hover:text-paper"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-caption font-semibold uppercase tracking-[0.18em] text-muted">
              Popular topics
            </h2>
            <ul className="mt-4 divide-y divide-edge">
              {popularTopics.map((topic) => (
                <li
                  key={topic.title}
                  className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between md:gap-6"
                >
                  <span className="text-body-lg font-semibold text-paper">
                    {topic.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {topic.chips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center rounded-full border border-edge bg-ink px-3 py-1.5 text-body-sm text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
