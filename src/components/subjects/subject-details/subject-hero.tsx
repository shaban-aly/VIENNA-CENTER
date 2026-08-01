import Link from "next/link";
import { CalendarCheck, GraduationCap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import type { Subject } from "@/types/content";

type SubjectHeroProps = {
  subject: Subject;
  teacherCount: number;
};

export function SubjectHero({ subject, teacherCount }: SubjectHeroProps) {
  const Icon = subject.icon;
  const teacherLabel =
    teacherCount === 0
      ? "مدرس قريباً"
      : teacherCount === 1
        ? "مدرس واحد"
        : `${teacherCount} مدرسين`;

  return (
    <Card className="overflow-hidden p-0 lg:sticky lg:top-24">
      <div className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_50%_22%,rgba(212,160,23,0.2),rgba(24,24,24,0.95)_55%)]">
        <div className="flex size-32 items-center justify-center rounded-3xl border border-gold/40 bg-black shadow-[0_0_36px_rgba(212,160,23,0.15)]">
          <Icon className="text-gold" size={64} strokeWidth={1.5} />
        </div>
      </div>

      <div className="p-5">
        <h1 className="text-xl font-black text-white">{subject.name}</h1>
        <p className="mt-2 text-sm leading-7 text-muted">{subject.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {subject.grades.map((grade) => (
            <span
              key={grade}
              className="rounded-full border border-border bg-card-secondary px-3 py-1 text-xs font-bold text-muted"
            >
              {grade}
            </span>
          ))}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card-secondary px-3 py-1.5 text-xs font-bold text-muted">
          <GraduationCap size={15} className="text-gold" />
          {teacherLabel}
        </div>

        <Link href={`/booking?subject=${subject.id}`} className="mt-5 block">
          <Button className="w-full">
            <CalendarCheck size={20} />
            احجز المادة
          </Button>
        </Link>
      </div>
    </Card>
  );
}
