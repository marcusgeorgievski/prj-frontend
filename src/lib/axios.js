'use server';
import axios from 'axios';
const { auth } = require('@clerk/nextjs/server');

// Axios instance with user's token
// This allows us to make authenticated requests to our API
export async function axiosTokenInstance() {
  try {
    const { getToken } = auth();
    const token = await getToken();

    const instance = axios.create({
      baseURL: `${process.env.API_URL}/api`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return instance;
  } catch (error) {
    console.log(error);
  }
}
