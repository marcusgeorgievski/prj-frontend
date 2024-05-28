"use client"

import Link from "next/link"
import { VscKebabVertical } from "react-icons/vsc"
import { Card } from "../ui/card"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export default function ClassCard({ class_id, name, professor, details }) {
  const classData = {
    class_id,
    name,
    professor,
    details,
  }

  return (
    <Link href={`/classes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px] relative"
        )}
      >
        <div>
          <ClassDropdown classData={classData} />
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="mb-2 text-sm font-light text-muted-foreground">
            {professor}{" "}
            {details && (
              <>
                {"-"} {details}
              </>
            )}
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiTrash } from "react-icons/pi"
import { deleteClass } from "@/actions/classes"
import ClassModal from "./class-modal"
import { useRouter } from "next/navigation"

function ClassDropdown({ classId, classData }) {
  // const { classId, name, professor, details } = classData
  const router = useRouter()
  async function handleDelete(e) {
    e.stopPropagation()
    await deleteClass(classData.class_id)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="absolute right-2 top-2">
          <VscKebabVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuItem asChild>
          <ClassModal action={"update"} classData={classData} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={handleDelete}
            className="flex items-center w-full gap-2 text-red-600 hover:!text-red-600"
          >
            <PiTrash /> Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
