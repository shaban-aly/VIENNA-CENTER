import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
};

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-muted">{title}</p>
          <p className="mt-1 text-2xl font-black text-white">{value}</p>
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
          <Icon className="text-gold" size={24} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
