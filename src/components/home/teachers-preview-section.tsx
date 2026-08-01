import { teachers } from "@/data/mock";
import { SectionHeader } from "@/components/ui";
import { TeacherCard } from "@/components/teachers/teacher-card";

export function TeachersPreviewSection() {
  return (
    <section id="teachers-preview" className="scroll-mt-6">
      <SectionHeader
        title="أبرز المدرسين"
        action="عرض الكل"
        actionHref="/teachers"
      />
      <div className="-mx-5 flex gap-2 overflow-x-auto scrollbar-none px-5 pb-1 lg:mx-0 lg:grid lg:grid-cols-5 lg:justify-items-center lg:overflow-visible lg:px-0 lg:pb-0">
        {teachers.slice(0, 5).map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </section>
  );
}
