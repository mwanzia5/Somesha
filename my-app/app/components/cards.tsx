import type { ReactNode } from "react";
import { ClockIcon, PlayIcon, StarIcon, VideoIcon } from "./icons";

export function CourseCard({
  title,
  meta,
  instructor,
  rating,
  action,
}: {
  title: string;
  meta: string;
  instructor: string;
  rating: string;
  action?: ReactNode;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-ink-soft transition-colors hover:border-muted">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-ink-soft to-surface-strong">
        <div className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60" />
        <VideoIcon className="relative text-primary/70" width={44} height={44} />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2 py-0.5 text-caption font-medium text-paper ring-1 ring-edge">
          <ClockIcon width={11} height={11} className="text-primary" />
          {meta.split("·")[0].trim()}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-h3 text-paper">{title}</h3>
        <p className="text-body-sm text-muted">{meta}</p>
        <div className="flex items-center justify-between border-t border-edge pt-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-surface-strong text-caption font-semibold text-cream">
              {instructor
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <span className="text-body-sm text-paper">{instructor}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-body-sm font-medium text-cream">
            <StarIcon className="text-primary" width={14} height={14} />
            {rating}
          </span>
        </div>
        {action}
      </div>
    </article>
  );
}

export function SearchResultCard({
  title,
  course,
  description,
  lessonLabel,
  match,
}: {
  title: string;
  course: string;
  description: string;
  lessonLabel: string;
  match: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-ink-soft transition-colors hover:border-muted">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-ink-soft to-surface-strong">
        <PlayIcon
          className="text-primary/80 transition-transform group-hover:scale-110"
          width={46}
          height={46}
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2 py-0.5 text-caption font-medium text-paper ring-1 ring-edge">
          <PlayIcon width={10} height={10} className="text-accent" />
          04:12
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-body-sm text-muted">
          <VideoIcon width={14} height={14} className="text-accent" />
          {course}
        </div>
        <h3 className="text-h3 text-paper">{title}</h3>
        <p className="line-clamp-2 text-body-sm leading-6 text-muted">
          {description}
        </p>
        <div className="mt-1 flex items-center justify-between border-t border-edge pt-3">
          <span className="text-body-sm font-medium text-paper">
            {lessonLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-caption font-semibold text-primary ring-1 ring-inset ring-primary/30">
            {match}
          </span>
        </div>
      </div>
    </article>
  );
}
