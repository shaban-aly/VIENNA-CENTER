import { useState } from "react";
import type { FormEvent } from "react";
import { teachers } from "@/data/mock";

export type BookingFormValues = {
  studentName: string;
  phone: string;
  gradeId: string;
  subjectId: string;
  teacherId: string;
  scheduleId: string;
  notes: string;
};

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

export type BookingInitialStudent = {
  name: string;
  phone: string;
  gradeId: string;
};

export const initialBookingValues = (
  initialTeacherId = "",
  initialSubjectId = "",
  initialStudent?: BookingInitialStudent,
): BookingFormValues => ({
  studentName: initialStudent?.name ?? "",
  phone: initialStudent?.phone ?? "",
  gradeId: initialStudent?.gradeId ?? "",
  subjectId: initialSubjectId,
  teacherId: initialTeacherId,
  scheduleId: "",
  notes: "",
});

const PHONE_REGEX = /^01[0-9]{9}$/;

function validate(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!values.studentName.trim()) {
    errors.studentName = "اسم الطالب مطلوب";
  }

  if (!values.phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "أدخل رقم هاتف صحيح (11 رقم يبدأ بـ 01)";
  }

  if (!values.gradeId) {
    errors.gradeId = "اختر الصف الدراسي";
  }

  if (!values.subjectId) {
    errors.subjectId = "اختر المادة";
  }

  if (!values.teacherId) {
    errors.teacherId = "اختر المدرس";
  }

  if (!values.scheduleId) {
    errors.scheduleId = "اختر الموعد";
  }

  return errors;
}

export function useBookingForm(
  initialTeacherId = "",
  initialSubjectId = "",
  initialStudent?: BookingInitialStudent,
) {
  const [values, setValues] = useState<BookingFormValues>(
    initialBookingValues(initialTeacherId, initialSubjectId, initialStudent),
  );
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: keyof BookingFormValues, value: string) {
    setValues((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "subjectId" && next.teacherId) {
        const teacher = teachers.find((item) => item.id === next.teacherId);

        if (teacher && !teacher.subjectIds.includes(value)) {
          next.teacherId = "";
          next.scheduleId = "";
        }
      }

      if (field === "teacherId") {
        next.scheduleId = "";
      }

      return next;
    });

    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function resetForm() {
    setValues(initialBookingValues(initialTeacherId, initialSubjectId, initialStudent));
    setErrors({});
    setIsSubmitted(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    resetForm,
    handleSubmit,
  };
}
