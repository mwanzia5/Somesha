import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/app/components/data-display";
import { Button } from "@/app/components/button";
import {
  ChartIcon,
  ClockIcon,
  FocusIcon,
  LayersIcon,
  PlayIcon,
  PlusIcon,
  StarIcon,
  VideoIcon,
  ZapIcon,
  type IconProps,
} from "@/app/components/icons";
import { course, catalog, type OutcomeIcon } from "@/app/lib/mock";

const outcomeIcons: Record<OutcomeIcon, (props: IconProps) => React.ReactNode> = {
  zap: ZapIcon,
  layers: LayersIcon,
  chart: ChartIcon,
  focus: FocusIcon,
};

const levelTone = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "purple",
} as const;

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = catalog.find((item) => item.slug === slug);
  if (!entry) notFound();

  const full = slug === course.slug ? course : null;

  const lessonCount = full
    ? full.modules.reduce((total, module) => total + module.lessons.length, 0)
    : entry.lessons;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 xl:px-14">
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-muted">
        <Link href="/catalog" className="transition-colors hover:text-paper">
          Courses
        </Link>
        <span aria-hidden>·</span>
        <span className="text-paper">{entry.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={levelTone[entry.level]}>{entry.level}</Badge>
            <span className="inline-flex items-center gap-1 text-body-sm font-medium text-cream">
              <StarIcon className="text-primary" width={14} height={14} />
              {entry.rating}
            </span>
            <span className="text-body-sm text-muted">
              {entry.students} students
            </span>
            {entry.popular ? <Badge tone="amber">Popular</Badge> : null}
          </div>
          <h1 className="text-display-2 leading-[1.15] text-paper">
            {entry.title}
          </h1>
          <p className="max-w-2xl text-body-lg leading-7 text-muted">
            {entry.summary}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-body-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <VideoIcon width={15} height={15} className="text-accent" />
              {lessonCount} lessons
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon width={15} height={15} className="text-primary" />
              {entry.duration}
            </span>
            <span aria-hidden>·</span>
            <span>{entry.price}</span>
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-edge bg-ink-soft p-5">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-edge bg-gradient-to-br from-navy via-ink to-surface-strong">
            <VideoIcon className="text-primary/70" width={48} height={48} />
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-surface-strong text-body-sm font-semibold text-cream">
              {entry.instructor
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div className="flex flex-col">
              <span className="text-body font-medium text-paper">
                {entry.instructor}
              </span>
              <span className="text-caption text-muted">
                {full?.instructor.role ?? "Instructor"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Button size="lg">
              {full
                ? `Continue Learning — Lesson ${full.modules[0].lessons.length}`
                : "Continue Learning"}
            </Button>
            <Button variant="secondary" size="lg">
              <PlusIcon width={18} height={18} />
              Add to My Learning
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-caption text-muted">
              <span>Your progress</span>
              <span>40%</span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-surface-strong">
              <span className="block h-full w-[40%] rounded-full bg-primary" />
            </span>
          </div>
        </aside>
      </div>

      {full ? (
        <>
          <section className="mt-14">
            <h2 className="mb-6 text-h2 text-paper">What you&apos;ll learn</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {full.outcomes.map((outcome) => {
                const Icon = outcomeIcons[outcome.icon];
                return (
                  <div
                    key={outcome.title}
                    className="flex gap-3.5 rounded-2xl border border-edge bg-ink-soft p-5"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-primary">
                      <Icon width={18} height={18} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-body font-semibold text-paper">
                        {outcome.title}
                      </span>
                      <span className="text-body-sm text-muted">
                        {outcome.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="mb-2 text-h2 text-paper">Curriculum</h2>
            <p className="mb-6 text-body text-muted">
              {lessonCount} lessons across {full.modules.length} modules
            </p>
            <div className="flex flex-col gap-4">
              {full.modules.map((module, moduleIndex) => (
                <div
                  key={module.title}
                  className="overflow-hidden rounded-2xl border border-edge bg-ink-soft"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-edge px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-caption font-semibold uppercase tracking-wider text-primary">
                        Module {moduleIndex + 1}
                      </span>
                      <span className="text-h3 text-paper">{module.title}</span>
                      <span className="text-body-sm text-muted">
                        {module.summary}
                      </span>
                    </div>
                    <span className="shrink-0 text-caption text-muted">
                      {module.lessons.length} lessons
                    </span>
                  </div>
                  <ol className="flex flex-col">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/courses/${full.slug}/lessons/${lesson.slug}`}
                          className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface"
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-edge bg-ink text-caption font-semibold text-muted">
                            {moduleIndex + 1}.{lessonIndex + 1}
                          </span>
                          <span className="flex-1 text-body font-medium text-paper">
                            {lesson.title}
                          </span>
                          {lesson.freePreview ? (
                            <Badge tone="green">Free preview</Badge>
                          ) : null}
                          <span className="inline-flex items-center gap-1.5 text-body-sm tabular-nums text-muted">
                            <PlayIcon width={13} height={13} className="text-accent" />
                            {lesson.duration}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 flex flex-col gap-4 rounded-2xl border border-edge bg-ink-soft p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-surface-strong text-body font-semibold text-cream">
                {full.instructor.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-h3 text-paper">
                  {full.instructor.name}
                </span>
                <span className="text-body-sm text-muted">
                  {full.instructor.role}
                </span>
              </div>
            </div>
            <p className="max-w-xl text-body-sm leading-6 text-muted">
              {full.instructor.bio}
            </p>
          </section>
        </>
      ) : (
        <section className="mt-14 rounded-2xl border border-dashed border-edge bg-ink-soft px-6 py-12 text-center">
          <h2 className="text-h3 text-paper">Curriculum coming soon</h2>
          <p className="mx-auto mt-1 max-w-md text-body-sm text-muted">
            Full modules and lessons for this course are being prepared.
          </p>
        </section>
      )}
    </div>
  );
}
