import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true,
      'The name of the category is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true,
      'The description of the category is required']
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Multimedia'
  }
})
const Category = mongoose.model('Category', categorySchema)
export { Category }
