import { teachers } from "@/data/mock";
import type { Teacher } from "@/types/content";

export function subjectTeachers(subjectId: string): Teacher[] {
  return teachers.filter((teacher) => teacher.subjectIds.includes(subjectId));
}
