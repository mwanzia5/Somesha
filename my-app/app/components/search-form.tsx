"use client";

import { useRouter } from "next/navigation";
import { SearchBar } from "./search-bar";

export function SearchForm({
  placeholder,
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  return (
    <SearchBar
      placeholder={placeholder}
      defaultValue={defaultValue}
      onSearch={(value) => {
        if (!value) return;
        router.push(`/search?q=${encodeURIComponent(value)}`);
      }}
    />
  );
}
