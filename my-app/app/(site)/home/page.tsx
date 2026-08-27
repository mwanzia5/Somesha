import Link from "next/link";
import { CourseCard } from "@/app/components/cards";
import { SearchForm } from "@/app/components/search-form";
import {
  ChartIcon,
  FocusIcon,
  TargetIcon,
  ZapIcon,
} from "@/app/components/icons";
import { catalog, course } from "@/app/lib/mock";

export default function HomePage() {
  const featured = catalog.filter((entry) => entry.popular).slice(0, 3);
  const values = [
    {
      icon: <ZapIcon width={20} height={20} className="text-primary" />,
      title: "Instant Answers",
      body: "Get to the exact moment you need.",
    },
    {
      icon: <FocusIcon width={20} height={20} className="text-primary" />,
      title: "Clarity",
      body: "Clear content, clear experience.",
    },
    {
      icon: <TargetIcon width={20} height={20} className="text-primary" />,
      title: "Focus",
      body: "Distraction-free learning.",
    },
    {
      icon: <ChartIcon width={20} height={20} className="text-primary" />,
      title: "Progress",
      body: "Learn, track, grow.",
    },
  ];

  return (
    <div>
      <section className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 md:px-10 md:py-24 xl:grid-cols-[1.1fr_0.9fr] xl:items-center xl:px-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-edge bg-ink-soft px-3 py-1 text-caption font-medium text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              Somesha · Design System 1.0
            </span>
            <h1 className="text-display-1 leading-[1.08] text-paper">
              LEARN ANYTHING.{" "}
              <span className="text-primary">FIND EXACTLY WHAT YOU NEED.</span>
            </h1>
            <p className="max-w-xl text-body-lg leading-7 text-muted">
              Somesha is a learning platform where you can search in plain
              language and jump directly to the exact second where the answer
              is taught.
            </p>
          </div>
          <div className="max-w-xl">
            <SearchForm placeholder="e.g. how does authentication work in next.js?" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["Next.js 9", "React 8", "TypeScript 7"].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-ink-soft px-3 py-1.5 text-body-sm text-muted transition-colors hover:border-muted hover:text-paper"
              >
                {tag.replace(/\s\d+$/, "")}
                <span className="font-semibold text-primary">
                  {tag.split(" ").at(-1)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3 rounded-2xl border border-edge bg-ink-soft p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-surface text-primary">
                {value.icon}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-body font-semibold text-paper">
                  {value.title}
                </span>
                <span className="text-body-sm text-muted">{value.body}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 xl:px-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-h2 text-paper">Featured courses</h2>
            <p className="text-body text-muted">
              {featured.length} popular courses to start with
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-cream transition-colors hover:text-primary"
          >
            Browse all courses
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((entry) => (
            <Link key={entry.slug} href={`/courses/${entry.slug}`}>
              <CourseCard
                title={entry.title}
                meta={`${entry.lessons} lessons · ${entry.duration}`}
                instructor={entry.instructor}
                rating={entry.rating}
              />
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-edge bg-gradient-to-r from-navy/40 to-ink-soft px-6 py-10 text-center">
          <h3 className="text-h3 text-paper">
            New to {course.title}?
          </h3>
          <p className="max-w-md text-body-sm text-muted">
            Jump straight to the answer. Search across every lesson, module,
            and transcript — and play the exact moment.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              View course
            </Link>
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center rounded-full border border-edge bg-ink-soft px-5 text-body font-semibold text-paper transition-colors hover:border-muted"
            >
              Search lessons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
