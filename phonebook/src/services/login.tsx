import axios from 'axios'
const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/login'

interface LoginCredentials {
  username: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
