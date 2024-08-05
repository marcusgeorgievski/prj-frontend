import { AssessmentsTemplate } from '@/components/assessments/assessment-template';
import { getClasses } from '@/actions/classes';
import { getAssessmentsByUserId } from '@/actions/assessments';
import { currentUser } from '@clerk/nextjs/server';

export default async function AssessmentsPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const classes = await getClasses(user.id);
  const assessments = await getAssessmentsByUserId(user.id);

  if (!classes || !assessments) {
    return (
      <p className="py-20 text-center">
        Could not fetch classes and/or assessments
      </p>
    );
  }

  const assessmentsWithClassName = assessments.map((assessment) => {
    const classInfo = classes.find(
      (classTemp) => classTemp.class_id === assessment.class_id
    );
    return {
      ...assessment,
      class_name: classInfo ? classInfo.name : 'Unknown Class',
    };
  });

  const classesList = classes.map((classTemp) => {
    return {
      class_id: classTemp.class_id,
      name: classTemp.name,
    };
  });

  return (
    <div className="w-full ">
      <AssessmentsTemplate
        assessments={assessmentsWithClassName}
        classesList={classesList}
      />
    </div>
  );
}

// export function AssessmentCard({ assessment }) {
//   return (
//     <Link href={`/notes/#`}>
//       <Card
//         className={cn(
//           "flex flex-col p-3 transition-all hover:bg-accent/50 mx-auto max-w-[500px]"
//         )}
//       >
//         <h3 className="text-lg font-bold">{assessment.name}</h3>
//         <p className="mb-2 text-sm font-light text-muted-foreground">
//           {assessment.class}
//         </p>
//         <div className="text-sm font-light">
//           <p>
//             {assessment.due_date.toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               hour: "numeric",
//               minute: "numeric",
//             })}
//           </p>
//           <p>{assessment.status}</p>
//         </div>
//       </Card>
//     </Link>
//   );
// }
