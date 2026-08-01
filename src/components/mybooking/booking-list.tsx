import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CalendarX2,
  Clock,
  GraduationCap,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { subjects } from "@/data/mock";
import type { Booking, StudentProfile } from "@/types/content";

const statusMeta: Record<
  Booking["status"],
  { label: string; className: string; icon: LucideIcon }
> = {
  pending: {
    label: "قيد المراجعة",
    className: "border-gold/40 bg-gold/10 text-gold",
    icon: Clock,
  },
  confirmed: {
    label: "مؤكد",
    className: "border-success/40 bg-success/10 text-success",
    icon: CalendarCheck,
  },
  cancelled: {
    label: "ملغي",
    className: "border-danger/40 bg-danger/10 text-danger",
    icon: CalendarX2,
  },
};

type BookingListProps = {
  bookings: Booking[];
  student: StudentProfile;
};

export function BookingList({ bookings, student }: BookingListProps) {
  if (bookings.length === 0) {
    return <EmptyBookings />;
  }

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;
  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  const stats = [
    { label: "إجمالي الحجوزات", value: bookings.length, icon: CalendarDays },
    { label: "قيد المراجعة", value: pendingCount, icon: Clock },
    { label: "مؤكدة", value: confirmedCount, icon: CalendarCheck },
    { label: "ملغاة", value: cancelledCount, icon: CalendarX2 },
  ];

  const countLabel =
    bookings.length === 1
      ? "1 حجز"
      : bookings.length === 2
        ? "حجزان"
        : `${bookings.length} حجوزات`;

  return (
    <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-24">
          <StudentSummary stats={stats} student={student} />
        </aside>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-black text-white">الحجوزات</h2>
            <p className="mt-1 text-sm font-bold text-muted">{countLabel}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            {bookings.map((booking) => {
              const subject = subjects.find((item) => item.name === booking.subject);
              const SubjectIcon = subject?.icon ?? BookOpen;
              const status = statusMeta[booking.status];

              return (
                <article
                  key={booking.id}
                  className="rounded-[18px] border border-border bg-card p-4 transition hover:border-gold/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-black/45 text-gold">
                      <SubjectIcon size={23} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-black text-white">
                          {booking.subject}
                        </h3>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-bold ${status.className}`}
                        >
                          <status.icon size={13} />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-gold">
                        {booking.teacherName}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={14} className="text-gold" />
                          {booking.schedule}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarCheck size={14} className="text-gold" />
                          {booking.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

type StudentSummaryProps = {
  stats: { label: string; value: number; icon: LucideIcon }[];
  student: StudentProfile;
};

function StudentSummary({ stats, student }: StudentSummaryProps) {
  const avatarInitial = student.name.trim().charAt(0);

  return (
    <Card className="hover:border-border">
      <div className="flex items-center gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-gold/45 bg-black text-2xl font-black text-gold shadow-[0_0_24px_rgba(212,160,23,0.12)]">
          {avatarInitial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-white">
            {student.name}
          </p>
          <p className="text-sm font-bold text-gold">{student.grade}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2 text-muted">
          <Phone size={16} className="shrink-0 text-gold" />
          {student.phone}
        </p>
        <p className="flex items-center gap-2 text-muted">
          <GraduationCap size={16} className="shrink-0 text-gold" />
          {student.bookingStatus}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card-secondary p-3 text-center"
          >
            <stat.icon size={18} strokeWidth={1.8} className="mx-auto text-gold" />
            <p className="mt-1 text-xl font-black text-white">{stat.value}</p>
            <p className="text-[11px] font-bold text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <Link href="/booking" className="mt-5 block">
        <Button className="w-full">
          <CalendarCheck size={20} />
          حجز جديد
        </Button>
      </Link>
    </Card>
  );
}

function EmptyBookings() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center px-5 py-10 text-center lg:mx-auto lg:max-w-7xl lg:px-8">
      <CalendarCheck className="mb-3 text-gold" size={32} />
      <p className="font-bold text-white">لا توجد حجوزات حالياً</p>
      <p className="mt-2 text-xs text-muted">
        عند قيامك بالحجز سوف تظهر تفاصيل حجوزاتك هنا.
      </p>
      <Link href="/booking" className="mx-auto mt-8 block lg:mx-0 lg:w-80">
        <Button className="w-full">
          <CalendarCheck size={22} />
          احجز الآن
        </Button>
      </Link>
    </div>
  );
}
