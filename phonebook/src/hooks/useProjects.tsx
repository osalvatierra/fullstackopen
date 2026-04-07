import { useEffect, useState } from 'react'
import { Project, NewProject } from '../types/project'
import projectService from '../services/projectService'

interface User {
  name: string
  username: string
  token: string
  address?: string
  avatarUrl?: string
}

export function useProjects(user: User | null) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    if (user?.token) {
      projectService.setToken(user.token)
      projectService.getAll().then(setProjects).catch(console.error)
    }
  }, [user])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await projectService.remove(id)
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const handleUpdate = async (id: string, data: Project) => {
    const response = await projectService.update(id, data)
    setProjects(projects.map((p) => (p.id === id ? response : p)))
    return response
  }

  const handleSubmit = async (data: NewProject) => {
    const response = await projectService.create(data)
    setProjects((prev) => prev.concat(response))
    return response
  }

  return { projects, setProjects, handleDelete, handleUpdate, handleSubmit }
}
