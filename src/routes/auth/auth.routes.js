import express from 'express'
import { registerUser, login } from '../../useCases/auth/auth.useCase.js'
const router = express.Router()

// POST /register
router.post('/register', async (request, response, next) => {
  try {
    const user = await registerUser(request.body)
    response.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: user
    })
  } catch (error) {
    next(error)
  }
})
// POST /login
router.post('/login', async (request, response, next) => {
  try {
    const user = await login(request.body)
    response.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: user
    })
  } catch (error) {
    next(error)
  }
})

export const authRoutes = router
