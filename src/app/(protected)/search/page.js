// User Search

import { getClasses } from '@/actions/classes';
import { currentUser } from '@clerk/nextjs/server';
import { getAssessmentsByUserId } from '@/actions/assessments';
import { SearchTemplate } from '@/components/search/search-template';
import { getNotesByUserId } from '@/actions/notes';

export default async function Search() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Await the Promise.all and destructure the results
  const [classes, assessments, notes] = await Promise.all([
    getClasses(user.id),
    getAssessmentsByUserId(user.id),
    getNotesByUserId(user.id),
  ]);

  const assessmentsWithClassName = assessments.map((assessment) => {
    const classInfo = classes.find(
      (classTemp) => classTemp.class_id === assessment.class_id
    );
    return {
      ...assessment,
      class_name: classInfo ? classInfo.name : 'Unknown Class',
    };
  });

  return (
    <div className="w-full ">
      <SearchTemplate
        classes={classes}
        notes={notes}
        assessments={assessmentsWithClassName}
      />
    </div>
  );
}
