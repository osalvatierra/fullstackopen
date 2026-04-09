import { useState } from 'react'
import type { Project, NewProject } from '../types'

interface ProjectEditFormProps {
  project: Project
  onSave: (id: string, data: Partial<NewProject>) => Promise<void>
  onCancel: () => void
}

export default function ProjectEditForm({
  project,
  onSave,
  onCancel,
}: ProjectEditFormProps) {
  const [formData, setFormData] = useState<Partial<NewProject>>({
    name: project.name,
    // Add other editable fields from your NewProject type
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(project.id, formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700"
    >
      <h3 className="text-lg font-semibold text-black dark:text-white">
        Edit Project
      </h3>

      {error && (
        <div className="rounded bg-red-100 p-2 text-red-700 dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="Project name"
        className="rounded border border-gray-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
