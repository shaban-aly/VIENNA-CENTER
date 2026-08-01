"use client";

import { SearchX } from "lucide-react";
import { SubjectCard } from "@/components/subjects/subject-card";
import { SearchInput } from "@/components/ui/search-input";
import { subjects as allSubjects } from "@/data/mock";
import { useSubjectsFilter } from "@/hooks/subjects/use-subjects-filter";
import { subjectTeachers } from "@/lib/subjects";

export function SubjectsSection() {
  const { query, isSearching, setQuery, filteredSubjects } =
    useSubjectsFilter(allSubjects);

  return (
    <section className="space-y-4">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="ابحث عن مادة أو صف دراسي"
        ariaLabel="البحث عن مادة"
        isSearching={isSearching}
      />

      <p className="text-sm font-bold text-muted">
        {filteredSubjects.length}{" "}
        {filteredSubjects.length === 1 ? "مادة" : "مواد"}
      </p>

      {filteredSubjects.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-[18px] border border-border bg-card p-6 text-center">
          <SearchX className="mb-3 text-gold" size={32} />
          <p className="font-bold text-white">لا توجد نتائج مطابقة</p>
          <p className="mt-2 text-xs text-muted">جرّب كلمة بحث مختلفة.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              teacherCount={subjectTeachers(subject.id).length}
              variant="detailed"
            />
          ))}
        </div>
      )}
    </section>
  );
}
