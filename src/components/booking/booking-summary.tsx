import { CalendarCheck, ClipboardList } from "lucide-react";
import { Card } from "@/components/ui";

const steps = [
  {
    title: "اختر الصف والمادة",
    description: "حدد المادة الدراسية والصف المناسب لك.",
  },
  {
    title: "اختر المدرس والموعد",
    description: "اختر المدرس والموعد المتاح حسب جدولك.",
  },
  {
    title: "أكّد طلبك",
    description: "أرسل الطلب وسيتواصل معك فريق المركز.",
  },
];

export function BookingSummary() {
  return (
    <div className="space-y-4">
      <Card className="hover:border-border">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-gold" size={22} />
          <h2 className="text-base font-black text-white">خطوات الحجز</h2>
        </div>

        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-sm font-black text-gold">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-white">{step.title}</p>
                <p className="mt-1 text-xs leading-6 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="flex items-center gap-4 border-gold/40">
        <CalendarCheck className="shrink-0 text-gold" size={34} />
        <p className="text-sm leading-7 text-muted">
          بعد إرسال الطلب سيظهر في لوحة تحكم الإدارة بحالة قيد المراجعة.
        </p>
      </Card>
    </div>
  );
}
