import axios from 'axios'

const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/users'

let token: string | null = null

const setToken = (newToken: string) => {
  token = newToken
}

const getConfig = () => ({
  headers: { Authorization: `Bearer ${token}` },
})

const getProfile = async () => {
  const response = await axios.get(`${baseUrl}/me`, getConfig())
  return response.data
}

const updateProfile = async (data: { name?: string; address?: string }) => {
  const response = await axios.put(`${baseUrl}/me`, data, getConfig())
  return response.data
}

export default { setToken, getProfile, updateProfile }
