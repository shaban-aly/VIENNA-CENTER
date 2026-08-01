"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { Button, Card, Input, Select } from "@/components/ui";
import { classLeval, subjects, teachers } from "@/data/mock";
import {
  useBookingForm,
  type BookingInitialStudent,
} from "@/hooks/booking/use-booking-form";
import { formatSchedule } from "@/lib/utils";

type BookingFormProps = {
  initialTeacherId?: string;
  initialSubjectId?: string;
  initialStudent?: BookingInitialStudent;
};

export function BookingForm({
  initialTeacherId = "",
  initialSubjectId = "",
  initialStudent,
}: BookingFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    resetForm,
    handleSubmit,
  } = useBookingForm(initialTeacherId, initialSubjectId, initialStudent);

  if (isSubmitted) {
    return <BookingSuccess onReset={resetForm} />;
  }

  const selectedTeacher = teachers.find((item) => item.id === values.teacherId);
  const scheduleOptions = selectedTeacher
    ? selectedTeacher.schedules.map((schedule) => ({
        schedule,
        teacher: selectedTeacher,
      }))
    : teachers.flatMap((teacher) =>
        teacher.schedules.map((schedule) => ({ schedule, teacher })),
      );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Field label="اسم الطالب" error={errors.studentName}>
          <Input
            placeholder="مثال: أحمد محمد"
            value={values.studentName}
            onChange={(event) => updateField("studentName", event.target.value)}
            error={Boolean(errors.studentName)}
          />
        </Field>

        <Field label="رقم الهاتف" error={errors.phone}>
          <Input
            type="tel"
            inputMode="tel"
            placeholder="01xxxxxxxxx"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            error={Boolean(errors.phone)}
          />
        </Field>

        <Field label="الصف الدراسي" error={errors.gradeId}>
          <Select
            value={values.gradeId}
            onChange={(event) => updateField("gradeId", event.target.value)}
            error={Boolean(errors.gradeId)}
          >
            <option value="" disabled>
              اختر الصف الدراسي
            </option>
            {classLeval.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.title}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="المادة" error={errors.subjectId}>
          <Select
            value={values.subjectId}
            onChange={(event) => updateField("subjectId", event.target.value)}
            error={Boolean(errors.subjectId)}
          >
            <option value="" disabled>
              اختر المادة
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="المدرس" error={errors.teacherId}>
          <Select
            value={values.teacherId}
            onChange={(event) => updateField("teacherId", event.target.value)}
            error={Boolean(errors.teacherId)}
          >
            <option value="" disabled>
              اختر المدرس
            </option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="الموعد" error={errors.scheduleId}>
          <Select
            value={values.scheduleId}
            onChange={(event) => updateField("scheduleId", event.target.value)}
            error={Boolean(errors.scheduleId)}
          >
            <option value="" disabled>
              {selectedTeacher
                ? "اختر الموعد"
                : "اختر المدرس أولاً لرؤية المواعيد"}
            </option>
            {scheduleOptions.map(({ schedule, teacher }) => (
              <option key={schedule.id} value={schedule.id}>
                {selectedTeacher
                  ? formatSchedule(schedule.dayOfWeek, schedule.startTime)
                  : `${teacher.name} - ${formatSchedule(schedule.dayOfWeek, schedule.startTime)}`}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-muted">
          ملاحظات اختيارية
        </label>
        <textarea
          placeholder="أي تفاصيل إضافية تريد إخبارنا بها"
          value={values.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className="min-h-28 w-full rounded-[14px] border border-border bg-card-secondary px-4 py-4 text-right text-sm text-white outline-none transition placeholder:text-muted focus:border-gold"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <CheckCircle2 size={22} />
        )}
        {isSubmitting ? "جارٍ إرسال الطلب..." : "تأكيد الحجز"}
      </Button>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-muted">{label}</label>
      {children}
      {error ? (
        <p className="text-xs font-bold text-danger">{error}</p>
      ) : null}
    </div>
  );
}

function BookingSuccess({ onReset }: { onReset: () => void }) {
  return (
    <Card className="border-gold/40 p-6 text-center">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-success/40 bg-success/10">
        <CheckCircle2 size={44} className="text-success" />
      </div>

      <h2 className="mt-4 text-xl font-black text-white">
        تم إرسال طلب الحجز بنجاح
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        طلبك الآن قيد المراجعة. سيتم التواصل معك قريباً لتأكيد الموعد.
      </p>

      <div className="mt-6 grid gap-3">
        <Link href="/mybooking" className="block">
          <Button className="w-full">
            <CalendarCheck size={20} />
            متابعة حجوزاتي
          </Button>
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="min-h-14 rounded-2xl border border-gold/30 bg-gold/10 px-6 text-base font-bold text-gold transition hover:bg-gold/15"
        >
          إرسال حجز آخر
        </button>
      </div>
    </Card>
  );
}
