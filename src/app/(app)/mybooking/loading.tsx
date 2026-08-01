import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-5 py-6 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-3 lg:sticky lg:top-24">
          <Skeleton className="h-80 w-full" />
        </aside>

        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
