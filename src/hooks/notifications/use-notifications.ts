import { useMemo, useState } from "react";
import type { AppNotification } from "@/types/content";

const READ_NOTIFICATIONS_STORAGE_KEY = "vienna-center-read-notifications";

export type ViewNotification = AppNotification & { isUnread: boolean };

function readStoredNotificationIds() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const storedValue = window.localStorage.getItem(READ_NOTIFICATIONS_STORAGE_KEY);
    const parsedValue = storedValue ? (JSON.parse(storedValue) as string[]) : [];

    return new Set(parsedValue);
  } catch {
    return new Set<string>();
  }
}

function writeStoredNotificationIds(readIds: Set<string>) {
  window.localStorage.setItem(
    READ_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify(Array.from(readIds)),
  );
}

export function useNotifications(initialNotifications: AppNotification[]) {
  const [readIds, setReadIds] = useState<Set<string>>(readStoredNotificationIds);

  const notifications = useMemo<ViewNotification[]>(
    () =>
      initialNotifications.map((notification) => ({
        ...notification,
        isUnread: notification.readAt == null && !readIds.has(notification.id),
      })),
    [initialNotifications, readIds],
  );

  const unreadCount = notifications.filter((notification) => notification.isUnread).length;

  function markAsRead(id: string) {
    setReadIds((previousIds) => {
      if (previousIds.has(id)) {
        return previousIds;
      }

      const nextIds = new Set(previousIds);
      nextIds.add(id);
      writeStoredNotificationIds(nextIds);

      return nextIds;
    });
  }

  function markAllAsRead() {
    setReadIds(() => {
      const nextIds = new Set(initialNotifications.map((notification) => notification.id));
      writeStoredNotificationIds(nextIds);

      return nextIds;
    });
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
