import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { SubjectHero } from "@/components/subjects/subject-details/subject-hero";
import { SubjectTeachers } from "@/components/subjects/subject-details/subject-teachers";
import { subjects } from "@/data/mock";
import { subjectTeachers } from "@/lib/subjects";

export function generateStaticParams() {
  return subjects.map((subject) => ({ id: subject.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const subject = subjects.find((item) => item.id === id);

  if (!subject) {
    return { title: "المادة غير موجودة" };
  }

  return { title: subject.name };
}

export default async function SubjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subject = subjects.find((item) => item.id === id);

  if (!subject) {
    notFound();
  }

  const subjectTeachersList = subjectTeachers(subject.id);

  return (
    <>
      <PageHeader title={subject.name} />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          <SubjectHero
            subject={subject}
            teacherCount={subjectTeachersList.length}
          />
          <SubjectTeachers subject={subject} teachers={subjectTeachersList} />
        </div>
      </div>
    </>
  );
}
