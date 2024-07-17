import { getClasses } from '@/actions/classes';
import ClassActionButton from '@/components/classes/class-button';
import ClassCard from '@/components/classes/class-card';
import PageTitle from '@/components/page-title';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { currentUser } from '@clerk/nextjs/server';
import { PiChalkboardTeacherLight } from 'react-icons/pi';
import { getAssessmentsByUserId } from '@/actions/assessments';

export default async function ClassesPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const classes = await getClasses(user.id);
  const assessments = await getAssessmentsByUserId(user.id);

  // sort classes by created_at
  classes.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const classAssessmentCounts = {};
  //const classNoteCounts = {};

  assessments.forEach((assessment) => {
    if (classAssessmentCounts[assessment.class_id]) {
      classAssessmentCounts[assessment.class_id]++;
    } else {
      classAssessmentCounts[assessment.class_id] = 1;
    }
  });

  // notes.forEach((note) => {
  //   if (classNoteCounts[note.class_id]) {
  //     classNoteCounts[note.class_id]++;
  //   } else {
  //     classNoteCounts[note.class_id] = 1;
  //   }
  // });

  return (
    <div className="w-full ">
      <PageTitle icon={PiChalkboardTeacherLight}>Classes</PageTitle>
      <div className="mb-2">
        <ClassActionButton action="create" button />
      </div>

      {classes.length === 0 ? (
        <p className="pt-[15vh] mx-auto text-center">No classes yet!</p>
      ) : (
        <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {classes.map((c) => (
            <div key={c.id} className="h-full">
              <ClassCard
                classData={c}
                assessmentCount={classAssessmentCounts[c.class_id] || 0}
                noteCount={0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
