import express from 'express'
import cors from 'cors'
import http from 'http'
import { estatesRoutes } from './routes/estates/estates.routes.js' // Import routes for estates
import { amenitiesRoutes } from './routes/amenities/amenities.routes.js'
import { categoriesRoutes } from './routes/categories/categories.routes.js'
import { bannersRoutes } from './routes/banners/banners.routes.js' // Import routes for banners
import { characteristicsRoutes } from './routes/characteristics/characteristics.routes.js' // Import routes for characteristics
import { authRoutes } from './routes/auth/auth.routes.js' // Import routes for authentication
import handlerErrors from './middleware/handlerErrors.js'
const app = express() // Create an Express application
app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Parsex JSON bodies

const httpServer = http.createServer(app) // Create an HTTP server using the Express app

// Routes
app.use('/estates', estatesRoutes)
app.use('/amenities', amenitiesRoutes)
app.use('/categories', categoriesRoutes)
app.use('/banners', bannersRoutes) // Use the banners routes
app.use('/characteristics', characteristicsRoutes) // Use the characteristics routes
app.use('/auth', authRoutes) // Use the authentication routes
app.get('/', (req, res) => {
  res.json({
    api: 'Api de ejemplo', //
    version: '1.0.0', // API version
    usergit: 'pedrogallegos' // GitHub username
  })
})
// Middlewares
app.use(handlerErrors)
export {
  httpServer // Export the HTTP server for use in other files
}
