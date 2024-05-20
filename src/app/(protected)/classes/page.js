import PageTitle from "@/components/page-title";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiChalkboardTeacherLight } from "react-icons/pi";

export default function ClassesPage() {
  return (
    <div className="w-full ">
      <PageTitle icon={PiChalkboardTeacherLight}>Classes</PageTitle>

      <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  );
}

export function ClassCard({ classData }) {
  return (
    <Link href={`/classes/#`}>
      <Card
        className={cn(
          "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px]"
        )}
      >
        <h3 className="text-lg font-bold">PRJ123</h3>
        <p className="mb-2 text-sm font-light text-muted-foreground">
          Prof. Yasser Elmankabady
        </p>

        <div className="text-sm font-light">
          <p>Assessments: 12</p>
          <p>Notes: 4</p>
        </div>
      </Card>
    </Link>
  );
}
