// Crud amenities use cases
import { isValidObjectId } from 'mongoose'
import { Amenitie } from '../../models/index.js'
import { StatusHttp } from '../../lib/statusHttp.js'
// Create a new amenitie
async function createAmenitie (amenitieData) {
  const { name } = amenitieData
  // Validate that the amenitie name is provided
  const exisitingAmenitie = await Amenitie.findOne({ name })
  if (exisitingAmenitie) {
    throw new StatusHttp(`Amenitie with this name already exists: ${name}`, 400)
  }
  // Create and return the new amenitie
  const newAmenitie = await Amenitie.create(amenitieData)
  return newAmenitie
}
// Get all the amenities
async function getAllAmenities () {
  const amenities = await Amenitie.find({})
  return amenities
}
// Get Amenitie by ID
/**
 * @param {String} identifier - ID from MongoDB
 * @returns {Promise<Amenitie>} - Return a promise that solves an Object Amenitie
 */
async function getAmenitieById (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let amenitie
  if (isObjectId) {
    amenitie = await Amenitie.findById(identifier) // Find by ID
  }
  if (!amenitie) {
    throw new StatusHttp(`The amenitie doesn't exist with the identifier: ${identifier}`, 404)
  }
  return amenitie
}
// Update an amenitie
/**
 * @param {*} identifier - ID from MongoDB
 * @param {*} newData - Object within the new data for an amenitie
 * @return {Promise,<Amenitie>} - Return a promise that resolves an object for the update amenitie
 */
async function updateAmenitie (identifier, newData) {
  const isObjectId = isValidObjectId(identifier)
  if (!isObjectId) {
    throw new StatusHttp(`Invalid identifier: ${identifier}`, 400)
  }
  const updatedAmenitie = await Amenitie.findByIdAndUpdate(identifier, newData, { new: true })
  if (!updatedAmenitie) {
    throw new StatusHttp(`The amenitie doesn't exist with the identifier: ${identifier}`, 404)
  }
  return updatedAmenitie
}
/**
 * @param {String} identifier - ID from MongoDB
 * @returns {Promise,<Amenitie>} - Return a promise when the amenitie has been removed
 */
async function deleteAmenitie (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let deletedAmenitie
  if (isObjectId) {
    deletedAmenitie = await Amenitie.findByIdAndDelete(identifier)
  }
  if (!deletedAmenitie) {
    throw new StatusHttp(`The amenitie doesn't exist with the identifier: ${identifier}`, 404)
  }
  return deletedAmenitie
}
export {
  createAmenitie,
  getAllAmenities,
  getAmenitieById,
  updateAmenitie,
  deleteAmenitie
}
