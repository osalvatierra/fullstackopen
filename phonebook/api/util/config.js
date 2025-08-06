import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  // Load .env from /api folder
  dotenv.config()
}

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

console.log(`Server running on port ${PORT}`)
console.log(`MONGODB_URI is: ${MONGODB_URI}`)

export default { MONGODB_URI, PORT }
