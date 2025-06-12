import { httpServer } from './src/server.js'
import db from './src/lib/db.js'

async function start () {
  // Conexion a la base de datos
  await db.connect()
  console.log('Database connected')

  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
  console.log('🚀 Server ready at http://localhost:4000/graphql')
}

start()
  .catch(error => console.log('Error: ', error))
