// User Dashboard

import PageTitle from "@/components/page-title"
import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  PiChalkboardTeacherLight,
  PiHouseLineLight,
  PiNotePencilLight,
  PiListChecksLight,
} from "react-icons/pi"

import { recentItems } from "@/lib/utils"

import { getClasses, getAssessments, getNotes } from "@/actions/classes"
import ClassCard from "@/components/classes/class-card"
// import NoteCard from "@/components/notes/note-card";
// import AssessmentCard from "@/components/assessments/assessment-card";
import { NoteCard } from "../notes/page"
import { AssessmentCard } from "../assessments/page"
import { currentUser } from "@clerk/nextjs/server"
import ClassActionButton from "@/components/classes/class-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default async function Dashboard() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const classes = await getClasses(user.id)
  const assessments = []
  const notes = []
  // const assessments = await getAssessments(user.id);
  // const notes = await getNotes(user.id);

  // Process recent items
  const recentClasses = recentItems(classes, 4)
  const recentAssessments = recentItems(assessments, 4)
  const recentNotes = recentItems(notes, 4)
  // Keep track of remaining items
  const extraClasses = classes.length - recentClasses.length
  const extraAssessments = assessments.length - recentAssessments.length
  const extraNotes = notes.length - recentNotes.length

  return (
    <div className="w-full">
      <PageTitle icon={PiHouseLineLight}>Dashboard</PageTitle>

      {/* Recent Classes */}
      <div className="w-full mt-8">
        <Heading icon={PiChalkboardTeacherLight}>Recent Classes</Heading>
        {classes.length === 0 ? (
          <div className="text-center">
            <p className="pt-[2vh]">No classes yet!</p>
            <div className="flex justify-center mt-4">
              <ClassActionButton action="create" button />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentClasses.map((c) => (
                <div key={c.id}>
                  <ClassCard key={c.id} classData={c} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/classes/" className="text-lg">
                <Button>
                  {`View All Classes${
                    extraClasses > 0 ? ` (${extraClasses} more)` : ""
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Assessments */}
      <div className="w-full mb-8">
        <Heading icon={PiListChecksLight}>Recent Assessments</Heading>
        {assessments.length === 0 ? (
          <div className="text-center">
            <p className="pt-[2vh]">No assessments yet!</p>
            <Link href="/assessments" className="text-lg">
              <Button className="mt-4">Create an Assessment</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentAssessments.map((a) => (
                <div key={a.id}>
                  <AssessmentCard key={a.id} {...a} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/assessments/" className="text-lg">
                <Button>
                  {`View All Assessments${
                    extraAssessments > 0 ? ` (${extraAssessments} more)` : ""
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Notes */}
      <div className="w-full mb-8">
        <Heading icon={PiNotePencilLight}>Recent Notes</Heading>
        {notes.length === 0 ? (
          <div className="text-center">
            <p className="pt-[2vh]">No notes yet!</p>
            <Link href="/notes/" className="text-lg">
              <Button className="mt-4">Create a Note</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentNotes.map((n) => (
                <div key={n.id}>
                  <NoteCard key={n.id} {...n} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/notes/" className="text-lg">
                <Button>
                  {`View All Notes${
                    extraNotes > 0 ? ` (${extraNotes} more)` : ""
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
