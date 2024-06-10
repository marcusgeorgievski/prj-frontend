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
import ClassForm from "./class-form"
import { useState } from "react"
import { set } from "react-hook-form"

export default function ClassModal({ children, classData, action = "create" }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitFn, setSubmitFn] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TRIGGER */}
      {children}

      {/* DIALOG CONTENT */}
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            {
              {
                create: "Create Class",
                update: "Edit Class",
              }[action]
            }
          </DialogTitle>
          <DialogDescription>Enter class details</DialogDescription>
        </DialogHeader>

        {/* Form */}
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
