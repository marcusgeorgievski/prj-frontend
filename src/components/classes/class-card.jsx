"use client"

import Link from "next/link"
import { VscKebabVertical } from "react-icons/vsc"
import { Card } from "../ui/card"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export default function ClassCard({ class_id, name, professor, details }) {
  console.log(class_id)
  return (
    <Link href={`/classes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px] relative"
        )}
      >
        <div>
          <ClassDropdown />
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="mb-2 text-sm font-light text-muted-foreground">
            {professor} - {details}
          </p>

          <div className="text-sm font-light">
            <p>Assessments: 12</p>
            <p>Notes: 4</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiTrash, PiPencil } from "react-icons/pi"
import { deleteClass } from "@/actions/classes"
import { useAuth } from "@clerk/nextjs"

function ClassDropdown() {
  const { userId } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="absolute right-2 top-2">
          <VscKebabVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <button className="flex items-center w-full gap-2">
            <PiPencil /> Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={async () => {
              await deleteClass(userId)
            }}
            className="flex items-center w-full gap-2 text-red-600 hover:!text-red-600"
          >
            <PiTrash /> Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
