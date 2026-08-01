"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarCheck,
  Home,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { NotificationsMenu } from "@/components/home/notifications-menu";
import { notifications as initialNotifications } from "@/data/mock";
import { useAuth } from "@/hooks/auth/use-auth";
import { useNotificationsMenu } from "@/hooks/home/use-notifications-menu";
import { useNotifications } from "@/hooks/notifications/use-notifications";

const topNavItems = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/mybooking", label: "حجوزاتي", icon: CalendarCheck },
  { href: "/subjects", label: "المواد", icon: BookOpen },
  { href: "/teachers", label: "المدرسون", icon: UserRound },
  { href: "/#contact", label: "تواصل معنا", icon: MessageCircle },
];

export function TopNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();
  const avatarInitial = user?.profile.name.trim().charAt(0) ?? "";
  const { isOpen, menuRef, toggleMenu, closeMenu } = useNotificationsMenu();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(initialNotifications);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[#090909]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-vienna.png"
            alt="Vienna Center"
            width={62}
            height={62}
            priority
            className="h-12 w-12 object-contain drop-shadow-[0_0_20px_rgba(212,160,23,0.22)] lg:h-14 lg:w-14"
          />
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-black text-gold sm:text-base lg:text-lg">
              VIENNA CENTER
            </p>
            <p className="text-[11px] font-bold text-muted lg:text-xs">
              سنتر فيينا التعليمي
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-2xl border border-border bg-card/75 p-1 lg:flex">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
                  isActive
                    ? "bg-gold text-black"
                    : "text-muted hover:bg-card-secondary hover:text-gold"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-label="الإشعارات"
                aria-expanded={isOpen}
                className="relative flex size-11 items-center justify-center rounded-2xl border border-border bg-card/80 text-gold transition hover:border-gold/60"
                onClick={toggleMenu}
              >
                <Bell size={21} />
                {unreadCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border-2 border-black bg-gold text-[10px] font-black text-black">
                    {unreadCount}
                  </span>
                ) : null}
              </button>

              {isOpen ? (
                <NotificationsMenu
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onClose={closeMenu}
                />
              ) : null}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-4 text-sm font-black text-gold transition hover:bg-gold/15 lg:hidden"
            >
              <UserRound size={18} />
              تسجيل الدخول
            </Link>
          )}

          <Link
            href="/booking"
            className="hidden min-h-12 items-center justify-center gap-2 rounded-2xl bg-gold px-5 text-sm font-black text-black transition hover:bg-gold-light lg:flex"
          >
            <CalendarCheck size={19} />
            احجز الآن
          </Link>

          {user ? (
            <Link
              href="/profile"
              aria-label="الملف الشخصي"
              className="hidden items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 transition hover:border-gold/50 lg:flex"
            >
              <div className="flex size-10 items-center justify-center rounded-xl border border-gold/35 bg-black text-lg font-black text-gold">
                {avatarInitial}
              </div>
              <div className="min-w-0 leading-tight">
                <p className="max-w-32 truncate text-sm font-black text-white">
                  {user.profile.name}
                </p>
                <p className="max-w-32 truncate text-xs font-bold text-muted">
                  {user.profile.grade}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden min-h-12 items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-5 text-sm font-black text-gold transition hover:bg-gold/15 lg:flex"
            >
              <UserRound size={19} />
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
