import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/login'

interface LoginCredentials {
  username: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
