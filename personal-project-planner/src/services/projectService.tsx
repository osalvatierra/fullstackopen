import axios from 'axios'
import { Project, NewProject } from '../types/project'

const baseUrl = 'https://fullstackopen-server-19ct.onrender.com/api/projects'

let token: string | null = null

const setToken = (newToken: string) => {
    token = newToken
}

const getAll = async (): Promise<Project[]> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(baseUrl, config)
    return response.data
}

const getOne = async (id: string): Promise<Project> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(`${baseUrl}/${id}`, config)
    return response.data
}

const create = async (newProject: NewProject): Promise<Project> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.post(baseUrl, newProject, config)
    return response.data
}

const update = async (id: string, updatedProject: Project): Promise<Project> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedProject, config)
    return response.data
}

const remove = async (id: string): Promise<void> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, getOne, create, update, remove }