"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, CalendarCheck, Clock, Megaphone, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { AppNotification } from "@/types/content";
import type { ViewNotification } from "@/hooks/notifications/use-notifications";

type NotificationsMenuProps = {
  notifications: ViewNotification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
};

const notificationIcons: Record<AppNotification["type"], LucideIcon> = {
  booking: CalendarCheck,
  schedule: Clock,
  announcement: Megaphone,
  message: MessageCircle,
};

export function NotificationsMenu({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationsMenuProps) {
  const router = useRouter();

  function handleNotificationClick(notification: ViewNotification) {
    onMarkAsRead(notification.id);
    onClose();

    if (notification.link) {
      router.push(notification.link);
    }
  }

  return (
    <div className="absolute left-0 top-full z-40 mt-3 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-[22px] border border-border bg-[#0b0b0b]/98 text-right shadow-[0_22px_50px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          type="button"
          className="text-xs font-black text-gold transition hover:text-gold-light disabled:cursor-not-allowed disabled:text-muted"
          disabled={unreadCount === 0}
          onClick={onMarkAllAsRead}
        >
          قراءة الكل
        </button>
        <h2 className="text-lg font-black text-gold">الإشعارات</h2>
      </div>

      {notifications.length > 0 ? (
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleNotificationClick(notification)}
                className="flex w-full gap-3 border-b border-border px-4 py-3 text-right transition last:border-b-0 hover:bg-card"
              >
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                  <Icon size={21} strokeWidth={1.8} />
                  {notification.isUnread ? (
                    <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#0b0b0b] bg-gold" />
                  ) : null}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-white">
                    {notification.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted">
                    {notification.body}
                  </span>
                  <span className="mt-2 block text-[11px] font-bold text-gold">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
          <Bell className="mb-3 text-gold" size={32} />
          <p className="font-bold text-white">لا توجد إشعارات حالياً</p>
          <p className="mt-2 text-xs text-muted">أي تحديث جديد سيظهر هنا.</p>
        </div>
      )}

      <Link
        href="/notifications"
        className="flex min-h-12 w-full items-center justify-center border-t border-border text-sm font-black text-gold transition hover:bg-card"
        onClick={onClose}
      >
        عرض كل الإشعارات
      </Link>
    </div>
  );
}
