import { Project } from '../types/project'
import { Phonebook } from '../types/phonebook'

interface DashboardProps {
  projects: Project[]
  persons: Phonebook[]
}

const Dashboard = ({ projects, persons }: DashboardProps) => {
  // Calculate stats
  const totalContacts = persons.length
  const totalProjects = projects.length
  const activeProjects = projects.filter(
    (p) => p.status === 'In Progress',
  ).length
  const completedProjects = projects.filter(
    (p) => p.status === 'Completed',
  ).length

  // Get upcoming deadlines (next 14 days)
  const today = new Date()
  const upcomingDeadlines = projects
    .filter((p) => {
      if (!p.targetEndDate || p.status === 'Completed') return false
      const deadline = new Date(p.targetEndDate)
      const daysUntil = Math.ceil(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      )
      return daysUntil >= 0 && daysUntil <= 14
    })
    .sort(
      (a, b) =>
        new Date(a.targetEndDate).getTime() -
        new Date(b.targetEndDate).getTime(),
    )

  // Helper function to get days until deadline
  const getDaysUntil = (targetDate: string) => {
    const deadline = new Date(targetDate)
    const daysUntil = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )
    return daysUntil
  }

  // Helper function to get urgency color
  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 3) return 'bg-red-100 text-red-800 border-red-300'
    if (daysUntil <= 7) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-blue-100 text-blue-800 border-blue-300'
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg outline outline-black/48 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <h3 className="text-lg font-semibold mb-4">Dashboard</h3>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {totalContacts}
          </div>
          <div className="text-sm text-blue-800">Total Contacts</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {totalProjects}
          </div>
          <div className="text-sm text-purple-800">Total Projects</div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {activeProjects}
          </div>
          <div className="text-sm text-green-800">Active Projects</div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600">
            {completedProjects}
          </div>
          <div className="text-sm text-gray-800">Completed</div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h4 className="text-md font-semibold mb-3">Upcoming Deadlines</h4>

        {upcomingDeadlines.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No upcoming deadlines in the next 14 days
          </p>
        ) : (
          <div className="space-y-2">
            {upcomingDeadlines.map((project) => {
              const daysUntil = getDaysUntil(project.targetEndDate)
              return (
                <div
                  key={project.id}
                  className={`border rounded-lg p-3 ${getUrgencyColor(daysUntil)}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{project.name}</div>
                      <div className="text-xs mt-1">
                        Due:{' '}
                        {new Date(project.targetEndDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {daysUntil === 0
                          ? 'Today'
                          : daysUntil === 1
                            ? '1 day'
                            : `${daysUntil} days`}
                      </div>
                      <div className="text-xs">remaining</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
