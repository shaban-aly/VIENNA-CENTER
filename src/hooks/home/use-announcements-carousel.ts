import { useEffect, useState } from "react";
import type { Announcement } from "@/types/content";

type UseAnnouncementsCarouselOptions = {
  announcements: Announcement[];
  intervalMs?: number;
};

export function useAnnouncementsCarousel({
  announcements,
  intervalMs = 4500,
}: UseAnnouncementsCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAnnouncement = announcements[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % announcements.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [announcements.length, intervalMs]);

  function showPreviousAnnouncement() {
    setActiveIndex(
      (current) => (current - 1 + announcements.length) % announcements.length,
    );
  }

  function showNextAnnouncement() {
    setActiveIndex((current) => (current + 1) % announcements.length);
  }

  return {
    activeIndex,
    activeAnnouncement,
    setActiveIndex,
    showPreviousAnnouncement,
    showNextAnnouncement,
  };
}
