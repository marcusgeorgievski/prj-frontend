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
import { PiTrash } from 'react-icons/pi';
import { deleteClass } from '@/actions/classes';
import { useRouter } from 'next/navigation';
import NoteActionButton from './note-button';
import { deleteNote } from '@/actions/notes';

export default function NoteDropdown({ noteData }) {
  const router = useRouter();

  async function handleDelete(e) {
    e.stopPropagation();
    await deleteNote(noteData.note_id);
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
            <NoteActionButton action="update" />
          </DropdownMenuItem>
        </DialogTrigger>

        {/* Delete */}
        <DropdownMenuItem asChild>
          <button
            onClick={handleDelete}
            className="flex items-center w-full gap-2 text-red-600 hover:!text-red-600"
          >
            <PiTrash /> Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
