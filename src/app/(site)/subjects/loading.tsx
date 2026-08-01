import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
      <Skeleton className="h-32 w-full rounded-[22px]" />

      <div className="mt-5 space-y-4">
        <Skeleton className="h-14 w-full rounded-[14px]" />
        <Skeleton className="h-4 w-20" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
