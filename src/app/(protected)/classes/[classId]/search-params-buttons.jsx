'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchParamButtons() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = searchParams.get('tab');

  // Set intial tab to `assessments`
  useEffect(() => {
    router.push(pathname + '?tab=assessments');
  }, []);

  function setSearchParam(tab) {
    router.push(pathname + '?tab=' + tab);
  }

  return (
    <div className="flex gap-4">
      <Button
        variant="ghost"
        className={cn(
          tab == 'assessments' &&
            'text-white bg-black hover:text-white hover:bg-black'
        )}
        onClick={() => {
          setSearchParam('assessments');
        }}
      >
        Assessments
      </Button>
      <Button
        variant="ghost"
        className={cn(
          tab == 'notes' &&
            'text-white bg-black hover:text-white hover:bg-black'
        )}
        onClick={() => {
          setSearchParam('notes');
        }}
      >
        Notes
      </Button>
    </div>
  );
}
