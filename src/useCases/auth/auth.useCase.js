import { User } from '../../models/users/users.models.js'
import { StatusHttp } from '../../lib/statusHttp.js'
import bcrypt from '../../lib/bcrypt.js'
import { generateToken } from '../../lib/jwt.js'
// Function to register a new user
async function registerUser (data) {
  const { email, password } = data
  const userFound = await User.findOne({ email })
  if (userFound) {
    throw new StatusHttp('User with this email already exists', 400)
  }
  // Validate password length
  if (password.length < 8) {
    throw new StatusHttp('Password must be at least 8 characters long', 400)
  }
  // Agregate more validations as needed
  // Hash the password before saving it to the database
  // This is a good practice to ensure security
  const hashedPassword = await bcrypt.hashPassword(password)
  // Create the new user with the hashed password
  const newUser = await User.create({ ...data, password: hashedPassword })
  return newUser
}
async function login (data) {
  const { email, password } = data
  const userFound = await User.findOne({ email }).select('+password')
  if (!userFound) {
    throw new StatusHttp('Invalid Credentials!', 500)
  }
  // Verify the password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, userFound.password)
  if (!isPasswordValid) {
    throw new StatusHttp('Invalid Credentials!', 500)
  }
  // Generate a token for the user
  const tokenPayLoad = {
    userId: userFound._id,
    role: userFound.role
  }

  const token = generateToken(tokenPayLoad)
  // Return the user data and token
  return {
    token,
    user: userFound
  }
}
export {
  registerUser,
  login
}
