"use client";

import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { announcements } from "@/data/mock";
import { Card, SectionHeader } from "@/components/ui";
import { useAnnouncementsCarousel } from "@/hooks/home/use-announcements-carousel";

export function AnnouncementsSection() {
  const {
    activeIndex,
    activeAnnouncement,
    setActiveIndex,
    showPreviousAnnouncement,
    showNextAnnouncement,
  } = useAnnouncementsCarousel({ announcements });

  return (
    <section id="announcements" className="scroll-mt-6">
      <SectionHeader title="إعلانات سنتر فيينا" />

      <div className="grid items-center gap-3 lg:grid-cols-[minmax(120px,0.35fr)_minmax(520px,1fr)_minmax(120px,0.35fr)]">
        <div className="hidden justify-self-end lg:block">
          <button
            type="button"
            aria-label="الإعلان السابق"
            className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-gold transition hover:border-gold/60"
            onClick={showPreviousAnnouncement}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <Card className="relative flex min-h-28 items-center gap-4 overflow-hidden border-gold/25 bg-card-secondary p-4 lg:col-start-2">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
            <Megaphone className="text-gold" size={25} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-base font-black text-white md:text-lg">
              {activeAnnouncement.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm leading-6 text-muted">
              {activeAnnouncement.body}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {announcements.map((announcement, index) => (
                <button
                  key={announcement.id}
                  type="button"
                  aria-label={`عرض إعلان ${index + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    index === activeIndex ? "w-8 bg-gold" : "w-2.5 bg-border"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="الإعلان التالي"
            className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-black/20 text-gold transition hover:border-gold/60 lg:hidden"
            onClick={showNextAnnouncement}
          >
            <ChevronLeft size={20} />
          </button>
        </Card>

        <div className="hidden justify-self-start lg:block">
          <button
            type="button"
            aria-label="الإعلان التالي"
            className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-gold transition hover:border-gold/60"
            onClick={showNextAnnouncement}
          >
            <ChevronLeft size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
