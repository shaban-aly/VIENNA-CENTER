import { Suspense, type ReactNode } from "react";
import { BottomNavigation } from "./bottom-navigation";
import { SiteFooter } from "./site-footer";
import { TopNavigation } from "./top-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col border-x border-border bg-background md:max-w-2xl lg:max-w-none lg:border-x-0">
      <TopNavigation />
      <main className="flex-1 pt-12 pb-24 lg:pt-16 lg:pb-0">{children}</main>
      <SiteFooter />
      <Suspense fallback={null}>
        <BottomNavigation />
      </Suspense>
    </div>
  );
}
