import { adminBookings } from "@/data/admin";
import { BookingsManager } from "@/components/admin/bookings-manager";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-bold text-gold">لوحة التحكم</p>
        <h1 className="mt-1 text-2xl font-black text-white">إدارة الحجوزات</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          راجع طلبات الحجز وقم بقبولها أو رفضها.
        </p>
      </header>

      <BookingsManager bookings={adminBookings} />
    </div>
  );
}
