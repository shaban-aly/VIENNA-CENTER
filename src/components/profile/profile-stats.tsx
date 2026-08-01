import { CalendarCheck, CalendarDays, CalendarX2, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";
import { bookings } from "@/data/mock";
import type { Booking } from "@/types/content";

const statusMeta: Record<
  Booking["status"],
  { label: string; icon: LucideIcon }
> = {
  pending: { label: "قيد المراجعة", icon: Clock },
  confirmed: { label: "مؤكدة", icon: CalendarCheck },
  cancelled: { label: "ملغاة", icon: CalendarX2 },
};

const statuses: Booking["status"][] = ["pending", "confirmed", "cancelled"];

export function ProfileStats() {
  const stats = [
    {
      label: "إجمالي الحجوزات",
      value: bookings.length,
      icon: CalendarDays,
    },
    ...statuses.map((status) => ({
      label: statusMeta[status].label,
      value: bookings.filter((booking) => booking.status === status).length,
      icon: statusMeta[status].icon,
    })),
  ];

  return (
    <Card className="hover:border-border">
      <h2 className="text-base font-black text-white">إحصائيات الحجوزات</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card-secondary p-3 text-center"
          >
            <stat.icon size={18} strokeWidth={1.8} className="mx-auto text-gold" />
            <p className="mt-1 text-xl font-black text-white">{stat.value}</p>
            <p className="mt-1 text-[11px] font-bold text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
