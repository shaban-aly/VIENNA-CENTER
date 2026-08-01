import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { classLeval } from "@/data/mock";
import { useAuth } from "@/hooks/auth/use-auth";
import type { StudentProfile } from "@/types/content";

type EditProfileValues = {
  avatarUrl: string;
  name: string;
  gradeId: string;
  phone: string;
};

type EditProfileErrors = Partial<
  Record<"name" | "gradeId" | "phone" | "avatar", string>
>;

const PHONE_REGEX = /^01[0-9]{9}$/;

export function useEditProfileForm(initialProfile: StudentProfile) {
  const initialGradeId =
    classLeval.find((grade) => grade.title === initialProfile.grade)?.id ?? "";

  const [values, setValues] = useState<EditProfileValues>({
    avatarUrl: initialProfile.avatarUrl ?? "",
    name: initialProfile.name,
    gradeId: initialGradeId,
    phone: initialProfile.phone,
  });
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateProfile } = useAuth();
  const router = useRouter();

  function updateField(field: keyof EditProfileValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleAvatarChange(file: File | null) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "اختر ملف صورة صالحاً" }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setValues((prev) => ({
        ...prev,
        avatarUrl: String(reader.result),
      }));
      setErrors((prev) => ({ ...prev, avatar: undefined }));
    };

    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const next: EditProfileErrors = {};

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

    updateProfile({
      name: values.name.trim(),
      grade: gradeTitle,
      phone: values.phone.trim(),
      avatarUrl: values.avatarUrl || undefined,
    });

    router.push("/profile");
    router.refresh();
  }

  return {
    values,
    errors,
    isSubmitting,
    updateField,
    handleAvatarChange,
    handleSubmit,
  };
}
