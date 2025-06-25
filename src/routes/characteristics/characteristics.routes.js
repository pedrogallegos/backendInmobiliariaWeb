import express from 'express'
import { createCharacteristic, getCharacteristics, getCharacteristicById, updateCharacteristic, deleteCharacteristic } from '../../useCases/characteristics/characteristics.useCase.js'
const router = express.Router()

// Post /characteristics
router.post('/', async (request, response, next) => {
  try {
    const characteristic = await createCharacteristic(request.body)
    response.status(201).json({
      success: true,
      message: 'Characteristic created successfully',
      data: characteristic
    })
  } catch (error) {
    next(error)
  }
})
// Get /characteristics
router.get('/', async (request, response, next) => {
  try {
    const characteristics = await getCharacteristics()
    response.status(200).json({
      success: true,
      message: 'Characteristics retrieved successfully',
      data: characteristics
    })
  } catch (error) {
    next(error)
  }
})
// Get /characteristics/:id
router.get('/:id', async (request, response, next) => {
  try {
    const characteristic = await getCharacteristicById(request.params.id)
    response.status(200).json({
      success: true,
      message: 'Characteristic retrieved successfully',
      data: characteristic
    })
  } catch (error) {
    next(error)
  }
})
// Patch /characteristics/:id
router.patch('/:id', async (request, response, next) => {
  try {
    const characteristic = await updateCharacteristic(request.params.id, request.body)
    response.status(200).json({
      success: true,
      message: 'Characteristic updated successfully',
      data: characteristic
    })
  } catch (error) {
    next(error)
  }
})
// Delete /characteristics/:id
router.delete('/:id', async (request, response, next) => {
  try {
    const characteristic = await deleteCharacteristic(request.params.id)
    response.status(200).json({
      success: true,
      message: 'Characteristic deleted successfully',
      data: characteristic
    })
  } catch (error) {
    next(error)
  }
})

export const characteristicsRoutes = router // Export the router for use in the main application
