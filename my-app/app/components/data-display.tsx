import type { ReactNode } from "react";
import { CloseIcon } from "./icons";

type BadgeTone = "green" | "amber" | "purple" | "blue" | "muted";

const badgeTones: Record<BadgeTone, string> = {
  green: "bg-success/15 text-success ring-success/30",
  amber: "bg-primary/15 text-primary ring-primary/30",
  purple: "bg-purple/15 text-purple ring-purple/30",
  blue: "bg-info/15 text-info ring-info/30",
  muted: "bg-surface text-muted ring-edge",
};

export function Badge({
  tone = "muted",
  className = "",
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-semibold ring-1 ring-inset ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Chip({
  label,
  count,
  onRemove,
}: {
  label: string;
  count?: number;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-3 py-1.5 text-body-sm text-paper">
      {label}
      {count !== undefined ? (
        <span className="font-semibold text-primary">{count}</span>
      ) : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="text-muted transition-colors hover:text-error focus-visible:outline-none"
        >
          <CloseIcon width={13} height={13} />
        </button>
      ) : null}
    </span>
  );
}

export function ProgressBar({
  value,
  tone = "primary",
  showLabel = true,
  className = "",
}: {
  value: number;
  tone?: "primary" | "accent";
  showLabel?: boolean;
  className?: string;
}) {
  const fill =
    tone === "primary" ? "bg-primary" : "bg-accent";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-strong">
        <span
          className={`block h-full rounded-full ${fill}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </span>
      {showLabel ? (
        <span className="w-11 text-right text-caption font-medium text-muted">
          {value}%
        </span>
      ) : null}
    </div>
  );
}

export function Tabs({
  items,
  active,
  onChange,
}: {
  items: { id: string; label: string }[];
  active: string;
  onChange?: (id: string) => void;
}) {
  return (
    <div className="flex w-full items-center gap-6 border-b border-edge">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange?.(item.id)}
            className={`relative pb-3 text-body font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              isActive ? "text-primary" : "text-muted hover:text-paper"
            }`}
          >
            {item.label}
            {isActive ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
