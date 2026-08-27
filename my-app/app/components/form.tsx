import type { ComponentProps, ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "./icons";

function Field({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-paper"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name ?? "input";
  const input = (
    <input
      id={inputId}
      className={`h-11 w-full rounded-lg border border-edge bg-ink-soft px-4 text-body text-paper transition-colors outline-none placeholder:text-muted hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <Field label={label} id={inputId} hint={hint}>
      {input}
    </Field>
  );
}

type SelectProps = ComponentProps<"select"> & {
  label?: string;
  hint?: string;
};

export function Select({ label, hint, id, className = "", children, ...props }: SelectProps) {
  const selectId = id ?? props.name ?? "select";
  const select = (
    <span className="relative block">
      <select
        id={selectId}
        className={`h-11 w-full appearance-none rounded-lg border border-edge bg-ink-soft px-4 pr-10 text-body text-paper transition-colors outline-none hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
    </span>
  );
  if (!label) return select;
  return (
    <Field label={label} id={selectId} hint={hint}>
      {select}
    </Field>
  );
}

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label?: ReactNode;
};

export function Checkbox({ label, id, className = "", ...props }: CheckboxProps) {
  const checkboxId = id ?? props.name;
  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex cursor-pointer items-center gap-3 ${className}`}
    >
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          className="peer size-5 cursor-pointer appearance-none rounded-[5px] border border-edge bg-ink-soft transition-colors hover:border-muted checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          {...props}
        />
        <CheckIcon className="pointer-events-none absolute hidden size-3.5 text-primary-foreground peer-checked:block" />
      </span>
      {label ? (
        <span className="text-body text-paper">{label}</span>
      ) : null}
    </label>
  );
}

type RadioProps = Omit<ComponentProps<"input">, "type"> & {
  label?: ReactNode;
};

export function Radio({ label, id, className = "", ...props }: RadioProps) {
  const radioId = id ?? props.name;
  return (
    <label
      htmlFor={radioId}
      className={`inline-flex cursor-pointer items-center gap-3 ${className}`}
    >
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          type="radio"
          id={radioId}
          className="peer size-5 cursor-pointer appearance-none rounded-full border border-edge bg-ink-soft transition-colors hover:border-muted checked:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          {...props}
        />
        <span className="pointer-events-none absolute size-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100" />
      </span>
      {label ? (
        <span className="text-body text-paper">{label}</span>
      ) : null}
    </label>
  );
}
