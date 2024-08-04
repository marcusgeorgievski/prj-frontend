'use client';
import PageTitle from '@/components/page-title';
import { Input } from '@/components/ui/input';
import { PiBrainLight } from 'react-icons/pi';
import { JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
});

export default function AIPage() {
  return (
    <div>
      <PageTitle icon={PiBrainLight} sub>
        AI Generation
      </PageTitle>

      <p className="text-slate-800 font-medium">
        Auto-generate a class and assignments with the power of AI.
      </p>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (1) Upload a PDF file of your addendum to generate a class and
          assignments.
        </p>
        <div className="max-w-md flex items-center gap-2">
          <Input id="file" type="file" accept="application/pdf" />
          <Button className="px-10">Generate</Button>
        </div>
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (2) Review extracted details
        </p>
      </div>

      <div className="my-12">
        <p className={cn(jetbrains.className, 'mb-2 text-sm font-medium')}>
          (3) Confirm
        </p>
        <Button className="px-10">Confirm</Button>
      </div>
    </div>
  );
}
