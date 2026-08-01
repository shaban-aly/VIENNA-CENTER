import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageHeaderProps = {
  title: string;
  backHref?: string;
};

export function PageHeader({ title, backHref = "/" }: PageHeaderProps) {
  return (
    <header className="sticky top-0 mt-2 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur">
      <Link
        href={backHref}
        aria-label="العودة"
        className="flex size-10 items-center justify-center rounded-xl text-gold transition hover:bg-card"
      >
        <ArrowRight size={24} />
      </Link>
      <h1 className="text-xl font-bold text-gold">{title}</h1>
      <span className="size-10" />
    </header>
  );
}
