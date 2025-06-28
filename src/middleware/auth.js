import { StatusHttp } from '../lib/statusHttp.js'
import { verifyToken } from '../lib/jwt.js'
import { User } from '../models/users/users.models.js'
// Middleware for authentication
export const authenticate = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization // Extract token from Authorization header
    const token = authHeader && authHeader.split(' ')[1] // Fallback to token in cookies if not in header
    if (!token) {
      throw new StatusHttp('No token provided', 401)
    }
    // Verify the token with your JWT library
    const decoded = await verifyToken(token)
    // Verify user and verify if the user exists in the database
    const userFound = await User.findById(decoded.userId).select('+active') // Assuming the token contains userId
    if (!userFound || !userFound.active) {
      throw new StatusHttp('User not found or inactive', 401)
    }
    // Attach user information to the request object
    request.user = {
      id: userFound.userId, // Assuming the token contains userId
      role: userFound.role // Assuming the token contains user role
    }
    next() // Call the next middleware or route handler
  } catch (error) {
    next(error)
  }
}
