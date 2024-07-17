'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
// import ClassForm from './class-form';
import { useState } from 'react';
import { set } from 'react-hook-form';
import NoteForm from './note-form';

export default function NoteModal({
  children,
  noteData,
  action = 'create',
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitFn, setSubmitFn] = useState(false);

  // console.log(noteData, action);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TRIGGER */}
      {children}

      {/* DIALOG CONTENT */}
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            {
              {
                create: 'Create Note',
                update: 'Edit Note',
              }[action]
            }
          </DialogTitle>
          <DialogDescription>Enter Note details</DialogDescription>
        </DialogHeader>

        {/* Form */}
        <NoteForm
          action={action}
          noteData={noteData}
          setDialogOpen={setDialogOpen}
          setSubmitFn={setSubmitFn}
        >
          <DialogFooter className="gap-2 mt-6">
            <DialogClose asChild>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              onClick={() => {
                if (action === 'update') {
                  submitFn();
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </NoteForm>
      </DialogContent>
    </Dialog>
  );
}
