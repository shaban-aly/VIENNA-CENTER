import { PageHeader } from "@/components/layout/page-header";
import { TermsContent } from "@/components/terms/terms-content";

export default function TermsPage() {
  return (
    <>
      <PageHeader title="الشروط والأحكام" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <div className="rounded-[22px] border border-gold/25 bg-card p-5">
          <p className="text-sm font-bold text-gold">وثيقة الاستخدام</p>
          <h1 className="mt-2 text-2xl font-black text-white">
            شروط وأحكام سنتر فيينا التعليمي
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            اقرأ هذه الشروط بعناية قبل استكمال التسجيل أو الحجز.
          </p>
        </div>

        <div className="mt-5">
          <TermsContent />
        </div>
      </div>
    </>
  );
}
