import express, { request } from 'express'
import { createEstate, getAllEstates, getEstateByIdorSlug, updateEstate, deleteEstate } from '../../useCases/estates/estates.useCases.js'
const router = express.Router()

// Post /estates
router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const estate = await createEstate(body)
    response.status(201).json({
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
router.get('/:id', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const estate = await getEstateByIdorSlug(identifier)
    response.status(200).json({
      sucess: true,
      message: 'Propierty retrieved succesfully',
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
    response.status(202).json({
      sucess: true,
      message: 'Propierty update sucessfully',
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
      sucess: true,
      message: 'Propierty deleted',
      data: estate
    })
  } catch (error) {
    next(error)
  }
})
export const estatesRoutes = router
