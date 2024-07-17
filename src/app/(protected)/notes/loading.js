import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <Skeleton className="w-[200px] h-10" />
        <Separator />

        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-6">
        <Skeleton className="w-[300px] h-[200px]" />
        <Skeleton className="w-[300px] h-[200px]" />
        <Skeleton className="w-[300px] h-[200px]" />
        <Skeleton className="w-[300px] h-[200px]" />
        <Skeleton className="w-[300px] h-[200px]" />
        <Skeleton className="w-[300px] h-[200px]" />
      </div>
    </div>
  );
}
