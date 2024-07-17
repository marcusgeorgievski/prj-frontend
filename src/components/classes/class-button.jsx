'use client';
import { Button } from '../ui/button';
import { PiPencil, PiPlus } from 'react-icons/pi';
import ClassModal from './class-modal';
import { DialogTrigger } from '../ui/dialog';

export default function ClassActionButton({
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
                Create Class
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
    <ClassModal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2" size="sm">
          {
            {
              create: (
                <>
                  <PiPlus />
                  Create Class
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
    </ClassModal>
  );
}
