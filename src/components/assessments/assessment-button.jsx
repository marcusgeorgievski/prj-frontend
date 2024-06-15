"use client";
import { Button } from "../ui/button";
import { PiPencil, PiPlus } from "react-icons/pi";
import { AssessmentModal }from "./assessment-modal";
import { DialogTrigger } from "../ui/dialog"

export default function AssessmentActionButton(
  action = "create",
  button = true
) {
  if (!button) {
    return (
      <span variant="ghost" className="gap-2" size="sm">
        {
          {
            create: (
              <>
                <PiPlus />
                Create Assessment
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
    <AssessmentModal>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          {
            {
              create: "Create Assessment",
              update: "Update Assessment",
            }[action]
          }
          <PiPlus />
          Create Assessment
        </Button>
      </DialogTrigger>
    </AssessmentModal>
  );
}
