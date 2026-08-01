"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DRAWER_PARAM = "more";

export function useMoreDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get(DRAWER_PARAM) === "1";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function buildUrl(open: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set(DRAWER_PARAM, "1");
    } else {
      params.delete(DRAWER_PARAM);
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  function openDrawer() {
    if (!isOpen) {
      router.push(buildUrl(true));
    }
  }

  function closeDrawer() {
    if (isOpen) {
      router.push(buildUrl(false));
    }
  }

  function toggleDrawer() {
    router.push(buildUrl(!isOpen));
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
