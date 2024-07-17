'use client';
import { Button } from '../ui/button';
import { PiPencil, PiPlus } from 'react-icons/pi';

import { DialogTrigger } from '../ui/dialog';
import NoteModal from './note-modal';

export default function NoteActionButton({
  action = 'create',
  button = false,
}) {
  if (!button) {
    return (
      <span variant="ghost" className="flex items-center gap-2 " size="sm">
        {
          {
            create: (
              <>
                <PiPlus />
                Create Note
              </>
            ),
            update: (
              <>
                <PiPencil /> Edit
              </>
            ),
          }[action]
        }
      </span>
    );
  }

  return (
    <NoteModal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2" size="sm">
          {
            {
              create: (
                <>
                  <PiPlus />
                  Create Note
                </>
              ),
              update: (
                <>
                  <PiPencil /> Edit
                </>
              ),
            }[action]
          }
        </Button>
      </DialogTrigger>
    </NoteModal>
  );
}
