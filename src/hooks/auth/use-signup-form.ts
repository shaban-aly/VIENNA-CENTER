import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/use-auth";

type SignupValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = Partial<Record<keyof SignupValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useSignupForm() {
  const [values, setValues] = useState<SignupValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  function updateField(field: keyof SignupValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: SignupErrors = {};

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

    if (!values.confirmPassword) {
      next.confirmPassword = "أعد كتابة كلمة المرور";
    } else if (values.confirmPassword !== values.password) {
      next.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function continueToCompleteProfile(email: string) {
    signUp(email);
    router.push("/auth/complete-profile");
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
    continueToCompleteProfile(values.email.trim());
  }

  async function handleGoogle() {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsGoogleLoading(false);
    continueToCompleteProfile("student@gmail.com");
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
