import { subjects } from "@/data/mock";
import type { Subject, Teacher } from "@/types/content";

export function teacherSubjects(teacher: Teacher): Subject[] {
  return teacher.subjectIds
    .map((subjectId) => subjects.find((subject) => subject.id === subjectId))
    .filter((subject): subject is Subject => Boolean(subject));
}

export function teacherSubjectNames(teacher: Teacher): string[] {
  return teacherSubjects(teacher).map((subject) => subject.name);
}
