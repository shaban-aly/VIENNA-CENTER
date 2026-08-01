"use client";

import { PencilLine } from "lucide-react";
import Link from "next/link";
import { Button, Skeleton } from "@/components/ui";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { PageHeader } from "@/components/layout/page-header";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileInfo } from "@/components/profile/profile-info";
import { ProfileStats } from "@/components/profile/profile-stats";
import { useAuth } from "@/hooks/auth/use-auth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <PageHeader title="الملف الشخصي" />
        <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-3xl lg:px-8">
          <Skeleton className="h-44 w-full" />
          <div className="mt-6 space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="الملف الشخصي" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-3xl lg:px-8">
        <ProfileCard
          student={user.profile}
          action={
            <Link href="/profile/edit" className="block">
              <Button className="min-h-11 max-lg:hidden rounded-xl px-4 text-sm">
                <PencilLine size={18} />
                تعديل
              </Button>
            </Link>
          }
        />

        <div className="mt-6 space-y-6">
          <ProfileStats />
          <ProfileInfo student={user.profile} />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 lg:flex-row lg:justify-center">
          <Link href="/profile/edit" className="block w-full lg:hidden">
            <Button className="w-full">
              <PencilLine size={20} />
              تعديل الملف الشخصي
            </Button>
          </Link>
          <SignOutButton className="lg:min-w-80" />
        </div>
      </div>
    </>
  );
}
