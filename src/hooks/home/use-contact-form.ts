import { FormEvent, useState } from "react";

type ContactFormState = {
  name: string;
  phone: string;
  message: string;
};

const initialContactForm: ContactFormState = {
  name: "",
  phone: "",
  message: "",
};

export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialContactForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSending(false);
    setSent(true);
    setForm(initialContactForm);
  }

  function resetSentState() {
    setSent(false);
  }

  return {
    form,
    sending,
    sent,
    updateField,
    handleSubmit,
    resetSentState,
  };
}
