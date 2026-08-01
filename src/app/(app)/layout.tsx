import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getMockUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.session.profileComplete) {
    redirect("/auth/complete-profile");
  }

  return <AppShell>{children}</AppShell>;
}
