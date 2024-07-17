// src/components/assessments/assessment-modal.jsx
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
import AssessmentForm from './assessment-form';

export function AssessmentModal({
  children,
  assessmentData,
  action = 'create',
  classesList,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitFn, setSubmitFn] = useState(null);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TRIGGER */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'create' ? 'Create Assessment' : 'Edit Assessment'}
          </DialogTitle>
          <DialogDescription>Enter Assessment details</DialogDescription>
        </DialogHeader>

        <AssessmentForm
          action={action}
          assessmentData={assessmentData}
          setDialogOpen={setDialogOpen}
          setSubmitFn={setSubmitFn}
          classesList={classesList}
        />

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
              } else {
                submitFn();
              }
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
