"use client";

import Link from "next/link";
import { Loader2, Mail, UserPlus } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useSignupForm } from "@/hooks/auth/use-signup-form";
import { AuthDivider } from "./auth-divider";
import { AuthField } from "./auth-field";
import { GoogleButton } from "./google-button";
import { PasswordInput } from "./password-input";

export function SignupForm() {
  const {
    values,
    errors,
    isSubmitting,
    isGoogleLoading,
    updateField,
    handleSubmit,
    handleGoogle,
  } = useSignupForm();

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-black text-white">إنشاء حساب</h1>
        <p className="mt-2 text-sm font-bold text-muted">
          سجّل بياناتك لبدء الحجز في سنتر فيينا
        </p>
      </header>

      <div className="space-y-5">
        <GoogleButton onClick={handleGoogle} loading={isGoogleLoading} />

        <AuthDivider />

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthField label="البريد الإلكتروني" error={errors.email}>
            <div className="relative">
              <Input
                type="email"
                dir="ltr"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                error={Boolean(errors.email)}
                className="pl-12 text-left"
              />
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold"
              />
            </div>
          </AuthField>

          <AuthField label="كلمة المرور" error={errors.password}>
            <PasswordInput
              value={values.password}
              onChange={(value) => updateField("password", value)}
              placeholder="6 أحرف على الأقل"
              error={Boolean(errors.password)}
            />
          </AuthField>

          <AuthField label="تأكيد كلمة المرور" error={errors.confirmPassword}>
            <PasswordInput
              value={values.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              placeholder="أعد كتابة كلمة المرور"
              error={Boolean(errors.confirmPassword)}
            />
          </AuthField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <UserPlus size={22} />
            )}
            {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
          </Button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm font-bold text-muted">
        لديك حساب بالفعل؟{" "}
        <Link
          href="/auth/login"
          className="font-black text-gold transition hover:text-gold-light"
        >
          سجّل دخولك
        </Link>
      </p>
    </>
  );
}
