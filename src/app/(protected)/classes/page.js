import { getClasses } from "@/actions/classes"
import ClassCard from "@/components/classes/class-card"
import ClassModal from "@/components/classes/class-modal"
import PageTitle from "@/components/page-title"
import { cn } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { PiChalkboardTeacherLight } from "react-icons/pi"

export default async function ClassesPage() {
  const { id } = await currentUser()
  const classes = await getClasses(id)
  return (
    <div className="w-full ">
      <PageTitle icon={PiChalkboardTeacherLight}>Classes</PageTitle>

      <div className="mb-2">
        <ClassModal />
      </div>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes.map((c) => (
          <div key={c.id}>
            <ClassCard key={c.id} {...c} />
          </div>
        ))}
      </div>
    </div>
  )
}
