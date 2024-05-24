"use client"

import { forwardRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { PiPencil, PiPlus } from "react-icons/pi"
import ClassForm from "./class-form"
import { cn } from "@/lib/utils"

const ClassModal = forwardRef(({ action, classData }, ref) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button
          ref={ref}
          onClick={() => setDialogOpen(true)}
          size={action === "create" && "sm"}
          variant="ghost"
          className={cn(
            "flex items-center",
            action === "create" && "gap-1.5",
            action === "update" &&
              "w-full px-2 py-1.5 text-sm justify-start gap-2 font-[400]"
          )}
        >
          {action === "create" ? (
            <>
              <PiPlus />
              Create Class
            </>
          ) : (
            <>
              <PiPencil /> Edit
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
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

        <ClassForm
          setDialogOpen={setDialogOpen}
          {...classData}
          actionType={action}
        >
          <DialogFooter className="gap-2 mt-6">
            <DialogClose asChild onClick={() => setDialogOpen(false)}>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>

            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </ClassForm>
      </DialogContent>
    </Dialog>
  )
})

ClassModal.displayName = "ClassModal"

export default ClassModal
