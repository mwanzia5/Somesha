import { PlayIcon } from "./icons";

export function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const mark = size === "lg" ? 34 : size === "md" ? 28 : 24;
  const text = size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-lg";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground"
        style={{ width: mark, height: mark }}
      >
        <PlayIcon
          width={mark * 0.55}
          height={mark * 0.55}
          className="text-accent"
        />
      </span>
      <span className={`font-bold tracking-tight ${text}`}>Somesha</span>
    </span>
  );
}
