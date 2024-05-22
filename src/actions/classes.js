"use server"

import axios from "axios"

export async function getClasses(userId = "user_1") {
  return await axios
    .get("http://localhost:8080/classes", {
      params: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function createClass(userId = "user_1") {
  return await axios
    .post("http://localhost:8080/classes", {
      params: {
        user_id: userId,
      },
      data: {
        user_id: "user_1",
        name: "Sample123",
        professor: "Prof. G",
        details: "additional detail hello",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}

export async function deleteClass(userId = "user_1", classId = "class_1") {
  return await axios
    .delete("http://localhost:8080/classes", {
      params: {
        user_id: userId,
        class_id: classId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR:", error)
    })
}
