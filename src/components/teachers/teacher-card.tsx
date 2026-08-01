import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clock, GraduationCap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { teacherSubjectNames } from "@/lib/teachers";
import type { Teacher } from "@/types/content";

type TeacherCardProps = {
  teacher: Teacher;
  variant?: "preview" | "list";
};

export function TeacherCard({ teacher, variant = "preview" }: TeacherCardProps) {
  const initial = teacher.name.replace("أ / ", "").charAt(0);
  const subjectNames = teacherSubjectNames(teacher);

  if (variant === "list") {
    return (
      <Card className="overflow-hidden p-0">
        <Link href={`/teachers/${teacher.id}`} className="flex lg:block">
          <div className="relative w-28 shrink-0 bg-card-secondary lg:h-auto lg:w-full lg:aspect-[3/4]">
            <TeacherImageTile
              imageUrl={teacher.imageUrl}
              initial={initial}
              name={teacher.name}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-gold/20 bg-black/82 p-4 backdrop-blur-sm lg:block">
              <h2 className="truncate text-base font-black transition hover:text-gold">
                {teacher.name}
              </h2>
              <p className="mt-1 text-sm font-bold text-gold">
                {subjectNames.join("، ")}
              </p>
            </div>
          </div>
          <div className="min-w-0 flex-1 p-4 lg:hidden">
            <h2 className="truncate text-base font-black transition hover:text-gold">
              {teacher.name}
            </h2>
            <p className="mt-1 text-sm font-bold text-gold">
              {subjectNames.join("، ")}
            </p>
          </div>
        </Link>
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap justify-between gap-2 text-xs font-bold text-muted lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-secondary px-2.5 py-1">
              <GraduationCap size={15} className="text-gold" />
              {teacher.experienceYears} سنوات خبرة
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-secondary px-2.5 py-1">
              <Clock size={15} className="text-gold" />
              {teacher.schedules.length} حصص أسبوعياً
            </span>
          </div>
          <Link href={`/booking?teacher=${teacher.id}`} className="block">
            <Button className="min-h-11 w-full rounded-xl text-sm">
              <CalendarCheck size={16} />
              احجز مع المدرس
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/teachers/${teacher.id}`} className="block shrink-0">
      <Card className="relative h-64 w-48 shrink-0 overflow-hidden p-0 md:w-48 lg:w-48">
        <div className="absolute inset-0 bg-card-secondary">
          <TeacherImageTile
            imageUrl={teacher.imageUrl}
            initial={initial}
            name={teacher.name}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/20 bg-black/82 p-4 backdrop-blur-sm">
          <h3 className="truncate text-base font-black transition hover:text-gold">
            {teacher.name}
          </h3>
          <p className="mt-1 text-sm font-bold text-gold">
            {subjectNames.join("، ")}
          </p>
        </div>
      </Card>
    </Link>
  );
}

function TeacherImageTile({
  imageUrl,
  initial,
  name,
}: {
  imageUrl?: string;
  initial: string;
  name: string;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 1024px) 25vw, 224px"
        className="object-cover object-top transition duration-300 hover:scale-105"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_22%,rgba(212,160,23,0.2),rgba(24,24,24,0.95)_55%)]">
      <div className="flex size-24 items-center justify-center rounded-3xl border border-gold/40 bg-black text-4xl font-black text-gold">
        {initial}
      </div>
    </div>
  );
}


