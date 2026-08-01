import { UserRound } from "lucide-react";
import { TeacherCard } from "@/components/teachers/teacher-card";
import type { Subject, Teacher } from "@/types/content";

type SubjectTeachersProps = {
  subject: Subject;
  teachers: Teacher[];
};

export function SubjectTeachers({ subject, teachers }: SubjectTeachersProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-black text-white">مدرسون المادة</h2>
        <p className="mt-1 text-sm font-bold text-muted">
          اختر المدرس المناسب لـ {subject.name} واحجز معه مباشرة.
        </p>
      </div>

      {teachers.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-[18px] border border-border bg-card p-6 text-center">
          <UserRound className="mb-3 text-gold" size={32} />
          <p className="font-bold text-white">لا يوجد مدرسون لهذه المادة حالياً</p>
          <p className="mt-2 text-xs text-muted">
            سيتم إضافة مدرسين لهذه المادة قريباً.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} variant="list" />
          ))}
        </div>
      )}
    </section>
  );
}
