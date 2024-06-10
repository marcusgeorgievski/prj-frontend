"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getClasses } from "@/actions/classes"
import { useAuth } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClassSlugLayout({ params: { classId } }) {
  const [classData, setClassData] = useState(null)

  const { userId } = useAuth()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Set intial tab to `assessments`
  useEffect(() => {
    router.push(pathname + "?tab=assessments")

    const getClassData = async (userId) => {
      const classes = await getClasses(userId)
      const c = classes.find((c) => c.class_id === classId)
      setClassData(c)
    }

    getClassData(userId)
  }, [])

  console.log(classData)
  // Get tab search param on every render
  const tab = searchParams.get("tab")

  function setSearchParam(tab) {
    router.push(pathname + "?tab=" + tab)
  }

  if (classData === null) {
    return null
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-3xl font-bold">{classData.name}</h1>
        <p className="text-muted-foreground">{classData.professor}</p>
        <p className="text-muted-foreground">{classData.details}</p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className={cn(
            tab == "assessments" &&
              "text-white bg-black hover:text-white hover:bg-black"
          )}
          onClick={() => {
            setSearchParam("assessments")
          }}
        >
          Assessments
        </Button>
        <Button
          variant="ghost"
          className={cn(
            tab == "notes" &&
              "text-white bg-black hover:text-white hover:bg-black"
          )}
          onClick={() => {
            setSearchParam("notes")
          }}
        >
          Notes
        </Button>
      </div>

      <div></div>
    </div>
  )
}
