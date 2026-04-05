import { Project } from '../types/project'
import { Button } from './ui'

interface ProjectListProps {
    projects: Project[]
    handleDelete: (id: string) => void
    handleEdit: (project: Project) => void
}

const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
}

const statusColors = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800'
}

const ProjectList: React.FC<ProjectListProps> = ({
    projects,
    handleDelete,
    handleEdit
}) => {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold">Your Projects</h3>

            {projects.length === 0 ? (
                <p className="text-gray-500 text-sm">No projects yet. Add one above!</p>
            ) : (
                <div className="space-y-2">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-lg">{project.name}</h4>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleEdit(project)}
                                        className="text-sm px-3 py-1"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <span className={`text-xs px-2 py-1 rounded ${priorityColors[project.priority]}`}>
                                    {project.priority}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${statusColors[project.status]}`}>
                                    {project.status}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                                    {project.category}
                                </span>
                            </div>

                            {project.notes && (
                                <p className="text-sm text-gray-600 mb-2">{project.notes}</p>
                            )}

                            {(project.startDate || project.targetEndDate) && (
                                <div className="text-xs text-gray-500">
                                    {project.startDate && <span>Start: {project.startDate}</span>}
                                    {project.startDate && project.targetEndDate && <span> • </span>}
                                    {project.targetEndDate && <span>Target: {project.targetEndDate}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectList