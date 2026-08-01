import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useLoginForm() {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  function updateField(field: keyof LoginValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: LoginErrors = {};

    if (!values.email.trim()) {
      next.email = "البريد الإلكتروني مطلوب";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      next.email = "أدخل بريداً إلكترونياً صحيحاً";
    }

    if (!values.password) {
      next.password = "كلمة المرور مطلوبة";
    } else if (values.password.length < 6) {
      next.password = "كلمة المرور 6 أحرف على الأقل";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function enterApp(email: string) {
    signIn(email);
    router.push("/");
    router.refresh();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    enterApp(values.email.trim());
  }

  async function handleGoogle() {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsGoogleLoading(false);
    enterApp("student@gmail.com");
  }

  return {
    values,
    errors,
    isSubmitting,
    isGoogleLoading,
    updateField,
    handleSubmit,
    handleGoogle,
  };
}
