import axios from 'axios'

const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/persons'

interface Person {
  id: string
  name: string
  number: string
}

interface NewPerson {
  name: string
  number: string
}

let token: string | null = null

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

const getAll = async (): Promise<Person[]> => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newObject: NewPerson): Promise<Person> => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id: string, newObject: NewPerson): Promise<Person> => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id: string): Promise<void> => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
}
