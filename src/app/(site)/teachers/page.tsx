import { PageHeader } from "@/components/layout/page-header";
import { TeachersSection } from "@/components/teachers/teachers-section";

export default function TeachersPage() {
  return (
    <>
      <PageHeader title="المدرسون" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="rounded-[22px] border border-gold/25 bg-card p-5">
          <p className="text-sm font-bold text-gold">فريق التدريس</p>
          <h1 className="mt-2 text-2xl font-black text-white">
            مدرسون متخصصون في كل المواد
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            تصفح المدرسين، اطلع على خبراتهم ومواعيدهم، واحجز مع المدرس المناسب.
          </p>
        </div>

        <div className="mt-5">
          <TeachersSection />
        </div>
      </div>
    </>
  );
}
