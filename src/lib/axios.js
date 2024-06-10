// try {
//     const { getToken } = auth()
//     let token = await getToken()
//     const r = await axios.get(`${process.env.API_URL}/clerk-test`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     console.log(r.data)
//   } catch (error) {
//     console.log(error.response.data)
//   }
