"use server"

import axios from "axios"

export async function getClasses(userId = "user_1") {
  return await axios
    .get("http://localhost:8080/classes", {
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
    .post("http://localhost:8080/classes", {
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
    .delete(`http://localhost:8080/classes/${classId}`, {
      params: {
        class_id: classId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}
