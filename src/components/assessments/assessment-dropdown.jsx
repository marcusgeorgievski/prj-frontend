// src/components/assessments/assessment-dropdown.jsx
'use client';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaPencilAlt } from 'react-icons/fa';
import { Dialog } from '../ui/dialog';
import { deleteAssessment } from '@/actions/assessments';
import { useRouter } from 'next/navigation';
import { PiTrash, PiNotePencil } from 'react-icons/pi';
import AssessmentActionButton from '@/components/assessments/assessment-button';
import { VscKebabVertical } from 'react-icons/vsc';
import DeleteActionButton from '../delete-button';

export function AssessmentDropdown({
  assessmentData,
  onDelete,
  classesList,
  onEdit,
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    console.log(router);
    console.log(assessmentData);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  async function handleDelete(e) {
    e.stopPropagation();
    try {
      await deleteAssessment(assessmentData.assessment_id);
      router.refresh();
      if (onDelete) {
        onDelete(assessmentData.assessment_id);
      }
    } catch (error) {
      console.error('Failed to delete assessment:', error);
    }
    setIsDialogOpen(false); 
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="cursor-pointer">
            <VscKebabVertical onClick={handleDialogOpen}/>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          {/*Edit*/}
          <AssessmentActionButton
            action="update"
            button={true}
            classesList={classesList}
            assessmentData={assessmentData}
            onEdit={onEdit}
          />

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
