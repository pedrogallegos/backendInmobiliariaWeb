import express from 'express'
import { createEstate, getAllEstates, getEstateByIdOrSlug, updateEstate, deleteEstate } from '../../useCases/estates/estates.useCases.js'
import { authenticate } from '../../middleware/auth.js'
const router = express.Router()

// Post /estates
router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const estate = await createEstate(body)
    response.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
router.get('/', authenticate, async (request, response, next) => {
  try {
    const estates = await getAllEstates(request.user.role)
    response.status(200).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: estates
    })
  } catch (error) {
    next(error)
  }
})
router.get('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const estate = await getEstateByIdOrSlug(identifier)
    response.status(200).json({
      success: true,
      message: 'Property retrieved successfully',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
router.patch('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const body = request.body
    const estate = await updateEstate(identifier, body)
    response.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
router.delete('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const estate = await deleteEstate(identifier)
    response.status(200).json({
      success: true,
      message: 'Property deleted',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
export const estatesRoutes = router
