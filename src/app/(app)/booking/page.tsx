import { redirect } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import { BookingSummary } from "@/components/booking/booking-summary";
import { PageHeader } from "@/components/layout/page-header";
import { classLeval, teachers } from "@/data/mock";
import { teacherSubjects } from "@/lib/teachers";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{
    teacher?: string | string[];
    subject?: string | string[];
  }>;
}) {
  const { teacher: teacherParam, subject: subjectParam } = await searchParams;
  const teacherId = Array.isArray(teacherParam) ? teacherParam[0] : teacherParam;
  const subjectId = Array.isArray(subjectParam) ? subjectParam[0] : subjectParam;
  const teacher = teachers.find((item) => item.id === teacherId);
  const derivedSubjectId = teacher ? teacherSubjects(teacher)[0]?.id : undefined;
  const initialTeacherId = teacher?.id;
  const initialSubjectId = subjectId ?? derivedSubjectId;

  const user = await getMockUser();

  if (!user) {
    redirect("/auth/login");
  }

  const initialStudent = {
    name: user.profile.name,
    phone: user.profile.phone,
    gradeId:
      classLeval.find((grade) => grade.title === user.profile.grade)?.id ?? "",
  };

  return (
    <>
      <PageHeader title="احجز درس" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          <BookingForm
            initialTeacherId={initialTeacherId}
            initialSubjectId={initialSubjectId}
            initialStudent={initialStudent}
          />
          <aside className="lg:sticky lg:top-24">
            <BookingSummary />
          </aside>
        </div>
      </div>
    </>
  );
}
