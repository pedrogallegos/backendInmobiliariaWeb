import mongoose from 'mongoose'
import { config } from '../../config.js'

const URL = config.MONGODB_URI

function connect () {
  return mongoose.connect(URL)
}

async function shutdown () {
  console.log('SIGINT received, shutting down gracefully...')
  try {
    await mongoose.connection.close() // or mongoose.disconnect()
    console.log('Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('Error closing database connection:', error)
    process.exit(1)
  }
}
export default {
  connect,
  shutdown
}
