'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
import { VscKebabVertical } from 'react-icons/vsc';
import { DialogTrigger } from '../ui/dialog';
import ClassActionButton from './class-button';
import { PiTrash } from 'react-icons/pi';
import { deleteClass } from '@/actions/classes';
import { useRouter } from 'next/navigation';
import DeleteActionButton from '../delete-button';

export function ClassDropdown({ classData }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteClass(classData.class_id);
    router.refresh();
  }

  return (
    <DropdownMenu>
      {/* TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="">
          <VscKebabVertical />
        </Button>
      </DropdownMenuTrigger>

      {/* CONTENT */}
      <DropdownMenuContent align={'end'}>
        {/* Edit */}
        <DialogTrigger asChild>
          <DropdownMenuItem>
            <ClassActionButton action="update" />
          </DropdownMenuItem>
        </DialogTrigger>

        {/* Delete */}
        <DropdownMenuItem asChild>
          <DeleteActionButton 
            onConfirm={handleDelete}
            title="Delete Assessment"
          />
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
