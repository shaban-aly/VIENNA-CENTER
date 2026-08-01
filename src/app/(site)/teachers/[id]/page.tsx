import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeacherAbout } from "@/components/teachers/teacher-details/teacher-about";
import { TeacherHero } from "@/components/teachers/teacher-details/teacher-hero";
import { TeacherSchedule } from "@/components/teachers/teacher-details/teacher-schedule";
import { PageHeader } from "@/components/layout/page-header";
import { subjects, teachers } from "@/data/mock";
import type { Subject } from "@/types/content";

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: teacher.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const teacher = teachers.find((item) => item.id === id);

  if (!teacher) {
    return { title: "المدرس غير موجود" };
  }

  return { title: teacher.name };
}

export default async function TeacherDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const teacher = teachers.find((item) => item.id === id);

  if (!teacher) {
    notFound();
  }

  const teacherSubjects = teacher.subjectIds
    .map((subjectId) => subjects.find((subject) => subject.id === subjectId))
    .filter((subject): subject is Subject => Boolean(subject));

  return (
    <>
      <PageHeader title={teacher.name} />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <TeacherHero teacher={teacher} subjects={teacherSubjects} />
          <div className="space-y-4">
            <TeacherAbout teacher={teacher} />
            <TeacherSchedule teacher={teacher} />
          </div>
        </div>
      </div>
    </>
  );
}
