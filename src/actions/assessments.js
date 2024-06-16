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