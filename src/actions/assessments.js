"use server";

import { axiosTokenInstance } from "@/lib/axios";

export async function getAssessmentsByUserId(userId = "user_1") {
  const axios = await axiosTokenInstance();

  return await axios
    .get("/assessments", {
      data: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error);
    });
}

export async function getAssessmentsByClassId(classId = "1") {
  const axios = await axiosTokenInstance();
  return await axios
    .get(`/classes/${classId}`, {
      params: {
        class_id: classId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error);
    });
}

export async function deleteAssessment(assessmentId = "assessment_1") {
  const axios = await axiosTokenInstance()
  return await axios
    .delete(`/assessments/${assessmentId}`, {
      params: {
        assessment_id: assessmentId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error.response.data)
    })
}