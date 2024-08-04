'use server';

import { axiosTokenInstance } from '@/lib/axios';

export async function getAIResults(content) {
  const axios = await axiosTokenInstance();

  return await axios
    .get('/ai', {
      data: {
        content,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log('ERROR:', error);
    });
}
