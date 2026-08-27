import type { ComponentProps, FormEvent } from "react";
import { SearchIcon } from "./icons";

type SearchBarProps = ComponentProps<"input"> & {
  onSearch?: (value: string) => void;
};

export function SearchBar({
  onSearch,
  className = "",
  ...props
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get("search") ?? "").trim();
    onSearch?.(value);
  };

  return (
    <form
      className={`flex h-12 w-full items-center gap-3 rounded-full border border-edge bg-ink-soft px-5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 hover:border-muted ${className}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <SearchIcon className="shrink-0 text-primary" width={18} height={18} />
      <input
        type="search"
        name="search"
        className="h-full flex-1 bg-transparent text-body text-paper outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
    </form>
  );
}
