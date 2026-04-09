/* eslint-disable @stylistic/js/indent */
import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Learning', 'Side Project'],
        required: true
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    startDate: {
        type: String,  // or Date if you prefer
        required: false
    },
    targetEndDate: {
        type: String,  // or Date
        required: false
    },
    notes: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
})

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Project = mongoose.model('Project', projectSchema)

export default Project