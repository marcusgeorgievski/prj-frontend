'use server';
import { axiosTokenInstance } from '@/lib/axios';

export async function getNoteById(noteId) {
  const axios = await axiosTokenInstance();

  return await axios
    .get(`/notes/${noteId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function getNotesByUserId(userId) {
  const axios = await axiosTokenInstance();

  return await axios
    .get('/notes', {
      data: {
        user_id: userId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function getNotesByClassId(classId) {
  const axios = await axiosTokenInstance();

  return await axios
    .get(`/notes/class/${classId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function createNote(userId, name, classId) {
  const axios = await axiosTokenInstance();

  return await axios
    .post('/notes', {
      user_id: userId,
      name,
      class_id: classId,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function updateNote(noteId, name, content, classId) {
  const axios = await axiosTokenInstance();

  return await axios
    .put(`/notes/${noteId}`, {
      name,
      content,
      class_id: classId,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}

export async function deleteNote(noteId) {
  const axios = await axiosTokenInstance();

  return await axios
    .delete(`/notes/${noteId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}
