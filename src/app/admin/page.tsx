import {
  BookOpen,
  CalendarCheck,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { adminBookings, adminStats } from "@/data/admin";
import { LatestBookings } from "@/components/admin/latest-bookings";
import { StatCard } from "@/components/admin/stat-card";

const statCards = [
  { title: "الطلاب", value: adminStats.studentsCount, icon: UsersRound },
  { title: "المدرسون", value: adminStats.teachersCount, icon: GraduationCap },
  { title: "المواد", value: adminStats.subjectsCount, icon: BookOpen },
];

export default function AdminDashboardPage() {
  const pendingCount = adminBookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const confirmedCount = adminBookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;
  const cancelledCount = adminBookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  const statusRows = [
    { label: "قيد المراجعة", count: pendingCount, className: "text-gold" },
    { label: "مقبول", count: confirmedCount, className: "text-success" },
    { label: "مرفوض", count: cancelledCount, className: "text-danger" },
  ];

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-bold text-gold">لوحة التحكم</p>
        <h1 className="mt-1 text-2xl font-black text-white">
          نظرة عامة على السنتر
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          تابع نشاط الحجوزات والإحصائيات من مكان واحد.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
        <StatCard title="حجوزات جديدة" value={pendingCount} icon={CalendarCheck} />
      </div>

      <section className="rounded-[18px] border border-border bg-card p-5">
        <h2 className="text-lg font-black text-white">حالة الحجوزات</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {statusRows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-border bg-card-secondary p-4 text-center">
              <p className={`text-2xl font-black ${row.className}`}>{row.count}</p>
              <p className="mt-1 text-xs font-bold text-muted">{row.label}</p>
            </div>
          ))}
        </div>
      </section>

      <LatestBookings bookings={adminBookings} />
    </div>
  );
}
