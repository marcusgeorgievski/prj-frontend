import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[230px] h-10" />
        <Separator />

        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="w-[240px] h-10 mb-2" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
        <br />
        <Skeleton className="w-[240px] h-10 mb-2" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
        <Skeleton className="w-full h-[30px]" />
      </div>
    </div>
  );
}
