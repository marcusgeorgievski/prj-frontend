'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/state/sidebar-state';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export function SidebarItem({ icon, href, children }) {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  if (href)
    return (
      <Link
        href={href}
        target={href.startsWith('http') ? '_blank' : ''}
        className={cn(
          'flex items-center gap-4 text-muted-foreground px-1.5 py-1 transition-all rounded-md z-30',
          {
            'bg-primary/10 text-primary font-semibold':
              pathname.endsWith(href) && href !== '/signin',

            'hover:bg-accent/60 hover:text-foreground rounded':
              !pathname.endsWith(href),
          },
          'overflow-hidden hover:overflow-visible hover:gap-5 transition-all group'
        )}
      >
        <div className="text-xl">{icon}</div>
        <div
          className={cn(
            'font-medium transition-all whitespace-nowrap z-30',
            {
              'group-hover:bg-primary/90 px-2 rounded text-blue-100 z-30':
                !isOpen && pathname.endsWith(href),
              'group-hover:bg-accent/90 px-2 rounded z-30':
                !isOpen && !pathname.endsWith(href),
            }
          )}
        >
          {children}
        </div>
      </Link>
    );

  return (
    <div
      className={cn(
        'flex items-center gap-4 text-muted-foreground px-0 py-1 transition-all rounded-md hover:text-foreground',
        {
          'justify-start': !icon,
        },
        'overflow-hidden hover:overflow-visible hover:gap-5 transition-all group'
      )}
    >
      {/* <div className="text-xl">{icon}</div> */}
      <div
        className={cn(
          'font-medium transition-all whitespace-nowrap group-hover:bg-accent/60 px-0 rounded'
        )}
      >
        {children}
      </div>
    </div>
  );
}
