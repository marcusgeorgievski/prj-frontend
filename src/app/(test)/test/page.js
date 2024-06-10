import AssessmentActionButton from "@/components/assessments/assessment-button"
import AssessmentCard from "@/components/assessments/assessment-card"

export default function TestPage() {
  return (
    <div className="flex items-center justify-center h-screen gap-6">
      <AssessmentCard />
      <AssessmentActionButton />
    </div>
  )
}
