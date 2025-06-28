// CRUD estates use cases
import { isValidObjectId } from 'mongoose'
import { Estate } from '../../models/index.js'
import { StatusHttp } from '../../lib/statusHttp.js'
// Create a new estate
async function createEstate (estateData) {
  const { name } = estateData
  // Validate that the estate name is provided
  const existingEstate = await Estate.findOne({ name })
  if (existingEstate) { // Check if an estate with the same name already exists
    throw new StatusHttp(`Estate with this name already exists: ${name}`, 400)
  }
  // Create and return the new estate
  const newEstate = await Estate.create(estateData)
  return newEstate
}
// Get all the estates
async function getAllEstates (user) {
  // Show properties only if the user is admin
  if (user.role !== 'admin') {
    throw new StatusHttp('You are not authorized to view all estates', 403)
  }
  const estates = await Estate.find({})
  return estates
}
// Get Estate by ID or slug
/**
 *
 * @param {String} identifier - Can be an ID from MongoDB or a Slug
 * @returns {Promise<Estate>} - Return a promise that solves an Object Estate
 */
async function getEstateByIdOrSlug (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let estate
  if (isObjectId) {
    estate = await Estate.findById(identifier) // Find by ID
  } else {
    estate = await Estate.findOne({ slug: identifier }) // Find by Slug
  }
  // Validate if the estate exist
  if (!estate) {
    throw new StatusHttp(`The estate doesn't exist with the identifier: ${identifier}`, 404)
  }
  return estate
}

// Update an estate
/**
 *
 * @param {*} identifier - Can be a MongoDB ID or a Slug
 * @param {*} newData - Object within the new data for a property
 * @returns {Promise,<Estate>} - Returns a promise that resolves an object for the updated property
 */

async function updateEstate (identifier, newData) {
  const isObjectId = isValidObjectId(identifier)
  let updatedEstate
  if (isObjectId) {
    updatedEstate = await Estate.findByIdAndUpdate(identifier, newData, { new: true })
  } else {
    updatedEstate = await Estate.findOneAndUpdate({ slug: identifier }, newData, { new: true })
  }
  if (!updatedEstate) {
    throw new StatusHttp(`The estate doesn't exist with the identifier: ${identifier}`, 404)
  }
  return updatedEstate
}
/**
 *
 * @param {String} identifier - Can be an ID from MongoDB or a slug
 * @returns {Promise,<Estate>} - Returns a promise when the property has been removed
 */
async function deleteEstate (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let deletedEstate
  if (isObjectId) {
    deletedEstate = await Estate.findByIdAndDelete(identifier)
  } else {
    deletedEstate = await Estate.findOneAndDelete({ slug: identifier })
  }
  if (!deletedEstate) {
    throw new StatusHttp(`The estate doesn't exist with the identifier: ${identifier}`, 404)
  }
  return deletedEstate
}

export {
  createEstate,
  getAllEstates,
  getEstateByIdOrSlug,
  updateEstate,
  deleteEstate
}
