"use client"
import Link from "next/link"
import { Card } from "../ui/card"
import { cn } from "@/lib/utils"
import ClassModal from "./class-modal"
import { ClassDropdown } from "./class-dropdown"

export default function ClassCard({ classData = exampleClassData, assessmentCount, noteCount }) {
  const { class_id, name, professor, details } = classData

  return (
    <Link href={`/classes/${class_id}`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px] relative h-full justify-between"
        )}
      >
        <div
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <ClassModal classData={classData} action="update">
            <ClassDropdown classData={classData} />
          </ClassModal>
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="mb-2 text-sm font-light text-muted-foreground line-clamp-1">
            {professor || details ? (
              <>
                {professor || ""}
                {details && (
                  <>
                    {"-"} {details}
                  </>
                )}
              </>
            ) : (
              <br />
            )}
          </p>

          <div className="text-sm font-light">
            <p>Assessments: {assessmentCount}</p>
            <p>Notes: {noteCount}</p>
          </div> 
        </div>
      </Card>
    </Link>
  )
}

const exampleClassData = {
  class_id: 1,
  name: "Math 101",
  professor: "John Doe",
  details: "MWF 9:00 - 10:00 AM",
}
