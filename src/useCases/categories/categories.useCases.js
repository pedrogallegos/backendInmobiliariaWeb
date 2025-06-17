// CRUD category use cases
import { isValidObjectId } from 'mongoose'
import { Category } from '../../models/categories/categories.models.js'
import { StatusHttp } from '../../lib/statusHttp.js'
// Create a new category
async function createCategory (categoryData) {
  const { name } = categoryData
  // Validate that the category name is provided
  const exsistingCategory = await Category.findOne({ name })
  if (exsistingCategory) { // Check if a category with the same name already exists
    throw new StatusHttp(`Category with this name already exists: ${name}`, 400)
  }
  // Create and return the new category
  const newCategory = await Category.create(categoryData)
  return newCategory
}
// Get all categories
async function getAllCategories () {
  const categories = await Category.find({})
  return categories
}
// Get category by ID
/**
 * @param {String} identifier - ID from MongoDB
 * @returms {Promise<Category>} - Return a promise that solves an Object Category
 */
async function getCategoryById (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let category
  if (isObjectId) {
    category = await Category.findById(identifier)
  }
  // Validate if the category exist
  if (!category) {
    throw new StatusHttp(`The category doesn't exist with the identifier: ${identifier}`)
  }
  return category
}
// Update a category using ID
/**
 * @param {*} identifier - ID from MongoDB
 * @param {*} newData - Object within the new data for a category
 * @returs {Promise,<Category>} - Return a promise that resolves an object for the updated category
 */
async function updateCategory (identifier, newData) {
  const isObjectId = isValidObjectId(identifier)
  let updatedCategory
  if (isObjectId) {
    updatedCategory = await Category.findByIdAndUpdate(identifier, newData, { new: true })
  }
  if (!updatedCategory) {
    throw new StatusHttp(`The estate doesn't exist with the identifier ${identifier}`)
  }
  return updatedCategory
}
// Delete a category using ID
/**
 * @param {String} identifier - ID from MongoDB
 * @returns {Promise,<Category>} - Returns a promise when the category has been removed
 */
async function deleteCategory (identifier) {
  const isObjectId = isValidObjectId(identifier)
  let deletedCategory
  if (isObjectId) {
    deletedCategory = await Category.findOneAndDelete(identifier)
  }
  if (!deletedCategory) {
    throw new StatusHttp(`The category doesn't exist with the identifier: ${identifier}`)
  }
  return deletedCategory
}
export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}
