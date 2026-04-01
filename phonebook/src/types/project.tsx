export interface Project {
  id: string
  name: string
  category: 'Work' | 'Personal' | 'Learning' | 'Side Project'
  status: 'Not Started' | 'In Progress' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  startDate: string
  targetEndDate: string
  notes: string
  user: string
  createdAt?: string
}

export interface NewProject {
  name: string
  category: string
  status: string
  priority: string
  startDate: string
  targetEndDate: string
  notes: string
}
export interface ProjectFormProps {
  handleSubmit: (data: NewProject) => void
}
