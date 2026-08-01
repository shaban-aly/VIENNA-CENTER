import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

const SEARCH_DEBOUNCE_MS = 1000;

export function useSearch(debounceMs = SEARCH_DEBOUNCE_MS) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, debounceMs);
  const isSearching = query !== debouncedQuery;

  return {
    query,
    debouncedQuery,
    isSearching,
    setQuery,
  };
}
