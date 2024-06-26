// src/components/assessments/assessment-button.jsx
import { Button } from "../ui/button";
import { PiPencil, PiPlus } from "react-icons/pi";
import { AssessmentModal } from "./assessment-modal";
import { DialogTrigger } from "../ui/dialog";

export default function AssessmentActionButton({
  action = "create",
  button = true,
  classesList,
}) {
  //console.log("classesList in AssessmentActionButton:", classesList);

  if (!button) {
    return (
      <span variant="ghost" className="gap-2" size="sm">
        {
          {
            create: (
              <>
                <PiPlus />C
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
    <AssessmentModal classesList={classesList}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <PiPlus />
          {
            {
              create: "Create Assessment",
              update: "Update Assessment",
            }[action]
          }
        </Button>
      </DialogTrigger>
    </AssessmentModal>
  );
}
