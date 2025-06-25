import { StatusHttp } from '../../lib/statusHttp.js'
import { Characteristic } from '../../models/characteristics/characteristics.model.js'

// Create a new characteristic
async function createCharacteristic (data) {
  const { name } = data
  // Validate the input
  const characteristic = await Characteristic.findOne({ name })
  if (characteristic) {
    throw new StatusHttp('Characteristic already exists', 400)
  }
  // Create the new characteristic
  const characteristicCreated = await Characteristic.create(data)
  return characteristicCreated
}
// Get all characteristics

async function getCharacteristics () {
  const characteristics = await Characteristic.find().populate('image')
  return characteristics
}
async function getCharacteristicById (id) {
  const characteristic = await Characteristic.findById(id).populate('image')
  if (!characteristic) {
    throw new StatusHttp('Characteristic not found', 404)
  }
  return characteristic
}
// Update a characteristic
async function updateCharacteristic (id, newData) {
  const characteristic = await Characteristic.findByIdAndUpdate(id, newData, { new: true }).populate('image')
  if (!characteristic) {
    throw new StatusHttp('Characteristic not found', 404)
  }
  return characteristic
}
// Delete a characteristic
async function deleteCharacteristic (id) {
  const characteristic = await Characteristic.findByIdAndDelete(id)
  if (!characteristic) {
    throw new StatusHttp('Characteristic not found', 404)
  }
  return characteristic
}

export {
  createCharacteristic,
  getCharacteristics,
  getCharacteristicById,
  updateCharacteristic,
  deleteCharacteristic
}
