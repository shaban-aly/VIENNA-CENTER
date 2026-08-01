import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { classLeval } from "@/data/mock";
import { useAuth } from "@/hooks/auth/use-auth";

type CompleteProfileValues = {
  name: string;
  gradeId: string;
  phone: string;
};

type CompleteProfileErrors = Partial<Record<keyof CompleteProfileValues, string>>;

const PHONE_REGEX = /^01[0-9]{9}$/;

export function useCompleteProfileForm() {
  const [values, setValues] = useState<CompleteProfileValues>({
    name: "",
    gradeId: "",
    phone: "",
  });
  const [errors, setErrors] = useState<CompleteProfileErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { completeProfile } = useAuth();
  const router = useRouter();

  function updateField(field: keyof CompleteProfileValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: CompleteProfileErrors = {};

    if (!values.name.trim()) {
      next.name = "الاسم مطلوب";
    } else if (values.name.trim().length < 3) {
      next.name = "أدخل الاسم كاملاً";
    }

    if (!values.gradeId) {
      next.gradeId = "اختر الصف الدراسي";
    }

    if (!values.phone.trim()) {
      next.phone = "رقم الهاتف مطلوب";
    } else if (!PHONE_REGEX.test(values.phone.trim())) {
      next.phone = "أدخل رقم هاتف صحيح (11 رقم يبدأ بـ 01)";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const gradeTitle =
      classLeval.find((grade) => grade.id === values.gradeId)?.title ?? "";

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);

    completeProfile({
      name: values.name.trim(),
      grade: gradeTitle,
      phone: values.phone.trim(),
    });

    router.push("/");
    router.refresh();
  }

  return {
    values,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
}
