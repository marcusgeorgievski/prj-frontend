import { cn } from '@/lib/utils';
import React from 'react';

export default function PageTitle({ icon, children, className }) {
  const Icon = icon;
  return (
    <div
      className={cn(
        className,
        'flex items-center gap-4 pb-1 mb-4 text-2xl font-bold border-b'
      )}
    >
      <Icon /> {children}
    </div>
  );
}
