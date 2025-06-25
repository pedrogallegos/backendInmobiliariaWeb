import jwt from 'jsonwebtoken'
import { config } from '../../config.js'
function generateToken (payload, expiresIn = config.JWT_EXPIRATION_TIME) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn })
}
function verifyToken (token) {
  return jwt.verify(token, config.JWT_SECRET)
}
export {
  generateToken,
  verifyToken
}
