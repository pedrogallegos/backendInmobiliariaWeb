import express from 'express'
import { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } from '../../useCases/banners/banners.useCases.js'

const router = express.Router()

// Post route to create a new banner
router.post('/', async (request, response, next) => {
  try {
    const newBanner = await createBanner(request.body, request.file)
    response.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: newBanner
    })
  } catch (error) {
    next(error)
  }
})
// Get route to retrieve all banners
router.get('/', async (request, response, next) => {
  try {
    const bannersList = await getAllBanners()
    response.status(200).json({
      success: true,
      message: 'Banners retrieved successfully',
      data: bannersList
    })
  } catch (error) {
    next(error)
  }
})
// Get route to retrieve a banner by its ID
router.get('/:id', async (request, response, next) => {
  try {
    const banner = await getBannerById(request.params.id)
    response.status(200).json({
      success: true,
      message: 'Banner retrieved successfully',
      data: banner
    })
  } catch (error) {
    next(error)
  }
})
// Patch route to update a banner by its ID
router.patch('/:id', async (request, response, next) => {
  try {
    const banner = await updateBanner(request.params.id, request.body, request.file)
    response.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: banner
    })
  } catch (error) {
    next(error)
  }
})
// Delete route to remove a banner by its ID
router.delete('/:id', async (request, response, next) => {
  try {
    const banner = await deleteBanner(request.params.id)
    response.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
      data: banner
    })
  } catch (error) {
    next(error)
  }
})
export const bannersRoutes = router
