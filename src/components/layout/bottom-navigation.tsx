"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarCheck,
  Home,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { useMoreDrawer } from "@/hooks/layout/use-more-drawer";
import { MoreDrawer } from "./more-drawer";

const items = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/subjects", label: "المواد", icon: BookOpen },
  { href: "/teachers", label: "المدرسون", icon: UserRound },
  { href: "/mybooking", label: "حجوزاتي", icon: CalendarCheck },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const { isOpen, openDrawer, closeDrawer } = useMoreDrawer();

  return (
    <>
      <MoreDrawer isOpen={isOpen} onClose={closeDrawer} />

      <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md border-x border-t border-border bg-[#0b0b0b]/95 px-2 pb-2 backdrop-blur md:max-w-2xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-full flex-col items-center justify-center gap-1 pt-2 rounded-t-xs  text-[11px] font-semibold transition ${
                  isActive
                    ? "border-t-2 border-gold text-gold"
                    : "text-muted hover:text-gold"
                }`}
              >
                <Icon size={22} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            className={`flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition ${
              isOpen ? "bg-gold text-black" : "text-muted hover:text-gold"
            }`}
            onClick={openDrawer}
          >
            <MoreHorizontal size={22} strokeWidth={1.8} />
            <span>المزيد</span>
          </button>
        </div>
      </nav>
    </>
  );
}
