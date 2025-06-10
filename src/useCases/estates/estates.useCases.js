// CRUD estates use cases
import { isValidObjectId } from 'mongoose'
import { Estate } from '../../models/index.js'

// Create a new estate
async function createEstate (estateData) {
  const { name } = estateData
  // Validate that the estate name is provided
  const existingEstate = await Estate.findOne({ name })
  if (existingEstate) { // Check if an estate with the same name already exists
    throw new Error(`Estate with this name already exists${name}`)
  }
  // Create and return the new estate
  const newEstate = await Estate.create(estateData)
  return newEstate
}
// Get all the estates
async function getAllEstates () {
  const estates = await Estate.find({})
  return estates
}
// Get Estate by ID or slug
async function getEstateByIdorSlug (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let estate
  if (isObjectId) {
    estate = await Estate.findById(identifier) // Find by ID
  } else {
    estate = await Estate.findOne({ slug: identifier }) // Find by Slug
  }
  // Validate if the state exist
  if (!estate) {
    throw new Error(`The state doesn't exist with the identifier: ${identifier}`)
  }
}

export {
  createEstate,
  getAllEstates,
  getEstateByIdorSlug
}
