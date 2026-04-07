import { useState } from 'react'
import { Project, NewProject } from '../types/project'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'
import ProjectEditForm from './ProjectEditForm'

interface ProjectContentProps {
  projects: Project[]
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Project) => void
  onSubmit: (data: any) => void
}

export default function ProjectContent({
  projects,
  onDelete,
  onUpdate,
  onSubmit,
}: ProjectContentProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    // You can add an edit modal/form here later
    console.log('Edit project:', project)
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
  }

  const handleSaveEdit = async (id: string, data: Partial<NewProject>) => {
    await onUpdate(id, data)
    setEditingProject(null)
  }

  return (
    <div className="flex flex-col space-y-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <ProjectForm handleSubmit={onSubmit} />
      {editingProject ? (
        <ProjectEditForm
          project={editingProject}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ProjectList
          projects={projects}
          handleDelete={onDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  )
}
