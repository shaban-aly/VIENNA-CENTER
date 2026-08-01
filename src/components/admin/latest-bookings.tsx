"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import type { AdminBooking, BookingStatus } from "@/types/content";
import { StatusBadge } from "./status-badge";

type LatestBookingsProps = {
  bookings: AdminBooking[];
};

export function LatestBookings({ bookings }: LatestBookingsProps) {
  const [items, setItems] = useState(bookings.slice(0, 5));

  function updateStatus(id: string, status: BookingStatus) {
    setItems((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      ),
    );
  }

  return (
    <section className="mt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white">أحدث طلبات الحجز</h2>
        <Link
          href="/admin/bookings"
          className="flex items-center gap-1.5 text-sm font-bold text-gold transition hover:text-gold-light"
        >
          عرض الكل
          <ArrowLeft size={17} />
        </Link>
      </div>

      <div className="mt-3 space-y-3">
        {items.map((booking) => (
          <div
            key={booking.id}
            className="rounded-[18px] border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black text-white">
                    {booking.studentName}
                  </p>
                  <span className="text-xs font-bold text-muted">
                    {booking.grade}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-gold">
                  {booking.subject} · {booking.teacherName}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {booking.schedule} — {booking.date}
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            {booking.status === "pending" ? (
              <div className="mt-3 flex gap-2 border-t border-border pt-3">
                <button
                  type="button"
                  onClick={() => updateStatus(booking.id, "confirmed")}
                  className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-success/25 bg-success/10 text-sm font-black text-success transition hover:bg-success/15"
                >
                  <Check size={18} />
                  قبول
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(booking.id, "cancelled")}
                  className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-danger/25 bg-danger/10 text-sm font-black text-danger transition hover:bg-danger/15"
                >
                  <X size={18} />
                  رفض
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
