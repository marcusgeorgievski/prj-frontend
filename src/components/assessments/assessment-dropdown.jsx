// src/components/assessments/assessment-dropdown.jsx
'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { FaPencilAlt } from 'react-icons/fa';
import { Dialog } from '../ui/dialog';
import { deleteAssessment } from '@/actions/assessments';
import { useRouter } from 'next/navigation';
import { PiTrash, PiNotePencil } from 'react-icons/pi';

export function AssessmentDropdown({ assessmentData, onDelete }) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  async function handleDelete(e) {
    e.stopPropagation();
    try {
      await deleteAssessment(assessmentData.assessment_id);
      //ensure router refresh
      router.refresh();
      if (onDelete) {
        onDelete(assessmentData.assessment_id);
      }
    } catch (error) {
      console.error('Failed to delete assessment:', error);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="cursor-pointer">
            <FaPencilAlt onClick={handleDialogOpen} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/*Edit*/}
          <DropdownMenuItem asChild disabled>
            <button
              //onClick={...}
              className="flex items-center w-full gap-2"
            >
              <PiNotePencil /> Edit
            </button>
          </DropdownMenuItem>

          {/*Delete*/}
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
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
        <div></div>
      </Dialog>
    </>
  );
}
