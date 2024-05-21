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

export default function ClassModal() {
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
            <Button type="submit">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
