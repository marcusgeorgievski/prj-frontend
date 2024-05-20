// User Dashboard

// UI components
import PageTitle from "@/components/page-title";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { PiHouseLineLight } from "react-icons/pi";
import { PiNotePencilLight } from "react-icons/pi";
import { PiListChecksLight, PiMagnifyingGlassLight } from "react-icons/pi";

// Components from other pages (Note and Assessment cards not implemented yet)
import { ClassCard } from "../classes/page";
import { NoteCard } from "../notes/page";
import { AssessmentCard } from "../assessments/page";

export default function Dashboard() {
  return (
    <div>
      <PageTitle icon={PiHouseLineLight}>Dashboard</PageTitle>

      {/* Recent Classes */}

      <div className="w-full mb-8">
        <Heading icon={PiChalkboardTeacherLight}>Recent Classes</Heading>
        <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/classes/" className="text-lg">
            <Button>View all classes</Button>
          </Link>
        </div>
      </div>

      {/* Recent Assessments */}

      <div className="w-full mb-8">
        <Heading icon={PiListChecksLight}>Recent Assessments</Heading>
        <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AssessmentCard />
          <AssessmentCard />
          <AssessmentCard />
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/assessments/" className="text-lg">
            <Button>View all assessments</Button>
          </Link>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="w-full mb-8">
        <Heading icon={PiNotePencilLight}>Recent Notes</Heading>
        <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/notes/" className="text-lg">
            <Button>View all notes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
