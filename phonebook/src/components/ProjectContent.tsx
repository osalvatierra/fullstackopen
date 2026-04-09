import { useState } from 'react'
import { Project, NewProject } from '../types/project'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'
import ProjectEditForm from './ProjectEditForm'
import { Button } from './ui'

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
  const [showAddForm, setShowAddForm] = useState(false)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    // You can add an edit modal/form here later
    console.log('Edit project:', project)
  }

  const handleAddProject = (data: any) => {
    onSubmit(data)
    setShowAddForm(false) // ← Close modal after submit
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
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 text-white hover:bg-purple-700"
        >
          + Add Project
        </Button>
      </div>
      <ProjectList
        projects={projects}
        handleDelete={onDelete}
        handleEdit={handleEdit}
      />{' '}
      {editingProject ? (
        <ProjectEditForm
          project={editingProject}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : null}
      {/* Add Project Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Project</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <ProjectForm handleSubmit={onSubmit} />

            <div className="mt-4">
              <Button
                onClick={() => setShowAddForm(false)}
                className="w-full bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
