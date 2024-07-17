import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-6 mb-8">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-[140px] h-8" />
      </div>

      <div className="flex flex-wrap gap-6">
        <Skeleton className="w-full h-[400px]" />
      </div>
    </div>
  );
}
