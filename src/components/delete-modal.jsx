'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

export function DeleteModal({
  children,
  onConfirm,
  title = 'Delete Confirmation',
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setDialogOpen(false); 
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TRIGGER */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
          {title}
          </DialogTitle>
          <DialogDescription>Are you sure you want to delete this?</DialogDescription>
        </DialogHeader>


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
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
