/* eslint-disable @stylistic/js/indent */
import express from 'express'
import Project from '../models/project.js'
import jwt from 'jsonwebtoken'

const projectsRouter = express.Router()

// Middleware to get user from token
const getUserFromToken = (request, response, next) => {
    const authorization = request.get('authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const token = authorization.replace('Bearer ', '')

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        request.userId = decodedToken.id
        next()
    } catch (error) {
        return response.status(401).json({ error: 'Token invalid' })
    }
}

// GET all projects for logged-in user
projectsRouter.get('/', getUserFromToken, async (request, response) => {
    try {
        const projects = await Project.find({ user: request.userId })
        response.json(projects)
    } catch (error) {
        console.error('Error fetching projects:', error)
        response.status(500).json({ error: 'Failed to fetch projects' })
    }
})

// GET single project
projectsRouter.get('/:id', getUserFromToken, async (request, response) => {
    try {
        const project = await Project.findById(request.params.id)

        if (!project) {
            return response.status(404).json({ error: 'Project not found' })
        }

        // Verify project belongs to user
        if (project.user.toString() !== request.userId) {
            return response.status(403).json({ error: 'Unauthorized' })
        }

        response.json(project)
    } catch (error) {
        console.error('Error fetching project:', error)
        response.status(500).json({ error: 'Failed to fetch project' })
    }
})

// POST create new project
projectsRouter.post('/', getUserFromToken, async (request, response) => {
    const { name, category, status, priority, startDate, targetEndDate, notes } = request.body

    if (!name || !category) {
        return response.status(400).json({ error: 'Name and category are required' })
    }

    const project = new Project({
        name,
        category,
        status: status || 'Not Started',
        priority: priority || 'Medium',
        startDate: startDate || '',
        targetEndDate: targetEndDate || '',
        notes: notes || '',
        user: request.userId
    })

    try {
        const savedProject = await project.save()
        response.status(201).json(savedProject)
    } catch (error) {
        console.error('Error creating project:', error)
        response.status(400).json({ error: error.message })
    }
})

// PUT update project
projectsRouter.put('/:id', getUserFromToken, async (request, response) => {
    const { name, category, status, priority, startDate, targetEndDate, notes } = request.body

    try {
        const project = await Project.findById(request.params.id)

        if (!project) {
            return response.status(404).json({ error: 'Project not found' })
        }

        // Verify project belongs to user
        if (project.user.toString() !== request.userId) {
            return response.status(403).json({ error: 'Unauthorized' })
        }

        const updatedProject = await Project.findByIdAndUpdate(
            request.params.id,
            { name, category, status, priority, startDate, targetEndDate, notes },
            { new: true, runValidators: true }
        )

        response.json(updatedProject)
    } catch (error) {
        console.error('Error updating project:', error)
        response.status(400).json({ error: error.message })
    }
})

// DELETE project
projectsRouter.delete('/:id', getUserFromToken, async (request, response) => {
    try {
        const project = await Project.findById(request.params.id)

        if (!project) {
            return response.status(404).json({ error: 'Project not found' })
        }

        // Verify project belongs to user
        if (project.user.toString() !== request.userId) {
            return response.status(403).json({ error: 'Unauthorized' })
        }

        await Project.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        console.error('Error deleting project:', error)
        response.status(500).json({ error: 'Failed to delete project' })
    }
})

export default projectsRouter