"use client";

import { GraduationCap, Loader2, Mail, Phone, UserRound } from "lucide-react";
import { Button, Input, Select } from "@/components/ui";
import { classLeval } from "@/data/mock";
import { useCompleteProfileForm } from "@/hooks/auth/use-complete-profile-form";
import { AuthField } from "./auth-field";

type CompleteProfileFormProps = {
  email: string;
};

export function CompleteProfileForm({ email }: CompleteProfileFormProps) {
  const { values, errors, isSubmitting, updateField, handleSubmit } =
    useCompleteProfileForm();

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-black text-white">استكمال بياناتك</h1>
        <p className="mt-2 text-sm font-bold text-muted">
          أكمل بياناتك الأساسية لتفعيل حسابك والحجز
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField label="البريد الإلكتروني">
          <div
            dir="ltr"
            className="flex min-h-14 w-full items-center gap-2.5 rounded-[14px] border border-border bg-card-secondary px-4 text-left text-sm font-bold text-muted"
          >
            <Mail size={17} className="shrink-0 text-gold" />
            <span className="truncate">{email}</span>
          </div>
        </AuthField>

        <AuthField label="الاسم الكامل" error={errors.name}>
          <div className="relative">
            <Input
              placeholder="مثال: أحمد محمد"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              error={Boolean(errors.name)}
              className="pr-12"
            />
            <UserRound
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gold"
            />
          </div>
        </AuthField>

        <AuthField label="الصف الدراسي" error={errors.gradeId}>
          <div className="relative">
            <Select
              value={values.gradeId}
              onChange={(event) => updateField("gradeId", event.target.value)}
              error={Boolean(errors.gradeId)}
              className="pr-12"
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
            <GraduationCap
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold"
            />
          </div>
        </AuthField>

        <AuthField label="رقم الهاتف" error={errors.phone}>
          <div className="relative">
            <Input
              type="tel"
              inputMode="tel"
              dir="ltr"
              placeholder="01xxxxxxxxx"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              error={Boolean(errors.phone)}
              className="pr-12 text-left"
            />
            <Phone
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gold"
            />
          </div>
        </AuthField>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 size={22} className="animate-spin" />
          ) : (
            <UserRound size={22} />
          )}
          {isSubmitting ? "جارٍ الحفظ..." : "حفظ ومتابعة"}
        </Button>
      </form>
    </>
  );
}
