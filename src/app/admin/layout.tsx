import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getMockUser();

  if (!user) {
    redirect("/auth/login");
  }

  // TODO: enforce admin role from Supabase Auth once connected.

  return <AdminShell>{children}</AdminShell>;
}
