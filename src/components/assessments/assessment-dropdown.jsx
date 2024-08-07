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

  async function handleDelete() {
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
          <DropdownMenuItem asChild>
            <div className="flex items-center justify-between">
              <AssessmentActionButton
                action="update"
                button={true}
                classesList={classesList}
                assessmentData={assessmentData}
                onEdit={onEdit}
              />
            </div>
          </DropdownMenuItem>

          {/*Delete*/}
          <DropdownMenuItem asChild>
          <DeleteActionButton 
            onConfirm={handleDelete}
            title="Delete Assessment"
          />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
        <div></div>
      </Dialog>
    </>
  );
}
