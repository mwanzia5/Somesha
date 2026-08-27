"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Chip } from "@/app/components/data-display";
import { CourseCard } from "@/app/components/cards";
import { CatalogEntry, catalog, type Level } from "@/app/lib/mock";

const levelTone: Record<Level, "green" | "amber" | "purple"> = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "purple",
};

const levelChips: Level[] = ["Beginner", "Intermediate", "Advanced"];

type SortId = "relevant" | "newest" | "rating";

export default function CatalogPage() {
  const [removed, setRemoved] = useState<Level[]>([]);
  const [sort, setSort] = useState<SortId>("relevant");

  const activeLevels = levelChips.filter((level) => !removed.includes(level));

  const filtered = useMemo(() => {
    const list = catalog.filter((entry) => activeLevels.includes(entry.level));
    const sorted = [...list];
    if (sort === "rating") {
      sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sort === "newest") {
      sorted.reverse();
    }
    return sorted;
  }, [activeLevels, sort]);

  const countByLevel = (level: Level) =>
    catalog.filter((entry) => entry.level === level).length;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 xl:px-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 text-paper">All Courses</h1>
          <p className="text-body text-muted">
            {filtered.length} course{filtered.length === 1 ? "" : "s"} available
          </p>
        </div>
        <label className="flex items-center gap-3 text-body-sm text-muted">
          Sort
          <span className="relative block">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="h-11 appearance-none rounded-lg border border-edge bg-ink-soft pl-4 pr-10 text-body text-paper transition-colors outline-none hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
            >
              <option value="relevant">Most relevant</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest rated</option>
            </select>
          </span>
        </label>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-caption font-semibold uppercase tracking-wider text-muted">
          Filters
        </span>
        {levelChips.map((level) => (
          <Chip
            key={level}
            label={level}
            count={countByLevel(level)}
            onRemove={
              removed.includes(level)
                ? undefined
                : () => setRemoved((prev) => [...prev, level])
            }
          />
        ))}
        {removed.length > 0 ? (
          <button
            type="button"
            onClick={() => setRemoved([])}
            className="ml-1 text-body-sm font-medium text-cream transition-colors hover:text-primary"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((entry) => (
          <CatalogCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function CatalogCard({ entry }: { entry: CatalogEntry }) {
  return (
    <Link href={`/courses/${entry.slug}`} className="group">
      <div className="relative">
        <CourseCard
          title={entry.title}
          meta={`${entry.lessons} lessons · ${entry.duration}`}
          instructor={entry.instructor}
          rating={entry.rating}
        />
        <span className="absolute right-3 top-3 z-10">
          <Badge tone={levelTone[entry.level]}>{entry.level}</Badge>
        </span>
      </div>
    </Link>
  );
}
