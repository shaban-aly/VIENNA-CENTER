import { GraduationCap, Phone, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";
import type { StudentProfile } from "@/types/content";

type ProfileInfoProps = {
  student: StudentProfile;
};

type InfoItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  ltr?: boolean;
};

export function ProfileInfo({ student }: ProfileInfoProps) {
  const items: InfoItem[] = [
    { label: "الاسم", value: student.name, icon: UserRound },
    { label: "الصف الدراسي", value: student.grade, icon: GraduationCap },
    { label: "رقم الهاتف", value: student.phone, icon: Phone, ltr: true },
  ];

  return (
    <Card className="hover:border-border">
      <h2 className="text-base font-black text-white">بيانات الحساب</h2>
      <div className="mt-2 divide-y divide-border lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-3 lg:divide-y-0">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-3 py-3 lg:rounded-2xl lg:border lg:border-border lg:bg-card-secondary lg:p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                <Icon className="text-gold" size={19} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-muted">{item.label}</p>
                <p
                  className="mt-0.5 truncate text-sm font-black text-white"
                  dir={item.ltr ? "ltr" : undefined}
                >
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
