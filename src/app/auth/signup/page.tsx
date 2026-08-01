import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { getMockUser } from "@/lib/mock-auth-server";

export default async function SignupPage() {
  const user = await getMockUser();

  if (user) {
    redirect(user.session.profileComplete ? "/" : "/auth/complete-profile");
  }

  return <SignupForm />;
}
