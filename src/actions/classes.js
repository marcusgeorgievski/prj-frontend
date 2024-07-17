'use server';

import { axiosTokenInstance } from '@/lib/axios';

export async function getClasses(userId = 'user_1') {
  const axios = await axiosTokenInstance();

  return await axios
    .get('/classes', {
      data: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function createClass(userId, name, professor, details) {
  const axios = await axiosTokenInstance();
  return await axios
    .post(`/classes`, {
      user_id: userId,
      name,
      professor,
      details,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error.response.data);
    });
}

export async function deleteClass(classId = 'class_1') {
  const axios = await axiosTokenInstance();
  return await axios
    .delete(`/classes/${classId}`, {
      params: {
        class_id: classId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error.response.data);
    });
}

export async function updateClass(classId, name, professor, details) {
  const axios = await axiosTokenInstance();
  return await axios
    .put(`/classes/${classId}`, {
      name,
      professor,
      details,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error.response.data);
    });
}
