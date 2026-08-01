import Link from "next/link";
import { UserRoundX } from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/layout/page-header";

export default function TeacherNotFound() {
  return (
    <>
      <PageHeader title="المدرس غير موجود" />
      <div className="flex min-h-40 flex-col items-center justify-center px-5 py-10 text-center">
        <UserRoundX className="mb-3 text-gold" size={40} />
        <p className="font-bold text-white">عذراً، هذا المدرس غير موجود</p>
        <p className="mt-2 text-xs text-muted">
          ربما تم حذف المدرس أو الرابط غير صحيح.
        </p>
        <Link href="/teachers" className="mx-auto mt-8 block">
          <Button className="w-full">عرض كل المدرسين</Button>
        </Link>
      </div>
    </>
  );
}
