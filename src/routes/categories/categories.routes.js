import express from 'express'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../../useCases/categories/categories.useCases.js'
const router = express.Router()

// Post /categories
router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const category = await createCategory(body)
    response.status(201).json({
      success: true,
      message: 'Category created sucessfully',
      data: category
    })
  } catch (error) {
    next(error)
  }
})
router.get('/', async (request, response, next) => {
  try {
    const categories = await getAllCategories()
    response.status(200).json({
      success: true,
      message: 'Categories retrieved sucessfully',
      data: categories
    })
  } catch (error) {
    next(error)
  }
})
router.get('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const category = await getCategoryById(identifier)
    response.status(200).json({
      success: true,
      message: 'Category retrieved sucessfully',
      data: category
    })
  } catch (error) {
    next(error)
  }
})
router.patch('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const body = request.body
    const category = await updateCategory(identifier, body)
    response.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: category
    })
  } catch (error) {
    next(error)
  }
})
router.delete('/:identifier', async (request, response, next) => {
  try {
    const { identifier } = request.params
    const category = await deleteCategory(identifier)
    response.status(200).json({
      success: true,
      message: 'Category deleted',
      data: category
    })
  } catch (error) {
    next(error)
  }
})
export const categoriesRoutes = router
