"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/layout/page-header";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHeader title="حدث خطأ" />
      <div className="flex min-h-40 flex-col items-center justify-center px-5 py-10 text-center">
        <TriangleAlert className="mb-3 text-gold" size={40} />
        <p className="font-bold text-white">عذراً، حدث خطأ غير متوقع</p>
        <p className="mt-2 text-xs text-muted">
          حاول مرة أخرى، وإن تكررت المشكلة تواصل معنا.
        </p>
        <Button className="mt-8 w-full lg:w-auto" onClick={unstable_retry}>
          إعادة المحاولة
        </Button>
      </div>
    </>
  );
}
