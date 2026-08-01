"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarCheck,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Menu,
  Megaphone,
  MessageSquareText,
  UsersRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { adminBookings, mockAdmin } from "@/data/admin";

type NavItem = {
  href?: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  disabled?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "الرئيسية",
    items: [
      { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
      {
        href: "/admin/bookings",
        label: "الحجوزات",
        icon: CalendarCheck,
        badge: adminBookings.filter((booking) => booking.status === "pending")
          .length,
      },
    ],
  },
  {
    title: "المحتوى",
    items: [
      { label: "المدرسون", icon: GraduationCap, disabled: true },
      { label: "المواد", icon: BookOpen, disabled: true },
      { label: "الطلاب", icon: UsersRound, disabled: true },
      { label: "الإعلانات", icon: Megaphone, disabled: true },
      { label: "رسائل التواصل", icon: MessageSquareText, disabled: true },
    ],
  },
];

function useActivePath() {
  const pathname = usePathname();

  return (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname.startsWith(href);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const isActive = useActivePath();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        className="flex min-h-16 items-center gap-3 border-b border-border px-5"
      >
        <Image
          src="/images/logo-vienna.png"
          alt="Vienna Center"
          width={58}
          height={58}
          className="size-10 object-contain"
        />
        <div>
          <p className="text-sm font-black text-gold">VIENNA CENTER</p>
          <p className="text-[11px] font-bold text-muted">لوحة تحكم الإدارة</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <section key={group.title}>
            <h3 className="mb-2 px-3 text-xs font-black text-muted">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.href ? isActive(item.href) : false;

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold text-muted/50"
                      title="قريباً"
                    >
                      <Icon size={20} strokeWidth={1.8} />
                      <span className="flex-1">{item.label}</span>
                      <Lock size={14} />
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={onNavigate}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
                      active
                        ? "border border-gold/25 bg-gold/10 text-gold"
                        : "text-muted hover:bg-card-secondary hover:text-white"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="flex size-6 items-center justify-center rounded-full bg-gold text-xs font-black text-black">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-[linear-gradient(135deg,rgba(212,160,23,0.16),rgba(17,17,17,0.95)_42%)] p-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-black text-lg font-black text-gold">
            {mockAdmin.name.trim().charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-white">
              {mockAdmin.name}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-gold">أدمن</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-bold text-muted transition hover:border-gold/50 hover:text-gold"
        >
          <ExternalLink size={18} />
          عرض الموقع
        </Link>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[268px_1fr]">
      <aside className="sticky top-0 hidden h-dvh border-l border-border bg-card lg:block">
        <SidebarContent />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur lg:hidden">
          <button
            type="button"
            aria-label="فتح القائمة"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-gold transition hover:border-gold/60"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-vienna.png"
              alt="Vienna Center"
              width={58}
              height={58}
              className="size-7 object-contain"
            />
            <p className="text-sm font-black text-gold">لوحة التحكم</p>
          </div>
          <Link
            href="/"
            aria-label="العودة إلى الموقع"
            className="flex size-10 items-center justify-center rounded-xl text-muted transition hover:bg-card hover:text-gold"
          >
            <ExternalLink size={20} />
          </Link>
        </header>

        <main className="p-5 lg:p-8">{children}</main>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="قائمة لوحة التحكم"
        inert={!drawerOpen}
        className={`fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm transition-[opacity,visibility] duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="absolute inset-0 h-full w-full"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-full max-w-[320px] flex-col border-l border-border bg-[#0b0b0b] shadow-[-20px_0_50px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-border bg-[#0b0b0b]/95 px-5 backdrop-blur">
            <button
              type="button"
              aria-label="إغلاق"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-card-secondary text-gold transition hover:border-gold/60"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-black text-gold">لوحة التحكم</h2>
          </header>
          <div className="flex-1 overflow-y-auto pb-8">
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </aside>
      </div>
    </div>
  );
}
