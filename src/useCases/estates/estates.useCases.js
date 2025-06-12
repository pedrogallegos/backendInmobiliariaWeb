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

// Update a estate

async function updateEstate (identifier, newData) {
  const isObjectId = isValidObjectId(identifier)
  let updateEstate
  if (isObjectId) {
    updateEstate = await Estate.findByIdAndUpdate(identifier, newData, { new: true })
  } else {
    updateEstate = await Estate.findOneAndUpdate({ slug: identifier }, newData, { new: true })
  }
  if (!updateEstate) {
    throw new Error(`The state doesn't exist with the identifier: ${identifier}`)
  }
  return updateEstate
}

async function deleteEstate (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let deleteEstate
  if (isObjectId) {
    deleteEstate = await Estate.findByIdAndDelete(identifier)
  } else {
    deleteEstate = await Estate.findOneAndDelete({ slug: identifier })
  }
  if (!deleteEstate) {
    throw new Error(`The state doesn't exist with the identifier: ${identifier}`)
  }
}

export {
  createEstate,
  getAllEstates,
  getEstateByIdorSlug,
  updateEstate,
  deleteEstate
}