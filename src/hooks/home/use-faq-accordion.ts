import { useState } from "react";

export function useFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggleItem(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return { openId, toggleItem };
}
