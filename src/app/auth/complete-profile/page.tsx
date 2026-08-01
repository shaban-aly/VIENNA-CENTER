import { redirect } from "next/navigation";
import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function CompleteProfilePage() {
  const user = await getMockUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.session.profileComplete) {
    redirect("/");
  }

  return <CompleteProfileForm email={user.session.email} />;
}
