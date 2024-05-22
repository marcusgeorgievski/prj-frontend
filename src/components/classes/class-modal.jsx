"use client"

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
import { PiPlus } from "react-icons/pi"
import { createClass } from "@/actions/classes"
import { useAuth, useUser } from "@clerk/nextjs"
import ClassForm from "./class-form"
import { useState } from "react"

export default function CreateClassModal() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setDialogOpen(true)}
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
        >
          <PiPlus />
          Create Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>Enter new class details</DialogDescription>
        </DialogHeader>

        <ClassForm fn={setDialogOpen}>
          <DialogFooter className="gap-2 mt-6">
            <DialogClose asChild onClick={() => setDialogOpen(false)}>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            {/* <DialogClose asChild onClick={() => setDialogOpen(false)}> */}
            <Button
              type="submit"
              // onClick={async () => await createClass(userId)}
            >
              Confirm
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </ClassForm>
      </DialogContent>
    </Dialog>
  )
}
