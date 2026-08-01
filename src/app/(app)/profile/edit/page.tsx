"use client";

import { PageHeader } from "@/components/layout/page-header";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/use-auth";

export default function EditProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <PageHeader title="تعديل الملف الشخصي" backHref="/profile" />
        <div className="space-y-4 px-5 py-6 lg:mx-auto lg:w-full lg:max-w-3xl lg:px-8">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="تعديل الملف الشخصي" backHref="/profile" />
      <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-3xl lg:px-8">
        <EditProfileForm initialProfile={user.profile} />
      </div>
    </>
  );
}
