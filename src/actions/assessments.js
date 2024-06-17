"use server"

import { axiosTokenInstance } from "@/lib/axios"

export async function getUserAssessments(userId = "user_1") {
  const axios = await axiosTokenInstance()

  return await axios
    .get("/assessments", {
      data: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function createAssessment(userId, values) {
  try {
    const axios = await axiosTokenInstance(); // Ensure axios instance is used here
    console.log("Creating assessment with values:", { userId, ...values }); // Debugging log
    const response = await axios.post('http://localhost:8080/api/assessment', {
      userId,
      ...values,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating assessment:", error);
    throw error;
  }
}

export async function updateAssessment(assessmentId, values) {
  try {
    const axios = await axiosTokenInstance(); // Ensure axios instance is used here
    console.log("Updating assessment with values:", values); // Debugging log
    const response = await axios.put(`http://localhost:8080/api/assessment/${assessmentId}`, values);
    return response.data;
  } catch (error) {
    console.error("Error updating assessment:", error);
    throw error;
  }
}

export async function deleteAssessment(assessmentId = "assessment_1") {
  const axios = await axiosTokenInstance()
  return await axios
    .delete(`/assessment/${assessmentId}`, {
      params: {
        assessment_id: assessmentId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error.response.data)
    })
}
