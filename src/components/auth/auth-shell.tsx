import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-5 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.14),transparent_65%)]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-7 flex flex-col items-center gap-3">
          <Image
            src="/images/logo-vienna.png"
            alt="Vienna Center"
            width={72}
            height={72}
            priority
            className="size-16 object-contain drop-shadow-[0_0_24px_rgba(212,160,23,0.28)]"
          />
          <div className="text-center leading-tight">
            <p className="text-lg font-black text-gold">VIENNA CENTER</p>
            <p className="mt-0.5 text-xs font-bold text-muted">
              سنتر فيينا التعليمي
            </p>
          </div>
        </Link>

        <div className="rounded-[22px] border border-gold/25 bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8">
          {children}
        </div>

        <p className="mt-7 text-center text-[11px] font-bold text-muted">
          {new Date().getFullYear()} © سنتر فيينا التعليمي
        </p>
      </div>
    </div>
  );
}
