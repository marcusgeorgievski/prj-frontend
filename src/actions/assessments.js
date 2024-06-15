// /src/actions/assessments.js
"use server"

import { axiosTokenInstance } from "@/lib/axios"

export async function getAssessments(userId = "user_1") {
  const axios = await axiosTokenInstance()

  return await axios
    .get("/assessments", {
      params: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function createAssessment(userId, title, classId, status, description, weight, dueDate) {
  const axios = await axiosTokenInstance()
  return await axios
    .post(`/assessments`, {
      user_id: userId,
      title,
      class_id: classId,
      status,
      description,
      weight,
      due_date: dueDate,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error.response.data)
    })
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

export async function updateAssessment(assessmentId, title, classId, status, description, weight, dueDate) {
  const axios = await axiosTokenInstance()
  return await axios
    .put(`/assessments/${assessmentId}`, {
      title,
      class_id: classId,
      status,
      description,
      weight,
      due_date: dueDate,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error.response.data)
    })
}
