import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/app/components/data-display";
import { VideoPlayer } from "@/app/components/video";
import { LessonTabs } from "@/app/components/lesson-tabs";
import {
  CheckIcon,
  ClockIcon,
  LightbulbIcon,
  LinkIcon,
  PlayIcon,
} from "@/app/components/icons";
import { course } from "@/app/lib/mock";

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const { t } = await searchParams;

  if (slug !== course.slug) notFound();

  const moduleIndex = course.modules.findIndex((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.slug === lessonSlug)
  );
  if (moduleIndex === -1) notFound();
  const courseModule = course.modules[moduleIndex];
  const lessonIndex = courseModule.lessons.findIndex(
    (lesson) => lesson.slug === lessonSlug
  );
  const lesson = courseModule.lessons[lessonIndex];

  const lessonLabel = `Lesson ${moduleIndex + 1}.${lessonIndex + 1}`;
  const prevLesson = lessonIndex > 0 ? courseModule.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < courseModule.lessons.length - 1
      ? courseModule.lessons[lessonIndex + 1]
      : null;

  return (
    <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_360px] xl:px-14">
      <div className="flex min-w-0 flex-col gap-6">
        <nav className="flex items-center gap-2 text-body-sm text-muted">
          <Link href="/catalog" className="transition-colors hover:text-paper">
            Courses
          </Link>
          <span aria-hidden>·</span>
          <Link
            href={`/courses/${course.slug}`}
            className="transition-colors hover:text-paper"
          >
            {course.title}
          </Link>
          <span aria-hidden>·</span>
          <span className="truncate text-paper">{lesson.title}</span>
        </nav>

        {t ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-edge bg-ink-soft px-3 py-1 text-caption font-medium text-muted">
            <PlayIcon width={11} height={11} className="text-accent" />
            Playing from {t}
          </span>
        ) : null}

        <VideoPlayer
          title={lesson.title}
          chapters={lesson.chapters.map((chapter) => ({
            ...chapter,
            active: t ? chapter.time === t : chapter.time === "04:12",
          }))}
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">{lessonLabel}</Badge>
            <span className="inline-flex items-center gap-1.5 text-body-sm text-muted">
              <ClockIcon width={14} height={14} className="text-primary" />
              {lesson.duration}
            </span>
            {lesson.freePreview ? <Badge tone="green">Free preview</Badge> : null}
          </div>
          <h1 className="text-h1 text-paper">{lesson.title}</h1>
          <p className="text-body-lg leading-7 text-muted">
            {lesson.description}
          </p>
        </div>

        <LessonTabs
          overview={
            <div className="flex flex-col gap-8">
              <section>
                <h2 className="mb-4 text-h3 text-paper">
                  In this lesson you will
                </h2>
                <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {lesson.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 rounded-xl border border-edge bg-ink-soft px-4 py-3"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <CheckIcon width={12} height={12} />
                      </span>
                      <span className="text-body text-paper">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {lesson.proTip ? (
                <aside className="flex gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-5">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <LightbulbIcon width={17} height={17} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-caption font-semibold uppercase tracking-wider text-primary">
                      Pro tip
                    </span>
                    <p className="text-body text-paper">{lesson.proTip}</p>
                  </div>
                </aside>
              ) : null}
            </div>
          }
          notes={
            <div className="flex flex-col gap-4 rounded-2xl border border-edge bg-ink-soft p-6">
              <p className="text-body leading-7 text-paper">
                In this lesson we implement authentication using NextAuth.js. We
                configure the provider, add credentials sign-in, and protect
                routes with middleware. The session is available in both client
                and server components.
              </p>
              <p className="text-body leading-7 text-muted">
                Follow the chapter list in the player to jump straight to
                configuration, the credentials provider, callbacks, or
                protecting routes. Each timestamped section maps to the notes
                above.
              </p>
              <p className="text-body leading-7 text-muted">
                A complete, runnable example is included in the resources tab.
              </p>
            </div>
          }
          resources={
            <ul className="flex flex-col gap-3">
              {lesson.resources.map((resource) => (
                <li
                  key={resource.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-edge bg-ink-soft p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-primary">
                    <LinkIcon width={17} height={17} />
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-body font-semibold text-paper">
                        {resource.title}
                      </span>
                      <Badge tone="muted">{resource.type}</Badge>
                    </div>
                    <p className="text-body-sm text-muted">
                      {resource.description}
                    </p>
                  </div>
                </li>
              ))}
              {lesson.resources.length === 0 ? (
                <li className="text-body-sm text-muted">
                  No additional resources for this lesson.
                </li>
              ) : null}
            </ul>
          }
        />
      </div>

      <aside className="flex flex-col gap-6">
        <div className="rounded-2xl border border-edge bg-ink-soft">
          <div className="border-b border-edge px-5 py-4">
            <span className="text-caption font-semibold uppercase tracking-wider text-primary">
              Module {moduleIndex + 1}
            </span>
            <h2 className="mt-0.5 text-body font-semibold text-paper">
              {courseModule.title}
            </h2>
          </div>
          <ol className="flex flex-col">
            {courseModule.lessons.map((item, index) => (
              <li key={item.slug}>
                <Link
                  href={`/courses/${course.slug}/lessons/${item.slug}`}
                  className={`flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface ${
                    item.slug === lesson.slug ? "bg-surface" : ""
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-caption font-semibold ${
                      item.slug === lesson.slug
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-edge text-muted"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`flex-1 text-body-sm ${
                      item.slug === lesson.slug
                        ? "font-medium text-paper"
                        : "text-muted"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="text-caption tabular-nums text-muted">
                    {item.duration}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-edge bg-ink-soft p-5">
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-caption text-muted">
              <span>Module progress</span>
              <span>
                {Math.round(((lessonIndex + 1) / courseModule.lessons.length) * 100)}%
              </span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-surface-strong">
              <span
                className="block h-full rounded-full bg-primary"
                style={{
                  width: `${Math.round(
                    ((lessonIndex + 1) / courseModule.lessons.length) * 100
                  )}%`,
                }}
              />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {prevLesson ? (
              <Link
                href={`/courses/${course.slug}/lessons/${prevLesson.slug}`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-edge bg-ink-soft px-4 text-body-sm font-semibold text-paper transition-colors hover:border-muted"
              >
                Previous
              </Link>
            ) : (
              <span
                aria-hidden
                className="inline-flex h-11 items-center justify-center rounded-full border border-edge px-4 text-body-sm font-semibold text-muted opacity-50"
              >
                Previous
              </span>
            )}
            {nextLesson ? (
              <Link
                href={`/courses/${course.slug}/lessons/${nextLesson.slug}`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-4 text-body-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Next
              </Link>
            ) : (
              <span
                aria-hidden
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary/50 px-4 text-body-sm font-semibold text-primary-foreground"
              >
                Complete
              </span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
