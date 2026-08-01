"use client";

import { useMemo, useState } from "react";
import { Check, Phone, UserRound, X } from "lucide-react";
import { SearchInput } from "@/components/ui";
import type { AdminBooking, BookingStatus } from "@/types/content";
import { StatusBadge } from "./status-badge";

type BookingsManagerProps = {
  bookings: AdminBooking[];
};

type Filter = "all" | BookingStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "pending", label: "قيد المراجعة" },
  { value: "confirmed", label: "مقبول" },
  { value: "cancelled", label: "مرفوض" },
];

export function BookingsManager({ bookings }: BookingsManagerProps) {
  const [items, setItems] = useState(bookings);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((booking) => {
      const matchesFilter =
        filter === "all" || booking.status === filter;
      const matchesQuery =
        !normalizedQuery ||
        booking.studentName.toLowerCase().includes(normalizedQuery) ||
        booking.phone.includes(normalizedQuery) ||
        booking.subject.toLowerCase().includes(normalizedQuery) ||
        booking.teacherName.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [items, filter, query]);

  function updateStatus(id: string, status: BookingStatus) {
    setItems((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    );
  }

  const counts: Record<Filter, number> = {
    all: items.length,
    pending: items.filter((booking) => booking.status === "pending").length,
    confirmed: items.filter((booking) => booking.status === "confirmed")
      .length,
    cancelled: items.filter((booking) => booking.status === "cancelled")
      .length,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="md:max-w-xs md:flex-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="ابحث بالاسم أو المادة أو المدرس"
            ariaLabel="البحث في الحجوزات"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-none">
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-bold transition ${
                filter === option.value
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-border bg-card text-muted hover:border-gold/40 hover:text-gold"
              }`}
            >
              {option.label}
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs font-black ${
                  filter === option.value
                    ? "bg-gold text-black"
                    : "bg-card-secondary text-muted"
                }`}
              >
                {counts[option.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((booking) => (
          <div
            key={booking.id}
            className="rounded-[18px] border border-border bg-card p-4 md:flex md:items-center md:gap-4"
          >
            <div className="flex items-start gap-3 md:min-w-0 md:flex-1">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <UserRound className="text-gold" size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-white">{booking.studentName}</p>
                  <StatusBadge status={booking.status} />
                </div>
                <p className="mt-1 text-sm font-bold text-gold">
                  {booking.subject} · {booking.teacherName}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {booking.schedule} — {booking.date}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted/70">
                  أُرسل في {booking.createdAt}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 md:mt-0 md:w-44 md:shrink-0 md:flex-col md:items-stretch md:border-t-0 md:pt-0">
              <div className="space-y-1 text-xs font-bold text-muted md:text-right">
                <p className="flex items-center gap-1.5">
                  <Phone size={13} className="shrink-0 text-gold" />
                  <span dir="ltr">{booking.phone}</span>
                </p>
                <p>{booking.grade}</p>
              </div>

              {booking.status === "pending" ? (
                <div className="flex gap-2 md:grid md:grid-cols-2">
                  <button
                    type="button"
                    aria-label={`قبول حجز ${booking.studentName}`}
                    onClick={() => updateStatus(booking.id, "confirmed")}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-success/25 bg-success/10 text-sm font-black text-success transition hover:bg-success/15"
                  >
                    <Check size={18} />
                    قبول
                  </button>
                  <button
                    type="button"
                    aria-label={`رفض حجز ${booking.studentName}`}
                    onClick={() => updateStatus(booking.id, "cancelled")}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-danger/25 bg-danger/10 text-sm font-black text-danger transition hover:bg-danger/15"
                  >
                    <X size={18} />
                    رفض
                  </button>
                </div>
              ) : (
                <p className="text-xs font-bold text-muted/60">
                  {booking.status === "confirmed"
                    ? "تمت الموافقة على الحجز"
                    : "تم رفض هذا الحجز"}
                </p>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-[18px] border border-border bg-card p-8 text-center">
            <p className="text-sm font-black text-white">لا توجد حجوزات</p>
            <p className="mt-2 text-xs font-bold text-muted">
              جرّب تغيير الفلتر أو كلمة البحث.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
