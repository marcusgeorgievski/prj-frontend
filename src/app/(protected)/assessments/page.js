import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { AssessmentsTemplate } from "@/components/assessments/assessment-template";

const assessments = [
  {
    id: 1,
    title: "Midterm Exam",
    class: "CCP555",
    date: new Date(2024, 6, 20, 14, 45),
    status: "Upcoming",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 2,
    title: "Final Exam",
    class: "CCP555",
    date: new Date(2024, 5, 20, 14, 45),
    status: "Completed",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 3,
    title: "Quiz",
    class: "CCP545",
    date: new Date(2024, 6, 20, 14, 45),
    status: "Overdue",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 4,
    title: "Midterm Exam",
    class: "CCP555",
    date: new Date(2024, 6, 20, 14, 45),
    status: "Upcoming",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 5,
    title: "Final Exam",
    class: "CCP555",
    date: new Date(2024, 6, 20, 14, 45),
    status: "Completed",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 6,
    title: "Quiz",
    class: "CCP545",
    date: new Date(2024, 6, 20, 14, 45),
    status: "Upcoming",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 7,
    title: "Quiz",
    class: "CCP545",
    date: new Date(2024, 5, 20, 14, 45),
    status: "Not Started",
    description: "This is a basic description",
    weight: 5,
  },
  {
    id: 8,
    title: "Quiz",
    class: "CCP545",
    date: new Date(2024, 5, 20, 14, 45),
    status: "Not Started",
    description: "This is a basic description",
    weight: 5,
  },
  // Add more assessments as needed
];

export default async function AssessmentsPage() {
  return (
    <div className="w-full ">
      <AssessmentsTemplate assessments = {assessments}/>
    </div>
  );
}

export function AssessmentCard({ assessment }) {
  return (
    <Link href={`/notes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px]"
        )}
      >
        <h3 className="text-lg font-bold">{assessment.title}</h3>
        <p className="mb-2 text-sm font-light text-muted-foreground">
          {assessment.class}
        </p>
        <div className="text-sm font-light">
          <p>
            {assessment.date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <p>{assessment.status}</p>
        </div>
      </Card>
    </Link>
  );
}
