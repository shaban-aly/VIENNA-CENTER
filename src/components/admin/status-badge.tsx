import type { BookingStatus } from "@/types/content";

const statusStyles: Record<BookingStatus, string> = {
  pending: "border-gold/40 bg-gold/10 text-gold",
  confirmed: "border-success/40 bg-success/10 text-success",
  cancelled: "border-danger/40 bg-danger/10 text-danger",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "قيد المراجعة",
  confirmed: "مقبول",
  cancelled: "مرفوض",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${statusStyles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
