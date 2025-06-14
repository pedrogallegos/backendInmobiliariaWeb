import { httpServer } from './src/server.js'
import db from './src/lib/db.js'

async function start () {
  // Connect to database
  try {
    await db.connect()
    console.log('✅ Database connected')
    // Start HTTP Server
    const port = parseInt(process.env.PORT) || 4000
    await new Promise((resolve) => httpServer.listen({ port }, resolve))
    console.log(`🚀 Server is ready at http://localhost:${port}`)
    return { server: httpServer, port }
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    await db.disconnect().catch(console.error)
    process.exit(1)
  }
}

// Graceful shutdown handlers

async function shutdown (signal) {
  console.log(`\n${signal} received, shutting down gracefully...`)
  try {
    await db.shutdown()
    console.log('✅ Database disconnected')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during shutdown', error)
    process.exit(1)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

// Start the application
start().catch(error => {
  console.error('❌ Startup error:', error)
  process.exit(1)
})
