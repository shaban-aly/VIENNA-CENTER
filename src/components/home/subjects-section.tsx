import { SectionHeader } from "@/components/ui";
import { SubjectCard } from "@/components/subjects/subject-card";
import { subjects } from "@/data/mock";

export function SubjectsSection() {
  return (
    <section id="subjects" className="scroll-mt-6">
      <SectionHeader
        title="المواد الدراسية"
        action="عرض الكل"
        actionHref="/subjects"
      />
      <div className="-mx-5 flex gap-3 overflow-x-auto scrollbar-none px-5 pb-1 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {subjects.slice(0, 6).map((subject) => (
          <div key={subject.id} className="shrink-0">
            <SubjectCard subject={subject} />
          </div>
        ))}
      </div>
    </section>
  );
}
