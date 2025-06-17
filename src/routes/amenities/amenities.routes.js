import express from 'express'
import { createAmenitie, getAllAmenities, getAmenitieById, updateAmenitie, deleteAmenitie } from '../../useCases/amenities/amenities.useCases.js'
const router = express.Router()

// Post /amenities
router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const amenitie = await createAmenitie(body)
    response.status(201).json({
      sucess: true,
      message: 'Amenitie created sucessfully',
      data: amenitie
    })
  } catch (error) {
    next(error)
  }
})
router.get('/', async (request, response, next) => {
  try {
    const amenitie = await getAllAmenities()
    response.status(200).json({
      sucess: true,
      message: 'Amenities retrieved successfully',
      data: amenitie
    })
  } catch (error) {
    next(error)
  }
})
router.get('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const amenitie = await getAmenitieById(identifier)
    response.status(200).json({
      success: true,
      message: 'Amenitie retrieved successfully',
      data: amenitie
    })
  } catch (error) {
    next(error)
  }
})
router.patch('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const body = request.body
    const amenitie = await updateAmenitie(identifier, body)
    response.status(200).json({
      success: true,
      message: 'Amenitie updated successfully',
      data: amenitie
    })
  } catch (error) {
    next(error)
  }
})
router.delete('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const amenitie = await deleteAmenitie(identifier)
    response.status(200).json({
      success: true,
      message: 'Amenitie deleted',
      data: amenitie
    })
  } catch (error) {
    next(error)
  }
})
export const amenitiesRoutes = router
