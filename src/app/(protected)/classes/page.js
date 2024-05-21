import ClassCard from "@/components/classes/class-card"
import ClassModal from "@/components/classes/class-modal"
import PageTitle from "@/components/page-title"
import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PiChalkboardTeacherLight } from "react-icons/pi"

export default function ClassesPage() {
  return (
    <div className="w-full ">
      <PageTitle icon={PiChalkboardTeacherLight}>Classes</PageTitle>

      <div className="mb-2">
        <ClassModal />
      </div>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  )
}
