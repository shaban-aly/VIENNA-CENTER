import { PageHeader } from "@/components/layout/page-header";
import { SubjectsSection } from "@/components/subjects/subjects-section";

export default function SubjectsPage() {
  return (
    <>
      <PageHeader title="المواد الدراسية" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="rounded-[22px] border border-gold/25 bg-card p-5">
          <p className="text-sm font-bold text-gold">اختر المادة المناسبة</p>
          <h1 className="mt-2 text-2xl font-black text-white">
            كل المواد الأساسية في مكان واحد
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            تصفح المواد المتاحة، اختر الصف الدراسي، ثم احجز مع المدرس المناسب.
          </p>
        </div>

        <div className="mt-5">
          <SubjectsSection />
        </div>
      </div>
    </>
  );
}
