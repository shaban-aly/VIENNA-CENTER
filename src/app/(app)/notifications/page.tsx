import { PageHeader } from "@/components/layout/page-header";
import { NotificationsList } from "@/components/notifications/notifications-list";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title="الإشعارات" />
      <NotificationsList />
    </>
  );
}
