import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "icon";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary",
  secondary:
    "border border-edge bg-ink-soft text-paper hover:border-muted hover:bg-surface focus-visible:outline-muted",
  tertiary: "text-cream hover:text-primary focus-visible:outline-primary",
  icon: "border border-edge bg-ink-soft text-paper hover:border-muted hover:bg-surface focus-visible:outline-muted",
};

const sizeClasses: Record<Variant, Record<Size, string>> = {
  primary: {
    sm: "h-9 px-4 text-body-sm gap-1.5",
    md: "h-11 px-5 text-body gap-2",
    lg: "h-12 px-6 text-body-lg gap-2",
  },
  secondary: {
    sm: "h-9 px-4 text-body-sm gap-1.5",
    md: "h-11 px-5 text-body gap-2",
    lg: "h-12 px-6 text-body-lg gap-2",
  },
  tertiary: {
    sm: "h-9 px-2 text-body-sm gap-1",
    md: "h-11 px-3 text-body gap-1.5",
    lg: "h-12 px-4 text-body-lg gap-2",
  },
  icon: {
    sm: "size-9",
    md: "size-11",
    lg: "size-12",
  },
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[variant][size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
