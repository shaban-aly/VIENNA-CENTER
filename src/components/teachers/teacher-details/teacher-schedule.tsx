import { CalendarDays, Clock } from "lucide-react";
import { Card } from "@/components/ui";
import { formatTimeArabic, weekDayLabel } from "@/lib/utils";
import type { Teacher } from "@/types/content";

type TeacherScheduleProps = {
  teacher: Teacher;
};

export function TeacherSchedule({ teacher }: TeacherScheduleProps) {
  const schedules = [...teacher.schedules].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek,
  );

  if (schedules.length === 0) {
    return null;
  }

  return (
    <Card className="hover:border-border">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-gold" size={22} />
        <h2 className="text-base font-black text-white">جدول المواعيد</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card-secondary p-4"
          >
            <p className="text-sm font-bold text-white">
              {weekDayLabel(schedule.dayOfWeek)}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gold">
              <Clock size={16} />
              {formatTimeArabic(schedule.startTime)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
