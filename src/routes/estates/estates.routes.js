import express from 'express'
import { createEstate, getAllEstates } from '../../useCases/estates/estates.useCases.js'
const router = express.Router()

// Post /estates
router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const estate = await createEstate(body)
    response.json(201).json({
      sucess: true,
      message: 'Propierty created succesfully',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
router.get('/', async (request, response, next) => {
  try {
    const estates = await getAllEstates()
    response.status(200).json({
      sucess: true,
      message: 'Propierties retrieved sucessfully',
      data: estates
    })
  } catch (error) {
    next(error)
  }
})
export const estatesRoutes = router
