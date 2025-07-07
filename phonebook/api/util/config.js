import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

console.log(`Server running on port ${PORT}`)

export { MONGODB_URI, PORT }
