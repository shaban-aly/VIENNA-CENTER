"use client";

import { SearchX } from "lucide-react";
import { TeacherCard } from "@/components/teachers/teacher-card";
import { SearchInput } from "@/components/ui/search-input";
import { teachers as allTeachers } from "@/data/mock";
import { useTeachersFilter } from "@/hooks/teachers/use-teachers-filter";

export function TeachersSection() {
  const { query, isSearching, setQuery, filteredTeachers } =
    useTeachersFilter(allTeachers);

  return (
    <section className="space-y-4">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="ابحث عن مدرس أو مادة"
        ariaLabel="البحث عن مدرس"
        isSearching={isSearching}
      />

      <p className="text-sm font-bold text-muted">
        {filteredTeachers.length}{" "}
        {filteredTeachers.length === 1 ? "مدرس" : "مدرسين"}
      </p>

      {filteredTeachers.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-[18px] border border-border bg-card p-6 text-center">
          <SearchX className="mb-3 text-gold" size={32} />
          <p className="font-bold text-white">لا توجد نتائج مطابقة</p>
          <p className="mt-2 text-xs text-muted">جرّب كلمة بحث مختلفة.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} variant="list" />
          ))}
        </div>
      )}
    </section>
  );
}
