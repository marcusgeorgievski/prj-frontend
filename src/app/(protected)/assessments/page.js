import PageTitle from "@/components/page-title";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiListChecksLight } from "react-icons/pi";

export default function AssessmentsPage() {
  return (
    <div className="w-full ">
      <PageTitle icon={PiListChecksLight}>Assessments</PageTitle>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AssessmentCard />
        <AssessmentCard />
        <AssessmentCard />
        <AssessmentCard />
        <AssessmentCard />
      </div>
    </div>
  );
}

export function AssessmentCard({ assessmentData }) {
  return (
    <Link href={`/notes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px]"
        )}
      >
        <h3 className="text-lg font-bold">Final Exam</h3>
        <p className="mb-2 text-sm font-light text-muted-foreground">
          CCP555
        </p>

        <div className="text-sm font-light">
          <p>July 20, 2:45 PM</p>
          <p>Room A3516</p>
        </div>
      </Card>
    </Link>
  );
}
