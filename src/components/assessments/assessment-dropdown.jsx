"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AssessmentActionButton from "./assessment-button"
import { Button } from "../ui/button"
import { VscKebabVertical } from "react-icons/vsc"
import { DialogTrigger } from "../ui/dialog"

export function AssessmentDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost" className="">
          <VscKebabVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        {/* Edit */}
        <DialogTrigger asChild>
          <DropdownMenuItem>
            {/* <AssessmentActionButton /> */}
            Create
          </DropdownMenuItem>
        </DialogTrigger>

        {/* Delete */}
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
