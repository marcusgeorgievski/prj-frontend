import { cn } from '@/lib/utils';
import { useSidebar } from '@/state/sidebar-state';
import React, { useEffect } from 'react';
import { ArrowRightLeftIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { SidebarItem } from './sidebar-item';

export default function Sidebar({ classes }) {
  const { isOpen, toggleSidebar } = useSidebar();
  const sidebarRef = React.useRef(null);

  // Close sidebar when clicking outside of it for small screens
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        window.innerWidth < 768 &&
        e.target.getAttribute('id') !== 'sidebar-toggle' &&
        e.target.tagName !== 'path'
      ) {
        toggleSidebar();
        e.stopPropagation();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        classes,
        'h-full border-r transition-all z-50 py-4 bg-background',
        {
          'md:w-[53px] md:px-2.5 w-0 -translate-x-4 md:translate-x-0':
            !isOpen,
          'w-[210px] px-4 ': isOpen,
        }
      )}
    >
      <div>
        {/* Header */}
        <div></div>

        {/* Navigation */}
        <div>
          <Navigation />
        </div>

        {/* Footer */}
        <div></div>
      </div>
    </aside>
  );
}

import { PiBrainLight, PiChalkboardTeacherLight } from 'react-icons/pi';
import { PiHouseLineLight } from 'react-icons/pi';
import { PiNotePencilLight } from 'react-icons/pi';
import { PiListChecksLight, PiMagnifyingGlassLight } from 'react-icons/pi';

function Navigation() {
  return (
    <div className="flex flex-col gap-2">
      <SidebarItem icon={<PiHouseLineLight />} href="/dashboard">
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<PiChalkboardTeacherLight />} href="/classes">
        Classes
      </SidebarItem>
      <SidebarItem icon={<PiListChecksLight />} href="/assessments">
        Assessments
      </SidebarItem>
      <SidebarItem icon={<PiNotePencilLight />} href="/notes">
        Notes
      </SidebarItem>
      <SidebarItem icon={<PiMagnifyingGlassLight />} href="/search">
        Search
      </SidebarItem>
      <SidebarItem icon={<PiBrainLight />} href="/ai">
        AI Generation
      </SidebarItem>
    </div>
  );
}
