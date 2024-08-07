// src/components/assessments/assessment-button.jsx
import { Button } from '../ui/button';
import { PiPencil, PiPlus } from 'react-icons/pi';
import { AssessmentModal } from './assessment-modal';
import { DialogTrigger } from '../ui/dialog';

export default function AssessmentActionButton({
  action = 'create',
  assessmentData,
  button = true,
  classesList,
  onCreate,
  onEdit,
}) {
  if (!button) {
    return (
      <span variant="ghost" className="gap-2" size="sm">
        {
          {
            create: (
              <>
                <PiPlus /> Create
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
    <AssessmentModal
      classesList={classesList}
      action={action}
      assessmentData={assessmentData}
      onCreate={onCreate}
      onEdit={onEdit}
    >
      <DialogTrigger asChild>
        {/* Cursor none for consistency */}
        <Button
          variant="ghost"
          className="gap-2 px-2 text-sm font-normal cursor-none"
        >
          {action === 'create' ? (
            <>
              <PiPlus />
              Create Assessment
            </>
          ) : (
            <>
              <PiPencil />
              Edit Assessment
            </>
          )}
        </Button>
      </DialogTrigger>
    </AssessmentModal>
  );
}
