import { Award, CheckCircle2, UserRound } from "lucide-react";
import { Card } from "@/components/ui";
import type { Teacher } from "@/types/content";

type TeacherAboutProps = {
  teacher: Teacher;
};

export function TeacherAbout({ teacher }: TeacherAboutProps) {
  return (
    <Card className="hover:border-border">
      <div className="flex items-center gap-2">
        <UserRound className="text-gold" size={22} />
        <h2 className="text-base font-black text-white">نبذة عن المدرس</h2>
      </div>

      <p className="mt-3 text-sm leading-8 text-muted">{teacher.bio}</p>

      <div className="mt-5 border-t border-border pt-5">
        <div className="flex items-center gap-2">
          <Award className="text-gold" size={20} />
          <h3 className="text-sm font-black text-white">المؤهلات</h3>
        </div>
        <ul className="mt-3 space-y-2">
          {teacher.qualifications.map((qualification) => (
            <li
              key={qualification}
              className="flex items-center gap-2 text-sm leading-7 text-muted"
            >
              <CheckCircle2 size={17} className="shrink-0 text-gold" />
              {qualification}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
