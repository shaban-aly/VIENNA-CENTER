import Link from "next/link";
import { CalendarCheck, UsersRound } from "lucide-react";
import { Card } from "@/components/ui";
import type { Subject } from "@/types/content";

type SubjectCardProps = {
  subject: Subject;
  teacherCount?: number;
  variant?: "preview" | "detailed";
};

export function SubjectCard({
  subject,
  teacherCount = 0,
  variant = "preview",
}: SubjectCardProps) {
  const Icon = subject.icon;
  const teacherLabel =
    teacherCount === 0
      ? "مدرس قريباً"
      : teacherCount === 1
        ? "مدرس واحد"
        : `${teacherCount} مدرسين`;

  if (variant === "preview") {
    return (
      <Link href={`/subjects/${subject.id}`} className="block">
        <Card className="group flex h-28 w-28 flex-col items-center justify-center gap-3 p-3 text-center transition hover:border-gold/50 md:h-32 md:w-32 lg:h-[120px] lg:w-full">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 transition group-hover:scale-105 md:size-12">
            <Icon className="text-gold" size={28} strokeWidth={1.7} />
          </div>
          <span className="line-clamp-2 text-sm font-black leading-5 transition group-hover:text-gold">
            {subject.name}
          </span>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="flex min-h-52 flex-col justify-between gap-5 p-4">
      <Link
        href={`/subjects/${subject.id}`}
        className="flex items-start justify-between gap-4"
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
          <Icon className="text-gold" size={32} strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1 text-right">
          <h2 className="text-lg font-black text-white transition hover:text-gold">
            {subject.name}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {subject.description}
          </p>
        </div>
      </Link>

      <Link
        href={`/subjects/${subject.id}`}
        className="flex flex-wrap gap-2"
        aria-label={`عرض تفاصيل مادة ${subject.name}`}
      >
        {subject.grades.map((grade) => (
          <span
            key={grade}
            className="rounded-full border border-border bg-black/35 px-3 py-1 text-xs font-bold text-muted"
          >
            {grade}
          </span>
        ))}
      </Link>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
        <div className="flex min-h-11 items-center gap-2 rounded-2xl bg-card-secondary px-3 text-xs font-bold text-muted">
          <UsersRound className="shrink-0 text-gold" size={17} />
          <span>{teacherLabel}</span>
        </div>
        <Link
          href={`/booking?subject=${subject.id}`}
          className="flex min-h-11 items-center gap-2 rounded-2xl bg-gold px-3 text-xs font-black text-black transition hover:bg-gold-light"
        >
          <CalendarCheck className="shrink-0" size={17} />
          <span>احجز المادة</span>
        </Link>
      </div>
    </Card>
  );
}
