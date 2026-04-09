import { ProjectFormProps } from '../types/project'
import { useState } from 'react'
import { Button, Input } from './ui'

const ProjectForm = ({ handleSubmit }: ProjectFormProps) => {
  const [projectName, setProjectName] = useState('')
  const [category, setCategory] = useState('Personal')
  const [status, setStatus] = useState('Not Started')
  const [priority, setPriority] = useState('Medium')
  const [startDate, setStartDate] = useState('')
  const [targetEndDate, setTargetEndDate] = useState('')
  const [notes, setNotes] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit({
      name: projectName,
      category,
      status,
      priority,
      startDate,
      targetEndDate,
      notes,
    })

    // Clear form after submit
    setProjectName('')
    setCategory('Personal')
    setStatus('Not Started')
    setPriority('Medium')
    setStartDate('')
    setTargetEndDate('')
    setNotes('')
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
            <option value="Side Project">Side Project</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Target End Date
            </label>
            <Input
              type="date"
              value={targetEndDate}
              onChange={(e) => setTargetEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add project description or notes..."
            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full border-2 border-solid border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"
          >
            Add Project
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
