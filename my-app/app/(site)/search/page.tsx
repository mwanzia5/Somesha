"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchForm } from "@/app/components/search-form";
import { SearchResultCard } from "@/app/components/cards";
import { EmptyState } from "@/app/components/video";
import { SearchIcon, VideoIcon } from "@/app/components/icons";
import { course } from "@/app/lib/mock";

type Result = {
  id: string;
  kind: "video" | "lesson";
  courseTitle: string;
  courseSlug: string;
  lessonLabel: string;
  lessonTitle: string;
  lessonSlug: string;
  description: string;
  keyPoints?: string[];
  clipLength?: string;
  match?: string;
  score: number;
  moduleTitle: string;
};

type SortId = "relevant" | "newest" | "duration";

function secondsToLabel(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function timeToSeconds(time: string): number {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}

function tokens(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word.length > 2);
}

function buildResults(query: string): Result[] {
  const terms = tokens(query);
  const results: Result[] = [];

  course.modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson, lessonIndex) => {
      const lessonLabel = `Lesson ${moduleIndex + 1}.${lessonIndex + 1}`;
      const title = lesson.title.toLowerCase();
      const description = lesson.description.toLowerCase();
      const keyPoints = lesson.keyPoints.map((point) => point.toLowerCase());

      const chapterMatches = lesson.chapters.map((chapter) => {
        const label = chapter.label.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (label.includes(term)) score = Math.max(score, 3);
        }
        return { chapter, score };
      });
      const bestChapter = chapterMatches.reduce(
        (best, current) => (current.score > best.score ? current : best),
        { chapter: lesson.chapters[0], score: 0 }
      );

      let lessonScore = 0;
      for (const term of terms) {
        if (title.includes(term)) lessonScore += 3;
        if (keyPoints.some((point) => point.includes(term))) lessonScore += 2;
        if (description.includes(term)) lessonScore += 1;
      }

      const videoScore = lessonScore + bestChapter.score;
      if (videoScore > 0) {
        const chapterIndex = lesson.chapters.indexOf(bestChapter.chapter);
        const next = lesson.chapters[chapterIndex + 1];
        const end = next
          ? timeToSeconds(next.time)
          : timeToSeconds(lesson.duration);
        const clipLength = secondsToLabel(end - timeToSeconds(bestChapter.chapter.time));
        const match = Math.min(99, 72 + videoScore * 6 + chapterIndex * 2);
        results.push({
          id: `video-${moduleIndex}-${lessonIndex}-${chapterIndex}`,
          kind: "video",
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonLabel,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          description: lesson.description,
          clipLength,
          match: `${match}% match`,
          score: videoScore,
          moduleTitle: module.title,
        });
      }

      if (lessonScore > 0) {
        results.push({
          id: `lesson-${moduleIndex}-${lessonIndex}`,
          kind: "lesson",
          courseTitle: course.title,
          courseSlug: course.slug,
          lessonLabel,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          description: lesson.description,
          keyPoints: lesson.keyPoints,
          score: lessonScore,
          moduleTitle: module.title,
        });
      }
    });
  });

  const seen = new Set<string>();
  return results.filter((result) => {
    if (result.kind === "video") return true;
    if (seen.has(result.lessonSlug)) return false;
    seen.add(result.lessonSlug);
    return true;
  });
}

function SearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") ?? "";
  const query = rawQuery || "authentication";
  const [sort, setSort] = useState<SortId>("relevant");

  const results = useMemo(() => buildResults(query), [query]);

  const sorted = useMemo(() => {
    const list = [...results];
    if (sort === "newest") {
      list.reverse();
    } else if (sort === "duration") {
      list.sort((a, b) => a.lessonTitle.localeCompare(b.lessonTitle));
    } else {
      list.sort((a, b) => b.score - a.score);
    }
    return list;
  }, [results, sort]);

  const courseCount = new Set(sorted.map((result) => result.courseSlug)).size;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 xl:px-14">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-h1 text-paper">Search</h1>
        <div className="max-w-2xl">
          <SearchForm
            placeholder="e.g. how does authentication work in next.js?"
            defaultValue={rawQuery}
          />
        </div>
        {query ? (
          <p className="text-body text-muted">
            {sorted.length > 0
              ? `Found ${sorted.length} result${sorted.length === 1 ? "" : "s"} across ${courseCount} course${courseCount === 1 ? "" : "s"} for “${query}”`
              : `No results for “${query}”`}
          </p>
        ) : null}
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-ink-soft px-3 py-1.5 text-body-sm text-paper">
            <VideoIcon width={14} height={14} className="text-accent" />
            {sorted.filter((result) => result.kind === "video").length} video moments
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-ink-soft px-3 py-1.5 text-body-sm text-paper">
            <SearchIcon width={14} height={14} className="text-primary" />
            {sorted.filter((result) => result.kind === "lesson").length} lessons
          </span>
        </div>
        <label className="flex items-center gap-3 text-body-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortId)}
            className="h-11 appearance-none rounded-lg border border-edge bg-ink-soft pl-4 pr-10 text-body text-paper transition-colors outline-none hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
          >
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest</option>
            <option value="duration">Duration</option>
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <div className="max-w-lg">
          <EmptyState
            icon={<SearchIcon width={22} height={22} />}
            title="No results found"
            description="Try different keywords, check your spelling."
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sorted.map((result) =>
            result.kind === "video" ? (
              <Link key={result.id} href={`/courses/${result.courseSlug}/lessons/${result.lessonSlug}?t=04:12`}>
                <SearchResultCard
                  title={result.lessonTitle}
                  course={`${result.courseTitle} · ${result.moduleTitle}`}
                  description={result.description}
                  lessonLabel={`${result.lessonLabel} · ${result.clipLength ?? ""}`}
                  match={result.match ?? ""}
                />
              </Link>
            ) : (
              <Link
                key={result.id}
                href={`/courses/${result.courseSlug}/lessons/${result.lessonSlug}`}
              >
                <article className="flex flex-col gap-3 rounded-2xl border border-edge bg-ink-soft p-6 transition-colors hover:border-muted">
                  <div className="flex items-center gap-2 text-body-sm text-muted">
                    <span className="font-medium text-accent">
                      {result.lessonLabel}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{result.courseTitle} · {result.moduleTitle}</span>
                  </div>
                  <h3 className="text-h3 text-paper">{result.lessonTitle}</h3>
                  <p className="text-body-sm leading-6 text-muted">
                    {result.description}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {(result.keyPoints ?? []).map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-edge bg-ink px-2.5 py-1 text-caption text-muted"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 xl:px-14">
          <p className="text-body text-muted">Searching…</p>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
