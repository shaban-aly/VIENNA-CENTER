import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 px-5 pt-5 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8 lg:pt-8">
      <div className="rounded-[22px] bg-card-secondary p-5">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <Skeleton className="mt-2 h-5 w-1/3" />
        <Skeleton className="mt-6 h-14 w-full" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-28 w-28 shrink-0 md:h-32 md:w-32"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-48 shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
