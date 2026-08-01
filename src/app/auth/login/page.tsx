import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function LoginPage() {
  const user = await getMockUser();

  if (user) {
    redirect(user.session.profileComplete ? "/" : "/auth/complete-profile");
  }

  return <LoginForm />;
}
