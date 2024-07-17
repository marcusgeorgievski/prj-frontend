import { cn } from '@/lib/utils';
import React from 'react';

export default function PageTitle({
  icon,
  children,
  className,
  sub = false,
}) {
  const Icon = icon;
  return (
    <div
      className={cn(
        className,
        sub ? 'text-xl' : 'border-b text-2xl ',
        'flex items-center gap-4 pb-1 mb-4 font-bold'
      )}
    >
      <Icon /> {children}
    </div>
  );
}
