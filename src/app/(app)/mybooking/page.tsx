import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { BookingList } from "@/components/mybooking/booking-list";
import { bookings } from "@/data/mock";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function MyBooking() {
  const user = await getMockUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <PageHeader title="حجوزاتي" />
      <BookingList bookings={bookings} student={user.profile} />
    </>
  );
}
