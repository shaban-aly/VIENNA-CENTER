"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className = "" }: SignOutButtonProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className={`flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-red-500/25 bg-red-500/10 text-sm font-black text-red-400 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto ${className}`}
    >
      {isSigningOut ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <LogOut size={20} />
      )}
      تسجيل الخروج
    </button>
  );
}
