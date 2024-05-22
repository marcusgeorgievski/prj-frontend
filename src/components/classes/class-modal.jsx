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

export default function CreateClassModal() {
  const { userId } = useAuth()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="flex items-center gap-1">
          <PiPlus />
          Create Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>Enter new class details</DialogDescription>
        </DialogHeader>

        <div>hi</div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Confirm</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              // onClick={async () => await createClass(userId)}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
