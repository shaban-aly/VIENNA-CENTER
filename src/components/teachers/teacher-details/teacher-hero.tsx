import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clock, GraduationCap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import type { Subject, Teacher } from "@/types/content";

type TeacherHeroProps = {
  teacher: Teacher;
  subjects: Subject[];
};

export function TeacherHero({ teacher, subjects }: TeacherHeroProps) {
  const initial = teacher.name.replace("أ / ", "").charAt(0);
  const subjectNames = subjects.map((subject) => subject.name);

  return (
    <Card className="overflow-hidden p-0 lg:sticky lg:top-24">
      <div className="relative aspect-[4/3] w-full bg-card-secondary">
        {teacher.imageUrl ? (
          <Image
            src={teacher.imageUrl}
            alt={teacher.name}
            fill
            sizes="(min-width: 1024px) 340px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_22%,rgba(212,160,23,0.2),rgba(24,24,24,0.95)_55%)]">
            <div className="flex size-28 items-center justify-center rounded-3xl border border-gold/40 bg-black text-5xl font-black text-gold">
              {initial}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h1 className="text-xl font-black text-white">{teacher.name}</h1>
        <p className="mt-1 text-sm font-bold text-gold">
          {subjectNames.join("، ")}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-secondary px-3 py-1.5">
            <GraduationCap size={15} className="text-gold" />
            {teacher.experienceYears} سنوات خبرة
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-secondary px-3 py-1.5">
            <Clock size={15} className="text-gold" />
            {teacher.schedules.length} حصص أسبوعياً
          </span>
        </div>

        <Link href={`/booking?teacher=${teacher.id}`} className="mt-5 block">
          <Button className="w-full">
            <CalendarCheck size={20} />
            احجز مع المدرس
          </Button>
        </Link>
      </div>
    </Card>
  );
}
