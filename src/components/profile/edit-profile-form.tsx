"use client";

import { useRef } from "react";
import { Camera, Loader2, Save } from "lucide-react";
import { AuthField } from "@/components/auth/auth-field";
import { Button, Input, Select } from "@/components/ui";
import { classLeval } from "@/data/mock";
import { useEditProfileForm } from "@/hooks/profile/use-edit-profile-form";
import type { StudentProfile } from "@/types/content";

type EditProfileFormProps = {
  initialProfile: StudentProfile;
};

export function EditProfileForm({ initialProfile }: EditProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    values,
    errors,
    isSubmitting,
    updateField,
    handleAvatarChange,
    handleSubmit,
  } = useEditProfileForm(initialProfile);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="flex flex-col items-center rounded-[22px] border border-gold/25 bg-[linear-gradient(160deg,rgba(212,160,23,0.12),rgba(17,17,17,0.95)_48%)] p-6 text-center">
        <div className="relative">
          <div className="flex size-28 items-center justify-center overflow-hidden rounded-3xl border border-gold/45 bg-black text-5xl font-black text-gold shadow-[0_0_36px_rgba(212,160,23,0.18)]">
            {values.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values.avatarUrl}
                alt="الصورة الشخصية"
                className="h-full w-full object-cover"
              />
            ) : (
              initialProfile.name.trim().charAt(0)
            )}
          </div>

          <button
            type="button"
            aria-label="تغيير الصورة الشخصية"
            className="absolute -bottom-2 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-2xl border border-gold/40 bg-gold text-black shadow-[0_8px_24px_rgba(212,160,23,0.35)] transition hover:bg-gold-light"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={20} />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleAvatarChange(event.target.files?.[0] ?? null)}
        />

        <p className="mt-5 text-sm font-bold text-muted">
          اضغط على الكاميرا لتغيير الصورة
        </p>
        {errors.avatar ? (
          <p className="mt-1 text-xs font-bold text-danger">{errors.avatar}</p>
        ) : null}
      </div>

      <div className="space-y-4">
        <AuthField label="الاسم الكامل" error={errors.name}>
          <Input
            placeholder="مثال: أحمد محمد"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            error={Boolean(errors.name)}
          />
        </AuthField>

        <AuthField label="رقم الهاتف" error={errors.phone}>
          <Input
            type="tel"
            inputMode="tel"
            dir="ltr"
            placeholder="01xxxxxxxxx"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            error={Boolean(errors.phone)}
            className="text-left"
          />
        </AuthField>

        <AuthField label="الصف الدراسي" error={errors.gradeId}>
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
        </AuthField>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Save size={22} />
        )}
        {isSubmitting ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
