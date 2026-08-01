import Link from "next/link";
import { FileX2 } from "lucide-react";
import { Button } from "@/components/ui";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";

export default function NotFound() {
  return (
    <AppShell>
      <PageHeader title="الصفحة غير موجودة" />
      <div className="flex min-h-40 flex-col items-center justify-center px-5 py-10 text-center">
        <FileX2 className="mb-3 text-gold" size={40} />
        <p className="font-bold text-white">عذراً، الصفحة غير موجودة</p>
        <p className="mt-2 text-xs text-muted">
          الرابط غير صحيح أو الصفحة تم نقلها.
        </p>
        <Link href="/" className="mx-auto mt-8 block">
          <Button className="w-full">العودة للرئيسية</Button>
        </Link>
      </div>
    </AppShell>
  );
}
