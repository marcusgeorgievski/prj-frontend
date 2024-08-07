'use client';

import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  PiChalkboardTeacherLight,
  PiHouseLineLight,
  PiNotePencilLight,
  PiListChecksLight,
  PiPlus,
} from 'react-icons/pi';

import { AssessmentsTable } from '@/components/assessments/assessment-table';
import ClassActionButton from '@/components/classes/class-button';
import ClassCard from '@/components/classes/class-card';
import { recentItems } from '@/lib/utils';
import NoteCard from '../notes/note-card';
import AssessmentActionButton from '../assessments/assessment-button';
import NoteActionButton from '../notes/note-button';

export function DashboardTemplate({ classes, notes, assessments }) {
  // Process recent items
  const recentClasses = recentItems(classes, 4);
  const recentAssessments = recentItems(assessments, 4);
  const recentNotes = recentItems(notes, 4);

  // Keep track of remaining items
  const extraClasses = classes.length - recentClasses.length;
  const extraAssessments = assessments.length - recentAssessments.length;
  const extraNotes = notes.length - recentNotes.length;

  const classAssessmentCounts = {};
  const classNoteCounts = {};

  assessments.forEach((assessment) => {
    if (classAssessmentCounts[assessment.class_id]) {
      classAssessmentCounts[assessment.class_id]++;
    } else {
      classAssessmentCounts[assessment.class_id] = 1;
    }
  });

  notes.forEach((note) => {
    if (classNoteCounts[note.class_id]) {
      classNoteCounts[note.class_id]++;
    } else {
      classNoteCounts[note.class_id] = 1;
    }
  });

  const classesList = classes.map((classTemp) => {
    return {
      class_id: classTemp.class_id,
      name: classTemp.name,
    };
  });

  return (
    <div className="w-full">
      <PageTitle icon={PiHouseLineLight}>Dashboard</PageTitle>

      {/* Recent Classes */}
      <div className="w-full mt-8">
        <PageTitle icon={PiChalkboardTeacherLight} sub>
          Recent Classes
        </PageTitle>
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
                  <ClassCard
                    key={c.id}
                    classData={c}
                    assessmentCount={
                      classAssessmentCounts[c.class_id] || 0
                    }
                    noteCount={classNoteCounts[c.class_id] || 0}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/classes/" className="text-lg">
                <Button>
                  {`View All Classes${
                    extraClasses > 0 ? ` (${extraClasses} more)` : ''
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Assessments */}
      <div className="w-full mb-8">
        <PageTitle icon={PiListChecksLight} sub>
          Recent Assessments
        </PageTitle>
        {assessments.length === 0 ? (
          <div className="text-center">
            <p className="pt-[2vh]">No assessments yet!</p>
            <div className="flex justify-center mt-4">
              {/* <AssessmentActionButton action="create" button /> */}
              <Link href="/assessments" className="text-lg">
                <Button variant="ghost" className="gap-2" size="sm">
                  <PiPlus />
                  Create Assessment
                </Button>
              </Link>
            </div>
            {/* <Button className="mt-4">Create an Assessment</Button> */}
          </div>
        ) : (
          <div>
            <div className="grid items-center">
              <AssessmentsTable
                assessments={recentAssessments}
                isDashboard={true}
                classesList={classesList}
              />
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/assessments/" className="text-lg">
                <Button>
                  {`View All Assessments${
                    extraAssessments > 0
                      ? ` (${extraAssessments} more)`
                      : ''
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Notes */}
      <div className="w-full mb-8">
        <PageTitle icon={PiNotePencilLight} sub>
          Recent Notes
        </PageTitle>

        {notes.length === 0 ? (
          <div className="text-center">
            <p className="pt-[2vh]">No notes yet!</p>
            <div className="flex justify-center mt-4">
              <NoteActionButton action="create" button />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentNotes.map((n) => (
                <div key={n.id}>
                  <NoteCard key={n.id} noteData={n} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/notes/" className="text-lg">
                <Button>
                  {`View All Notes${
                    extraNotes > 0 ? ` (${extraNotes} more)` : ''
                  }`}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
