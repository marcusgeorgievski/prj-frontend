import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[200px] h-10" />
        <Skeleton className="w-[100px] h-6" />
        <Skeleton className="w-[240px] h-6" />
      </div>

      <div className="flex gap-3 mb-12">
        <Skeleton className="w-[120px] h-10" />
        <Skeleton className="w-[120px] h-10" />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="w-[80%] h-8" />
        <Skeleton className="w-[70%] h-8" />
        <Skeleton className="w-[75%] h-8" />
        <Skeleton className="w-[84%] h-8" />
        <Skeleton className="w-[59%] h-8" />
      </div>
    </div>
  )
}
