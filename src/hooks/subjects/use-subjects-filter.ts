import { useMemo } from "react";
import { useSearch } from "@/hooks/use-search";
import { normalizeArabicText } from "@/lib/utils";
import type { Subject } from "@/types/content";

export function useSubjectsFilter(subjects: Subject[]) {
  const { query, debouncedQuery, isSearching, setQuery } = useSearch();

  const filteredSubjects = useMemo(() => {
    const normalizedQuery = normalizeArabicText(debouncedQuery.trim());

    if (!normalizedQuery) {
      return subjects;
    }

    return subjects.filter((subject) => {
      const searchableText = normalizeArabicText(
        [subject.name, subject.description, ...subject.grades].join(" "),
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [subjects, debouncedQuery]);

  return {
    query,
    debouncedQuery,
    isSearching,
    setQuery,
    filteredSubjects,
  };
}
