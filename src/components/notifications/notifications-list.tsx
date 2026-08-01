"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarCheck,
  CheckCheck,
  Clock,
  Megaphone,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { notifications as initialNotifications } from "@/data/mock";
import { useNotifications } from "@/hooks/notifications/use-notifications";
import type { ViewNotification } from "@/hooks/notifications/use-notifications";
import { formatRelativeTime } from "@/lib/utils";
import type { AppNotification } from "@/types/content";

const notificationIcons: Record<AppNotification["type"], LucideIcon> = {
  booking: CalendarCheck,
  schedule: Clock,
  announcement: Megaphone,
  message: MessageCircle,
};

export function NotificationsList() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(initialNotifications);

  function handleNotificationClick(notification: ViewNotification) {
    markAsRead(notification.id);

    if (notification.link) {
      router.push(notification.link);
    }
  }

  function handleNotificationKeyDown(
    event: KeyboardEvent<HTMLElement>,
    notification: ViewNotification,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNotificationClick(notification);
    }
  }

  return (
    <div className="space-y-4 px-5 py-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-muted">
          {unreadCount > 0 ? `${unreadCount} إشعارات جديدة` : "كل الإشعارات مقروءة"}
        </p>
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 text-sm font-black text-gold transition hover:bg-gold/15 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={unreadCount === 0}
          onClick={markAllAsRead}
        >
          <CheckCheck size={18} />
          قراءة الكل
        </button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <article
                key={notification.id}
                role="button"
                tabIndex={0}
                aria-label={notification.title}
                onClick={() => handleNotificationClick(notification)}
                onKeyDown={(event) => handleNotificationKeyDown(event, notification)}
                className={`cursor-pointer rounded-[18px] border p-4 text-right transition ${
                  notification.isUnread
                    ? "border-gold/40 bg-gold/10 hover:bg-gold/15"
                    : "border-border bg-card hover:border-gold/30"
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-black/45 text-gold">
                    <Icon size={23} strokeWidth={1.8} />
                    {notification.isUnread ? (
                      <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#0b0b0b] bg-gold" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-black text-white">{notification.title}</h2>
                      <span className="shrink-0 text-[11px] font-bold text-gold">
                        {formatRelativeTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted">{notification.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-[18px] border border-border bg-card px-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <Bell className="text-gold" size={32} />
          </div>
          <p className="mt-4 text-base font-black text-white">لا توجد إشعارات حالياً</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            أي تحديث جديد من المركز سيظهر هنا.
          </p>
        </div>
      )}
    </div>
  );
}
