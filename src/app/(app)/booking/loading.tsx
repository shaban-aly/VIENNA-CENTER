import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-14 w-full rounded-[14px]" />
              </div>
            ))}
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-28 w-full rounded-[14px]" />
          <Skeleton className="h-14 w-full" />
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-40 w-full" />
        </aside>
      </div>
    </div>
  );
}
