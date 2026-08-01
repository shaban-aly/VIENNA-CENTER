"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarCheck,
  ChevronLeft,
  FileText,
  Info,
  LogIn,
  LogOut,
  Megaphone,
  MessageCircle,
  ShieldQuestion,
  Star,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";

type DrawerLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type DrawerGroup = {
  title: string;
  links: DrawerLink[];
};

type MoreDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const drawerGroups: DrawerGroup[] = [
  {
    title: "حسابي",
    links: [
      { href: "/profile", label: "الملف الشخصي", icon: UserRound },
      { href: "/mybooking", label: "حجوزاتي", icon: CalendarCheck },
      { href: "/notifications", label: "الإشعارات", icon: Bell },
    ],
  },
  {
    title: "السنتر",
    links: [
      { href: "/#announcements", label: "الإعلانات", icon: Megaphone },
      { href: "/#testimonials", label: "آراء الطلاب", icon: Star },
      { href: "/#contact", label: "تواصل معنا", icon: MessageCircle },
      { href: "/#features", label: "لماذا تختارنا", icon: Info },
    ],
  },
  {
    title: "الدعم",
    links: [
      { href: "#faq", label: "الأسئلة الشائعة", icon: ShieldQuestion },
      { href: "/terms", label: "الشروط والأحكام", icon: FileText },
    ],
  },
];

export function MoreDrawer({ isOpen, onClose }: MoreDrawerProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  function handleSignOut() {
    signOut();
    onClose();
    router.push("/");
    router.refresh();
  }

  const avatarInitial = user?.profile.name.trim().charAt(0) ?? "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="قائمة المزيد"
      inert={!isOpen}
      className={`fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm transition-[opacity,visibility] duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="إغلاق المزيد"
        className="absolute inset-0 h-full w-full"
        onClick={onClose}
      />

      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col border-l border-border bg-[#0b0b0b] shadow-[-20px_0_50px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-border bg-[#0b0b0b]/95 px-5 backdrop-blur">
          <button
            type="button"
            aria-label="إغلاق"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card-secondary text-gold transition hover:border-gold/60"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-black text-gold">المزيد</h2>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-10">
          {user ? (
            <section className="mb-6 rounded-[22px] border border-gold/25 bg-[linear-gradient(135deg,rgba(212,160,23,0.16),rgba(17,17,17,0.95)_42%)] p-4">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-4"
              >
                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/40 bg-black text-3xl font-black text-gold">
                  {user.profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profile.avatarUrl}
                      alt={user.profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    avatarInitial
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-black text-white">
                    {user.profile.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {user.profile.grade}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-black text-gold">
                    <span className="size-1.5 rounded-full bg-gold" />
                    {user.profile.bookingStatus}
                  </span>
                </div>
                <ChevronLeft className="shrink-0 text-muted" size={20} />
              </Link>
            </section>
          ) : (
            <section className="mb-6 rounded-[22px] border border-gold/25 bg-[linear-gradient(135deg,rgba(212,160,23,0.16),rgba(17,17,17,0.95)_42%)] p-5 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-gold/40 bg-black text-gold">
                <UserRound size={26} strokeWidth={1.8} />
              </div>
              <p className="mt-3 text-lg font-black text-white">تسجيل الدخول</p>
              <p className="mt-1 text-xs font-bold text-muted">
                ادخل لحجز دروسك ومتابعة حجوزاتك
              </p>
              <Link
                href="/auth/login"
                onClick={onClose}
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gold px-6 text-sm font-black text-black transition hover:bg-gold-light"
              >
                <LogIn size={20} />
                تسجيل الدخول
              </Link>
            </section>
          )}

          <div className="space-y-5">
            {drawerGroups.map((group) => (
              <section key={group.title}>
                <h3 className="mb-3 text-sm font-black text-gold">
                  {group.title}
                </h3>
                <div className="overflow-hidden rounded-[18px] border border-border bg-card">
                  {group.links.map((link, index) => {
                    const Icon = link.icon;
                    const isLast = index === group.links.length - 1;

                    return (
                      <Link
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        className={`flex min-h-14 items-center gap-3 px-4 text-sm font-bold transition hover:bg-card-secondary ${
                          isLast ? "" : "border-b border-border"
                        }`}
                      >
                        <Icon
                          className="text-gold"
                          size={21}
                          strokeWidth={1.8}
                        />
                        <span className="flex-1">{link.label}</span>
                        <ChevronLeft className="text-muted" size={18} />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {user ? (
            <button
              type="button"
              className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-red-500/25 bg-red-500/10 text-sm font-black text-red-400 transition hover:bg-red-500/15"
              onClick={handleSignOut}
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
