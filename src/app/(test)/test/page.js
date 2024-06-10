import AssessmentActionButton from "@/components/assessments/assessment-button"
import AssessmentCard from "@/components/assessments/assessment-card"
import ClassActionButton from "@/components/classes/class-button"

import ClassCard from "@/components/classes/class-card"

export default function TestPage() {
  return (
    <div className="flex items-center justify-center h-screen gap-6">
      {/* <AssessmentCard />
      <AssessmentActionButton /> */}

      <ClassCard />

      <ClassActionButton />
    </div>
  )
}
