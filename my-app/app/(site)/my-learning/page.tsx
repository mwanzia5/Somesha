"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, ProgressBar, Tabs } from "@/app/components/data-display";
import { Button } from "@/app/components/button";
import { EmptyState } from "@/app/components/video";
import {
  BookmarkIcon,
  CheckIcon,
  VideoIcon,
} from "@/app/components/icons";
import { course } from "@/app/lib/mock";

type TabId = "progress" | "completed" | "wishlist";

const currentLesson = course.modules[4].lessons[0];

export default function MyLearningPage() {
  const [active, setActive] = useState<TabId>("progress");

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-h1 text-paper">My Learning</h1>
        <Tabs
          items={[
            { id: "progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
            { id: "wishlist", label: "Wishlist" },
          ]}
          active={active}
          onChange={(id) => setActive(id as TabId)}
        />
      </div>

      {active === "progress" ? (
        <div className="flex flex-col gap-5">
          <article className="flex flex-col gap-6 rounded-2xl border border-edge bg-ink-soft p-6 md:flex-row md:items-center">
            <div className="flex aspect-video shrink-0 items-center justify-center overflow-hidden rounded-xl border border-edge bg-gradient-to-br from-navy via-ink to-surface-strong md:w-56">
              <VideoIcon className="text-primary/70" width={36} height={36} />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="amber">In progress</Badge>
                <span className="text-body-sm text-muted">40% complete</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-h3 text-paper">{course.title}</span>
                <span className="text-body-sm text-muted">
                  {course.modules.length} modules · {course.modules[4].title}
                </span>
              </div>
              <ProgressBar value={40} />
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">
                  <CheckIcon width={15} height={15} />
                  Continue Learning
                </Button>
                <Link
                  href={`/courses/${course.slug}/lessons/${currentLesson.slug}`}
                  className="inline-flex h-9 items-center rounded-full px-4 text-body-sm font-semibold text-cream transition-colors hover:text-primary"
                >
                  Resume — {currentLesson.title}
                </Link>
              </div>
            </div>
          </article>
        </div>
      ) : null}

      {active === "completed" ? (
        <EmptyState
          icon={<CheckIcon width={22} height={22} />}
          title="No completed courses yet"
          description="Finish a course and your completed lessons will show up here."
          action={
            <Link href="/catalog" className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-body-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              Browse courses
            </Link>
          }
        />
      ) : null}

      {active === "wishlist" ? (
        <EmptyState
          icon={<BookmarkIcon width={22} height={22} />}
          title="Your wishlist is empty"
          description="Bookmark courses you want to learn next."
          action={
            <Link href="/catalog" className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-body-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
              Explore catalog
            </Link>
          }
        />
      ) : null}
    </div>
  );
}
