import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/layout/page-header";

export default function SubjectNotFound() {
  return (
    <>
      <PageHeader title="المادة غير موجودة" />
      <div className="flex min-h-40 flex-col items-center justify-center px-5 py-10 text-center">
        <BookX className="mb-3 text-gold" size={40} />
        <p className="font-bold text-white">عذراً، هذه المادة غير موجودة</p>
        <p className="mt-2 text-xs text-muted">
          ربما تم حذف المادة أو الرابط غير صحيح.
        </p>
        <Link href="/subjects" className="mx-auto mt-8 block">
          <Button className="w-full">عرض كل المواد</Button>
        </Link>
      </div>
    </>
  );
}
