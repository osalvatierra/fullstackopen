import express from 'express'
import { upload } from '../config/cloudinary.js'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

const uploadRouter = express.Router()

// Middleware to get user from token
const getUserFromToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.userId = decodedToken.id
  }
  next()
}

uploadRouter.post(
  '/avatar',
  getUserFromToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      console.log('Upload request received') // ← Add this
      console.log('File:', req.file) // ← Add this
      console.log('User ID:', req.userId) // ← Add this
      if (!req.userId) {
        return res.status(401).json({ error: 'Token missing or invalid' })
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      // Update user with new avatar URL
      const user = await User.findByIdAndUpdate(
        req.userId,
        {
          avatarUrl: req.file.path, // Cloudinary URL
          avatarPublicId: req.file.filename, // For deletion later
        },
        { new: true },
      )

      res.status(200).json({
        avatarUrl: user.avatarUrl,
        message: 'Avatar uploaded successfully',
      })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(200).json({ error: 'Upload failed' })
    }
  },
)

export default uploadRouter
