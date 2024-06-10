import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[200px] h-10" />
        <Separator />

        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-6 mb-12">
        <Skeleton className="w-[300px] h-[130px]" />
        <Skeleton className="w-[300px] h-[130px]" />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[200px] h-10" />
        <Separator />

        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-6 mb-12">
        <Skeleton className="w-[80%] h-8" />
        <Skeleton className="w-[70%] h-8" />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[200px] h-10" />
        <Separator />

        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-6 mb-12">
        <Skeleton className="w-[260px] h-[130px]" />
        <Skeleton className="w-[260px] h-[130px]" />
      </div>
    </div>
  )
}
