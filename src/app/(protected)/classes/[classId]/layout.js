"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function ClassSlugLayout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const tab = searchParams.get("tab")
  console.log(tab)

  return (
    <div>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className={cn(
            tab == "assessments" &&
              "text-white bg-black hover:text-white hover:bg-black"
          )}
          onClick={() => {
            router.push(pathname + "?tab=assessments")
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
            router.push(pathname + "?tab=notes")
          }}
        >
          Notes
        </Button>
      </div>

      <div></div>
    </div>
  )
}
