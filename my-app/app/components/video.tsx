import type { ReactNode } from "react";
import {
  ClockIcon,
  ExpandIcon,
  ListIcon,
  PlayIcon,
  VolumeIcon,
} from "./icons";

export function VideoPlayer({
  title = "Authentication in NextAuth.js",
  chapters,
}: {
  title?: string;
  chapters?: { time: string; label: string; active?: boolean }[];
}) {
  const list = chapters ?? [
    { time: "00:00", label: "Intro" },
    { time: "04:12", label: "Configuration", active: true },
    { time: "07:30", label: "Credentials Provider" },
    { time: "10:15", label: "Callbacks" },
    { time: "12:20", label: "Protecting Routes" },
    { time: "14:30", label: "Wrap Up" },
  ];
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-edge bg-black">
        <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-navy via-ink to-surface-strong">
          <button
            type="button"
            aria-label="Play"
            className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg shadow-black/40 transition-transform hover:scale-105 hover:bg-primary"
          >
            <PlayIcon width={26} height={26} className="ml-1 text-primary-foreground" />
          </button>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-caption font-medium text-paper ring-1 ring-edge">
            <ListIcon width={12} height={12} className="text-primary" />
            Chapters
          </span>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4">
          <span className="h-1 w-full overflow-hidden rounded-full bg-surface-strong">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: "26%" }}
            />
          </span>
          <div className="flex items-center justify-between text-caption font-medium text-muted">
            <span>04:12 / 15:42</span>
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <VolumeIcon width={13} height={13} />
                1x
              </span>
              <ExpandIcon width={13} height={13} />
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-edge bg-ink-soft">
        <div className="border-b border-edge px-5 py-3 text-body-sm font-semibold text-paper">
          {title}
        </div>
        <ol className="flex flex-col">
          {list.map((chapter) => (
            <li key={chapter.label}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-surface ${
                  chapter.active ? "bg-surface" : ""
                }`}
              >
                <span
                  className={`inline-flex items-center gap-2 text-caption font-medium tabular-nums ${
                    chapter.active ? "text-primary" : "text-muted"
                  }`}
                >
                  <ClockIcon width={12} height={12} />
                  {chapter.time}
                </span>
                <span
                  className={`text-body-sm ${
                    chapter.active ? "font-medium text-paper" : "text-muted"
                  }`}
                >
                  {chapter.label}
                </span>
                {chapter.active ? (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                ) : null}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-edge bg-ink-soft px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface text-muted">
        {icon}
      </span>
      <h3 className="mt-1 text-h3 text-paper">{title}</h3>
      <p className="max-w-[28ch] text-body-sm leading-5 text-muted">
        {description}
      </p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
