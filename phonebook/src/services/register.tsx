import axios from 'axios'

// This should match your other services' baseUrl
const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/register'

const register = async (credentials: {
  name: string
  email: string
  password: string
}) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { register }
