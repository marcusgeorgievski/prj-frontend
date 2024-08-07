// src/components/assessments/assessment-button.jsx
import { Button } from './ui/button';
import { AssessmentModal } from './assessments/assessment-modal';
import { DialogTrigger } from './ui/dialog';
import { PiTrash} from 'react-icons/pi';
import { DeleteModal } from './delete-modal';

export default function DeleteActionButton({
  title,
  onConfirm
}) {

  return (
    <DeleteModal 
        title={title}
        onConfirm={onConfirm}
      >
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
        <PiTrash />
            Delete
        </Button>
      </DialogTrigger>
    </DeleteModal>
  );
}
