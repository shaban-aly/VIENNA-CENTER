import type { ReactNode } from "react";
import type { StudentProfile } from "@/types/content";

type ProfileCardProps = {
  student: StudentProfile;
  action?: ReactNode;
};

export function ProfileCard({ student, action }: ProfileCardProps) {
  const initial = student.name.trim().charAt(0);

  return (
    <div className="rounded-[22px] border border-gold/25 bg-[linear-gradient(160deg,rgba(212,160,23,0.14),rgba(17,17,17,0.95)_48%)] p-6 text-center lg:flex lg:items-center lg:gap-6 lg:p-8 lg:text-right">
      <div className="mx-auto flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gold/45 bg-black text-5xl font-black text-gold shadow-[0_0_36px_rgba(212,160,23,0.18)] lg:size-28 lg:mx-0">
        {student.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </div>

      <div className="mt-4 lg:mt-0 lg:min-w-0 lg:flex-1">
        <h1 className="text-2xl font-black text-white">{student.name}</h1>
        <p className="mt-1 text-base font-bold text-gold">{student.grade}</p>

        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-black text-gold">
          <span className="size-1.5 rounded-full bg-gold" />
          {student.bookingStatus}
        </span>
      </div>

      {action ? <div className="mt-5 shrink-0 lg:mt-0">{action}</div> : null}
    </div>
  );
}
