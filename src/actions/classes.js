"use server"

import axios from "axios"

export async function getClasses(userId = "user_1") {
  return await axios
    .get(`${process.env.API_URL}/classes`, {
      data: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function createClass(userId, name, professor, details) {
  return await axios
    .post(`${process.env.API_URL}/classes`, {
      user_id: userId,
      name,
      professor,
      details,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function deleteClass(classId = "class_1") {
  return await axios
    .delete(`${process.env.API_URL}/classes/${classId}`, {
      params: {
        class_id: classId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}
