// User Dashboard

import { getClasses } from "@/actions/classes";
import { currentUser } from "@clerk/nextjs/server";
import { getAssessmentsByUserId } from "@/actions/assessments";
import { DashboardTemplate } from "@/components/dashboard/dashboard-template";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const classes = await getClasses(user.id);
  const notes = [];
  const assessments = await getAssessmentsByUserId(user.id);
  // const notes = await getNotes(user.id);

  const assessmentsWithClassName = assessments.map((assessment) => {
    const classInfo = classes.find(
      (classTemp) => classTemp.class_id === assessment.class_id
    );
    return {
      ...assessment,
      class_name: classInfo ? classInfo.name : "Unknown Class",
    };
  });

  return (
    <div className="w-full ">
      <DashboardTemplate
        classes={classes}
        notes={notes}
        assessments={assessmentsWithClassName}
      />
    </div>
  );
}
