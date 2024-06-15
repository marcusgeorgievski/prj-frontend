"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import ClassForm from "./assessment-form"

export function AssessmentModal({ children , classData, action = "create" }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitFn, setSubmitFn] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TRIGGER */}
      {children}
      <DialogContent>
        <DialogHeader>
        <DialogTitle>
            {
              {
                create: "Create Assessment",
                update: "Edit Assessment",
              }[action]
            }
          </DialogTitle>
          <DialogDescription>Enter Assessment details</DialogDescription>
        </DialogHeader>

        <ClassForm
          action={action}
          classData={classData}
          setDialogOpen={setDialogOpen}
          setSubmitFn={setSubmitFn}
        >
          <DialogFooter className="gap-2 mt-6">
            <DialogClose asChild>
              <Button onClick={() => setDialogOpen(false)} variant="secondary">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              onClick={() => {
                if (action === "update") {
                  submitFn()
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </ClassForm>

      </DialogContent>
    </Dialog>
  )
}
