import axios from 'axios'

const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/upload'

let token: string | null = null

const setToken = (newToken: string) => {
  token = newToken
}

const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${baseUrl}/avatar`, formData, config)
  console.log('Upload service response:', response.data) // ← Add this

  return response.data
}

export default { setToken, uploadAvatar }
