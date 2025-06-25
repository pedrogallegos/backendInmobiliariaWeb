import mongoose from 'mongoose'
const { Schema, model } = mongoose
const characteristicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trime: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: Schema.Types.ObjectId,
    red: 'Multimedia'
  }
}, {
  timestamps: true
})

export const Characteristic = model('Characteristic', characteristicSchema)
