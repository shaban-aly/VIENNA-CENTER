import { useMemo } from "react";
import { teacherSubjectNames } from "@/lib/teachers";
import { useSearch } from "@/hooks/use-search";
import { normalizeArabicText } from "@/lib/utils";
import type { Teacher } from "@/types/content";

export function useTeachersFilter(teachers: Teacher[]) {
  const { query, debouncedQuery, isSearching, setQuery } = useSearch();

  const filteredTeachers = useMemo(() => {
    const normalizedQuery = normalizeArabicText(debouncedQuery.trim());

    if (!normalizedQuery) {
      return teachers;
    }

    return teachers.filter((teacher) => {
      const searchableText = normalizeArabicText(
        [teacher.name, ...teacherSubjectNames(teacher), teacher.bio].join(" "),
      );

      return searchableText.includes(normalizedQuery);
    });
  }, [teachers, debouncedQuery]);

  return {
    query,
    debouncedQuery,
    isSearching,
    setQuery,
    filteredTeachers,
  };
}
